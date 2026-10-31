# 0004 — Quality gates for agent-written code

Status: accepted (2026-10-30)

Same reasoning as asp-api ADR-0008: most code here is written by AI agents, written instructions are
followed unreliably, and tools are not. Conventions that matter are enforced by checks that fail, in
the agent's own hooks, at pre-commit, and in `npm run check`. Rules no tool can check are listed in
`docs/practices.md`.

## Decisions

- **TypeScript 6.0.x**, not 7. TS 7 has no programmatic API yet, and dependency-cruiser and
  typescript-eslint need one. Vite does not typecheck, so the build does not depend on it. Back to TS 7
  when those tools support it.
- **Strict tsconfig** on top of `strict`: `noUncheckedIndexedAccess`, `noImplicitReturns`,
  `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `verbatimModuleSyntax`,
  `erasableSyntaxOnly`. `exactOptionalPropertyTypes` stays off: Radix, shadcn and form library types are
  rarely written for it (asp-api hit the same problem).
- **One linter: oxlint, type-aware**, with the `react` (including the React Compiler rules), `jsx-a11y`,
  `import`, `unicorn`, `promise`, `vitest` and `typescript` plugins. The three gaps oxlint has no
  native rules for run inside it as **JS plugins**: `eslint-plugin-better-tailwindcss` (theme-only
  colors, unknown and conflicting classes), `@tanstack/eslint-plugin-query` and
  `eslint-plugin-testing-library`. This was preferred over a second linter (ESLint with
  `eslint-plugin-oxlint`): one config, one pass, one command in the hooks. oxlint's JS plugins are
  alpha; if they break, the same three plugins move to an ESLint flat config limited to those rules.
- **Restricted APIs** fail lint with a pointer to the decision: `fetch` outside `src/api` (ADR-0001);
  `localStorage`, `sessionStorage` and `indexedDB` (ADR-0005); `useMemo`, `useCallback`, `memo`
  (ADR-0001); `axios`; `console`; `style` and `dangerouslySetInnerHTML`; array index as `key`; default
  exports outside config files.
- **dependency-cruiser** enforces the folders and import direction of ADR-0002.
- **knip** finds unused files, exports and dependencies; the shadcn primitives are entries, since not all
  are used yet.
- **Prettier** with `prettier-plugin-tailwindcss` sorts classes; **lefthook** runs prettier, oxlint and
  `tsc -b` before each commit; no pre-push hook, since session branches are pushed with `--no-verify`.
- **Claude Code hooks**: after each edit, prettier and oxlint on the file (exit 2 shows the error to the
  agent); on Stop, typecheck, dependency-cruiser and the tests related to the changed files. Reading
  `.env` files and editing `src/routeTree.gen.ts` are denied.
- **One entry point**: `npm run check` runs format check, typecheck, lint, dependency-cruiser, knip and
  tests.
- **Tests use nothing external**: Vitest with jsdom, Testing Library and MSW. MSW fails the test on any
  request without a handler (`onUnhandledFrame: 'error'`). Tests render real routes through
  `src/testing/render.tsx`. Playwright, with axe for accessibility, comes with the first critical flow
  (login); Vitest browser mode only for components that need real layout.
- **No CI yet**, as in the API (asp-api ADR-0008, "CI paused"): pull requests state that
  `npm run check` passed locally.
