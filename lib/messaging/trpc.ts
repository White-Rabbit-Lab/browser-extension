/**
 * tRPC v11 integration for browser extensions
 */

/// <reference types="chrome"/>

import { TRPCClientError, TRPCLink } from "@trpc/client";
import { AnyRouter, getTRPCErrorFromUnknown, TRPCError } from "@trpc/server";
import {
  isObservable,
  observable,
  Unsubscribable,
} from "@trpc/server/observable";
import { callProcedure } from "@trpc/server/unstable-core-do-not-import";
import { generateId } from "./core";
import type {
  CreateExtensionHandlerOptions,
  ExtensionLinkOptions,
  ExtensionMessage,
  Transformer,
  TRPCMessage,
} from "./types";

/**
 * Default transformer (passthrough)
 * @internal
 */
const defaultTransformer: Transformer = {
  serialize: (data) => data,
  deserialize: (data) => data,
};

/**
 * Create extension link for tRPC client
 * @template TRouter - tRPC router type
 * @param {ExtensionLinkOptions} options - Link configuration options
 * @returns {TRPCLink<TRouter>} tRPC link for extension communication
 * @example
 * const link = extensionLink<AppRouter>({
 *   portOptions: { name: "my-extension" }
 * });
 */
export function extensionLink<TRouter extends AnyRouter>(
  options: ExtensionLinkOptions = {},
): TRPCLink<TRouter> {
  return () => {
    const transformer = options.transformer || defaultTransformer;

    return ({ op }) => {
      return observable((observer) => {
        const port =
          options.port || chrome.runtime.connect(options.portOptions);
        const messageId = generateId();

        // Create tRPC message
        const trpcMessage: TRPCMessage = {
          id: messageId,
          jsonrpc: "2.0",
          method: op.type as "query" | "mutation" | "subscription",
          params: {
            path: op.path,
            input: transformer.serialize(op.input),
          },
        };

        const extensionMessage: ExtensionMessage = { trpc: trpcMessage };

        // Handle responses
        const messageHandler = (response: ExtensionMessage) => {
          if (response.trpc.id !== messageId) return;

          if (response.trpc.error) {
            const clientError = TRPCClientError.from(
              new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: response.trpc.error.message,
              }),
            );
            observer.error(clientError);
            return;
          }

          if (response.trpc.result) {
            const { type, data } = response.trpc.result;

            if (type === "stopped") {
              observer.complete();
            } else {
              observer.next({
                result: {
                  data: transformer.deserialize(data),
                },
              });

              if (op.type !== "subscription") {
                observer.complete();
              }
            }
          }
        };

        port.onMessage.addListener(messageHandler);

        // Send the message
        port.postMessage(extensionMessage);

        // Handle subscription stop
        if (op.type === "subscription") {
          return () => {
            const stopMessage: ExtensionMessage = {
              trpc: {
                id: messageId,
                jsonrpc: "2.0",
                method: "subscription.stop",
              },
            };
            port.postMessage(stopMessage);
            port.onMessage.removeListener(messageHandler);
          };
        }

        // Cleanup for non-subscriptions
        return () => {
          port.onMessage.removeListener(messageHandler);
        };
      });
    };
  };
}

/**
 * Create extension handler for tRPC server
 * Sets up port listeners and routes tRPC messages
 * @template TRouter - tRPC router type
 * @param {CreateExtensionHandlerOptions<TRouter>} options - Handler configuration
 * @example
 * createExtensionHandler({
 *   router: appRouter,
 *   createContext: () => ({ user: getCurrentUser() })
 * });
 */
export function createExtensionHandler<TRouter extends AnyRouter>(
  options: CreateExtensionHandlerOptions<TRouter>,
) {
  const {
    router,
    createContext,
    onError,
    transformer = defaultTransformer,
  } = options;

  // Listen for incoming connections
  chrome.runtime.onConnect.addListener((port) => {
    const subscriptions = new Map<string, Unsubscribable>();

    port.onMessage.addListener(async (message: ExtensionMessage) => {
      const { trpc } = message;

      if (!trpc.id) return;

      // Handle subscription stop
      if (trpc.method === "subscription.stop") {
        const subscription = subscriptions.get(trpc.id);
        if (subscription) {
          subscription.unsubscribe();
          subscriptions.delete(trpc.id);
        }
        return;
      }

      // Create context
      const ctx = (await createContext?.()) || {};

      // Handle regular requests
      if (trpc.method && trpc.params) {
        const { path, input } = trpc.params;

        try {
          const deserializedInput = transformer.deserialize(input);

          const result = await callProcedure({
            router,
            path,
            getRawInput: async () => deserializedInput,
            ctx,
            type: trpc.method,
            signal: new AbortController().signal,
          });

          // Handle subscriptions
          if (trpc.method === "subscription" && isObservable(result)) {
            const subscription = result.subscribe({
              next(data) {
                const response: ExtensionMessage = {
                  trpc: {
                    id: trpc.id,
                    result: {
                      type: "data",
                      data: transformer.serialize(data),
                    },
                  },
                };
                port.postMessage(response);
              },
              error(error) {
                const trcpError = getTRPCErrorFromUnknown(error);
                const response: ExtensionMessage = {
                  trpc: {
                    id: trpc.id,
                    error: {
                      code: -32603,
                      message: trcpError.message,
                      data: {
                        code: trcpError.code,
                        httpStatus: 500,
                      },
                    },
                  },
                };
                port.postMessage(response);
              },
              complete() {
                const response: ExtensionMessage = {
                  trpc: {
                    id: trpc.id,
                    result: {
                      type: "stopped",
                    },
                  },
                };
                port.postMessage(response);
                subscriptions.delete(trpc.id);
              },
            });

            subscriptions.set(trpc.id, subscription);

            // Send subscription started message
            const response: ExtensionMessage = {
              trpc: {
                id: trpc.id,
                result: {
                  type: "started",
                },
              },
            };
            port.postMessage(response);
          } else {
            // Handle query/mutation
            const response: ExtensionMessage = {
              trpc: {
                id: trpc.id,
                result: {
                  type: "data",
                  data: transformer.serialize(result),
                },
              },
            };
            port.postMessage(response);
          }
        } catch (cause) {
          const error = getTRPCErrorFromUnknown(cause);

          onError?.({
            error,
            type: trpc.method,
            path,
            input,
            ctx,
            req: port,
          });

          const response: ExtensionMessage = {
            trpc: {
              id: trpc.id,
              error: {
                code: -32603,
                message: error.message,
                data: {
                  code: error.code,
                  httpStatus: 500,
                  stack: error.stack,
                  path,
                },
              },
            },
          };
          port.postMessage(response);
        }
      }
    });

    // Cleanup on disconnect
    port.onDisconnect.addListener(() => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
      subscriptions.clear();
    });
  });
}

/**
 * Helper to create tRPC client with extension link
 * @template TRouter - tRPC router type
 * @param {ExtensionLinkOptions} options - Client configuration options
 * @returns {Object} Object containing the configured link
 * @example
 * const client = createTRPCClient<AppRouter>({
 *   links: [createExtensionClient().link]
 * });
 */
export function createExtensionClient<TRouter extends AnyRouter>(
  options: ExtensionLinkOptions = {},
) {
  return {
    link: extensionLink<TRouter>(options),
  };
}
