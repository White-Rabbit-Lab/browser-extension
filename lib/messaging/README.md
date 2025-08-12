# tRPC v11 Browser Extension Messaging

Type-safe messaging library for Chrome Extensions with custom tRPC v11 implementation

## Features

- **Full type safety**: TypeScript type inference and runtime validation with Zod
- **tRPC v11 compatible**: Leverages latest tRPC features
- **Lightweight**: Minimal bundle size (<10KB core)
- **Tree-shakeable**: Import only what you need
- **WXT support**: Includes adapter for WXT framework
- **Easy integration**: Simple to add to existing projects
- **Error handling**: JSON-RPC 2.0 compliant error formatting
- **Timeout support**: Configurable request timeouts with automatic cleanup
- **Debug mode**: Built-in debugging and performance monitoring
- **Subscription management**: Safe cleanup on port disconnection

## Installation

```bash
pnpm add @trpc/server @trpc/client zod superjson
```

## Usage

### 1. Define Router (Background Script)

```typescript
// background/router.ts
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
  isServer: false,
  allowOutsideOfServer: true,
});

export const appRouter = t.router({
  storage: t.router({
    get: t.procedure.input(z.string()).query(async ({ input }) => {
      const result = await chrome.storage.local.get(input);
      return result[input];
    }),
    set: t.procedure
      .input(z.object({ key: z.string(), value: z.unknown() }))
      .mutation(async ({ input }) => {
        await chrome.storage.local.set({ [input.key]: input.value });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
```

### 2. Background Script Setup

```typescript
// background/index.ts
import { createExtensionHandler } from "@/lib/messaging";
import { appRouter } from "./router";
import superjson from "superjson";

createExtensionHandler({
  router: appRouter,
  transformer: {
    serialize: (data) => superjson.serialize(data),
    deserialize: (data) => superjson.deserialize(data as any),
  },
  // Optional: Error handling
  onError: ({ error, path }) => {
    console.error(`Error in ${path}:`, error);
  },
  // Optional: Debug configuration
  debug: {
    enabled: import.meta.env.DEV,
    logPerformance: true,
  },
});
```

### 3. Client Setup (Popup/Content Script)

```typescript
// popup/trpc.ts
import { createTRPCClient } from "@trpc/client";
import { extensionLink } from "@/lib/messaging";
import type { AppRouter } from "../background/router";
import superjson from "superjson";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    extensionLink({
      transformer: {
        serialize: (data) => superjson.serialize(data),
        deserialize: (data) => superjson.deserialize(data as any),
      },
      // Optional: Request timeout (default: 30000ms)
      timeout: 60000,
      // Optional: Debug configuration
      debug: {
        enabled: import.meta.env.DEV,
        logPerformance: true,
      },
    }),
  ],
});
```

### 4. Using in React Components

```typescript
// popup/App.tsx
import { trpc } from "./trpc";

function App() {
  const handleSave = async () => {
    await trpc.storage.set.mutate({
      key: "settings",
      value: { theme: "dark" },
    });

    const settings = await trpc.storage.get.query("settings");
    console.log(settings);
  };

  return <button onClick={handleSave}>Save Settings</button>;
}
```

## Architecture

```
lib/messaging/
├── core.ts              # Generic messaging system
├── trpc.ts              # tRPC v11 integration layer
├── types.ts             # Type definitions
├── errors.ts            # Error handling utilities
├── debug.ts             # Debug and performance monitoring
├── adapters/
│   └── wxt.ts          # WXT framework adapter
├── examples/            # Usage examples
│   ├── router.ts       # Router definition example
│   ├── background.ts   # Background script example
│   ├── client.ts       # Client example
│   └── react-usage.tsx # React integration example
└── index.ts             # Exports
```

## Advanced Usage

### Error Handling

The library now provides JSON-RPC 2.0 compliant error formatting:

```typescript
import { formatTRPCError } from "@/lib/messaging";

// In your error handler
onError: ({ error, path }) => {
  const formatted = formatTRPCError(error, path);
  console.error("Formatted error:", formatted);
  // Send to error tracking service
};
```

### Debug Mode

Enable comprehensive debugging for development:

```typescript
// Enable debug with custom configuration
const client = createTRPCClient<AppRouter>({
  links: [
    extensionLink({
      debug: {
        enabled: true,
        logPerformance: true,
        level: 4, // DEBUG level
      },
    }),
  ],
});
```

### Timeout Configuration

Configure custom timeouts for different scenarios:

```typescript
// Short timeout for quick operations
const quickClient = createTRPCClient<AppRouter>({
  links: [
    extensionLink({
      timeout: 5000, // 5 seconds
    }),
  ],
});

// Long timeout for file uploads
const uploadClient = createTRPCClient<AppRouter>({
  links: [
    extensionLink({
      timeout: 300000, // 5 minutes
    }),
  ],
});
```

### Performance Monitoring

Access performance statistics in development:

```typescript
import { createDebugger } from "@/lib/messaging";

const debugger = createDebugger({
  enabled: true,
  logPerformance: true,
});

// Start tracking
debugger.startPerformance("operation-1", "query", "user.get");

// End tracking
debugger.endPerformance("operation-1", "success");

// Get statistics
const stats = debugger.getPerformanceStats();
console.log("Average duration:", stats.averageDuration);
console.log("Success rate:", stats.successRate);
```

## Publishing as Library

This library is designed to be published as an independent npm package in the future:

```bash
# Example packaging
cd lib/messaging
npm init -y
npm pack
```

## Dependencies

- `@trpc/server`: ^11.x
- `@trpc/client`: ^11.x
- `zod`: Schema validation (optional)
- `superjson`: Serialization for Date/Map/Set etc. (optional)
