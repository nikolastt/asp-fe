# 0002 — Feature folders and import direction

Status: accepted (2026-10-30)

Code is grouped by feature, in the style of bulletproof-react. Imports flow one way: shared code →
features → routes → app shell. dependency-cruiser enforces it (`npm run depcruise`, rules in
`.dependency-cruiser.cjs`).

```
src/
├── app/              # shell: providers, router and QueryClient setup
├── routes/           # TanStack file routes: thin, compose features, own search params and loaders
├── features/<name>/  # one per domain area, named with the glossary's term (athletes, food-diary)
│   ├── components/
│   ├── hooks/
│   └── <name>.test.tsx
├── components/ui/    # shadcn primitives (ADR-0003)
├── components/       # shared composites used by several features
├── hooks/            # shared hooks
├── lib/              # framework-free helpers (format, dates)
├── api/              # orval output and the fetch mutator (generated, never edited)
└── testing/          # MSW server, render helpers, test setup
```

## Rules

- **Features are isolated**: a feature never imports another feature. Two features meet in a route.
- **Features do not reach up** into `routes/` or `app/`.
- **Shared code is shared**: `components/`, `hooks/`, `lib/` and `api/` import no feature, route or shell
  code.
- **UI primitives stay primitive**: `components/ui/` imports only itself and `lib/`.
- **Routes do not import the shell**; they get the `QueryClient` from the router context.
- **Test code stays in tests**: `src/testing/` and dev dependencies such as `msw` are imported only by
  `*.test.ts(x)` files.
- No cycles. No barrel (`index.ts`) files: import the file you need, which keeps Vite's tree-shaking
  and the dependency graph honest.
- Code is promoted from a feature to shared folders only when a second feature needs it.
- Tests sit next to the code (`*.test.tsx`).

## Considered options

- **Feature-Sliced Design** with Steiger: seven layers is more structure than this app needs, more
  places for an agent to put code in the wrong one, and Steiger is in beta.
- **eslint-plugin-boundaries**: same rules inside the linter, but a second place to keep them; the API
  already uses dependency-cruiser.
