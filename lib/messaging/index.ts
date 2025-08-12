/**
 * Browser extension tRPC messaging library
 *
 * A lightweight, type-safe messaging solution for browser extensions
 * using tRPC v11 with full TypeScript support
 */

// Core exports
export {
  PortConnection,
  createMessageClient,
  createMessageHandler,
  deserializeError,
  generateId,
  serializeError,
} from "./core";

// Debug exports
export { DebugLevel, TRPCDebugger, createDebugger } from "./debug";
export type { DebugOptions } from "./debug";

// Error handling exports
export {
  JSON_RPC_ERROR_CODES,
  createDisconnectionError,
  createTimeoutError,
  formatTRPCError,
  getHTTPStatusFromTRPCError,
  getJSONRPCErrorCode,
} from "./errors";

// tRPC integration exports
export {
  createExtensionClient,
  createExtensionHandler,
  extensionLink,
} from "./trpc";

// Type exports
export type {
  Message,
  MessageHandler,
  MessageRouter,
  SerializedError,
} from "./core";

export type {
  CreateExtensionHandlerOptions,
  ExtensionClientConfig,
  ExtensionLinkOptions,
  ExtensionMessage,
  Operation,
  PortOptions,
  SubscriptionObserver,
  TRPCError,
  TRPCMessage,
  Transformer,
} from "./types";

// WXT adapter exports
export {
  createWXTClient,
  createWXTHandler,
  getBrowserAPI,
  isExtensionEnvironment,
  setupWXTBackground,
  setupWXTClient,
  wxtLink,
} from "./adapters/wxt";

export type { WXTLinkOptions } from "./adapters/wxt";
