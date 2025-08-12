/**
 * WXT-specific adapter for tRPC messaging
 */
/// <reference types="chrome"/>

import { createTRPCClient } from "@trpc/client";
import type { AnyRouter } from "@trpc/server";
import { createExtensionHandler, extensionLink } from "../trpc";
import type {
  CreateExtensionHandlerOptions,
  ExtensionLinkOptions,
} from "../types";

/**
 * Detect if running in WXT environment
 * @returns {boolean} True if WXT browser API is available
 * @example
 * if (isWXTEnvironment()) {
 *   // Use WXT-specific features
 * }
 */
export function isWXTEnvironment(): boolean {
  return (
    typeof globalThis !== "undefined" &&
    "browser" in globalThis &&
    typeof (globalThis as { browser?: { runtime?: { connect?: unknown } } })
      .browser?.runtime?.connect === "function"
  );
}

/**
 * Get browser API (Chrome or Firefox)
 * @returns {typeof chrome} Browser API object
 * @throws {Error} If browser API is not available
 * @example
 * const browser = getBrowserAPI();
 * browser.runtime.connect({ name: "my-port" });
 */
export function getBrowserAPI(): typeof chrome {
  const global = globalThis as { browser?: typeof chrome };
  if (isWXTEnvironment() && global.browser) {
    return global.browser;
  }
  if (typeof chrome !== "undefined" && chrome.runtime) {
    return chrome;
  }
  throw new Error("Browser API not available");
}

/**
 * WXT-specific link options extending base extension options
 */
export interface WXTLinkOptions extends ExtensionLinkOptions {
  /**
   * Use WXT's browser API instead of chrome API
   * @default false
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
 * @param {WXTLinkOptions} options - WXT link configuration
 * @returns {TRPCLink<TRouter>} Configured tRPC link
 * @example
 * const link = wxtLink<AppRouter>({
 *   useWXTBrowser: true,
 *   portName: "my-extension"
 * });
 */
export function wxtLink<TRouter extends AnyRouter>(
  options: WXTLinkOptions = {},
): ReturnType<typeof extensionLink<TRouter>> {
  const browser = options.useWXTBrowser ? getBrowserAPI() : chrome;

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
 * @param {CreateExtensionHandlerOptions<TRouter>} options - Handler configuration
 * @example
 * createWXTHandler({
 *   router: appRouter,
 *   createContext: () => ({ timestamp: Date.now() })
 * });
 */
export function createWXTHandler<TRouter extends AnyRouter>(
  options: CreateExtensionHandlerOptions<TRouter>,
) {
  const browser = getBrowserAPI();

  // Override chrome API with browser API for WXT
  const originalOnConnect = chrome.runtime.onConnect.addListener;
  chrome.runtime.onConnect.addListener =
    browser.runtime.onConnect.addListener.bind(browser.runtime.onConnect);

  createExtensionHandler(options);

  // Restore original
  chrome.runtime.onConnect.addListener = originalOnConnect;
}

/**
 * Create WXT tRPC client with pre-configured link
 * @template TRouter - tRPC router type
 * @param {WXTLinkOptions} options - Client configuration options
 * @returns {ReturnType<typeof createTRPCClient>} Configured tRPC client
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
 * @param {TRouter} router - tRPC router instance
 * @param {Omit<CreateExtensionHandlerOptions<TRouter>, "router">} [options] - Additional handler options
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
 * @param {WXTLinkOptions} [options] - Client configuration options
 * @returns {ReturnType<typeof createWXTClient>} Configured tRPC client
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
