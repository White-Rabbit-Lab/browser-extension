/**
 * WXT-specific adapter for tRPC messaging
 * Cross-browser compatible implementation for WXT
 */
import { createTRPCClient } from "@trpc/client";
import type { AnyRouter } from "@trpc/server";
import { createExtensionHandler, extensionLink } from "../trpc";
import type {
  CreateExtensionHandlerOptions,
  ExtensionLinkOptions,
} from "../types";

/**
 * Detect if running in WebExtension environment
 * @returns True if browser extension API is available
 * @example
 * if (isExtensionEnvironment()) {
 *   // Use browser extension features
 * }
 */
export function isExtensionEnvironment(): boolean {
  // Check for browser API (Firefox/Safari) or chrome API (Chrome/Edge)
  // Using chrome type as common interface for both APIs
  const global = globalThis as {
    browser?: typeof chrome;
    chrome?: typeof chrome;
  };
  return (
    global.browser?.runtime?.id !== undefined ||
    global.chrome?.runtime?.id !== undefined
  );
}

/**
 * Get browser API (Chrome or Firefox)
 * WXT-compatible implementation based on @wxt-dev/browser
 * @returns Browser API object
 * @throws {Error} If browser API is not available
 * @example
 * const browser = getBrowserAPI();
 * browser.runtime.connect({ name: "my-port" });
 */
export function getBrowserAPI(): typeof chrome {
  // Both browser and chrome APIs follow the same interface (chrome types)
  const global = globalThis as {
    browser?: typeof chrome;
    chrome?: typeof chrome;
  };

  // WXT-style detection: prefer browser over chrome if available
  const browser = global.browser?.runtime?.id ? global.browser : global.chrome;

  if (!browser) {
    throw new Error("Browser API not available");
  }

  return browser;
}

/**
 * WXT-specific link options extending base extension options
 */
export interface WXTLinkOptions extends ExtensionLinkOptions {
  /**
   * @deprecated WXT automatically detects and uses the appropriate browser API
   * This option is kept for backward compatibility but has no effect
   */
  useWXTBrowser?: boolean;
  /**
   * Port name for connection identification
   * @default "wxt-trpc"
   */
  portName?: string;
}

/**
 * Create WXT-compatible tRPC link
 * @template TRouter - tRPC router type
 * @param options - WXT link configuration
 * @returns Configured tRPC link
 * @example
 * const link = wxtLink<AppRouter>({
 *   useWXTBrowser: true,
 *   portName: "my-extension"
 * });
 */
export function wxtLink<TRouter extends AnyRouter>(
  options: WXTLinkOptions = {},
): ReturnType<typeof extensionLink<TRouter>> {
  // Always use the detected browser API for WXT compatibility
  const browser = getBrowserAPI();

  // Create port if not provided
  if (!options.port) {
    options.port = browser.runtime.connect({
      name: options.portName || "wxt-trpc",
    });
  }

  return extensionLink<TRouter>(options);
}

/**
 * Create WXT-compatible tRPC handler
 * @template TRouter - tRPC router type
 * @param options - Handler configuration
 * @example
 * createWXTHandler({
 *   router: appRouter,
 *   createContext: () => ({ timestamp: Date.now() })
 * });
 */
export function createWXTHandler<TRouter extends AnyRouter>(
  options: CreateExtensionHandlerOptions<TRouter>,
) {
  // Simply delegate to the extension handler
  // WXT's browser object is already used via getBrowserAPI in the handler
  createExtensionHandler(options);
}

/**
 * Create WXT tRPC client with pre-configured link
 * @template TRouter - tRPC router type
 * @param options - Client configuration options
 * @returns Configured tRPC client
 * @example
 * const client = createWXTClient<AppRouter>({
 *   useWXTBrowser: true
 * });
 * const result = await client.greeting.query("World");
 */
export function createWXTClient<TRouter extends AnyRouter>(
  options: WXTLinkOptions = {},
) {
  return createTRPCClient<TRouter>({
    links: [wxtLink<TRouter>(options)],
  });
}

/**
 * Helper for background script setup
 * Simplifies handler creation in background scripts
 * @template TRouter - tRPC router type
 * @param router - tRPC router instance
 * @param options - Additional handler options
 * @example
 * // In background.ts
 * setupWXTBackground(appRouter, {
 *   createContext: () => ({ user: getCurrentUser() })
 * });
 */
export function setupWXTBackground<TRouter extends AnyRouter>(
  router: TRouter,
  options?: Omit<CreateExtensionHandlerOptions<TRouter>, "router">,
) {
  createWXTHandler({
    router,
    ...options,
  });
}

/**
 * Helper for content script / popup setup
 * Creates a ready-to-use tRPC client
 * @template TRouter - tRPC router type
 * @param options - Client configuration options
 * @returns Configured tRPC client
 * @example
 * // In popup or content script
 * const client = setupWXTClient<AppRouter>();
 * const data = await client.getData.query();
 */
export function setupWXTClient<TRouter extends AnyRouter>(
  options?: WXTLinkOptions,
) {
  return createWXTClient<TRouter>(options);
}
