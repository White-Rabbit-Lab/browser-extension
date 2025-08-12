# tRPC v11 Browser Extension Messaging

Type-safe messaging library for Chrome Extensions with custom tRPC v11 implementation

## Features

- **Full type safety**: TypeScript type inference and runtime validation with Zod
- **tRPC v11 compatible**: Leverages latest tRPC features
- **Lightweight**: Minimal bundle size (<10KB core)
- **Tree-shakeable**: Import only what you need
- **WXT support**: Includes adapter for WXT framework
- **Easy integration**: Simple to add to existing projects

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
├── adapters/
│   └── wxt.ts          # WXT framework adapter
├── examples/            # Usage examples
│   ├── router.ts       # Router definition example
│   ├── background.ts   # Background script example
│   ├── client.ts       # Client example
│   └── react-usage.tsx # React integration example
└── index.ts             # Exports
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
