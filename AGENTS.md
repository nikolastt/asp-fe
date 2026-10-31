# AGENTS.md

`asp-fe` is the React SPA of the ASP platform (sports nutritionists following their athletes). The API is
`asp-api`, a separate repository, usually checked out next to this one.

## Before calling work done

- `npm run check` passes: format, typecheck, lint, import rules, unused code, tests. Show its output.
- A UI change is seen in the browser: `npm run dev`, open the page, and compare a screenshot with its
  frame in the design file (PLATAFORMA (Hallmark) frames, ADR-0003). Show the screenshot.

The hooks in `.claude/settings.json` lint each edited file and typecheck and test before you stop; fix
what they report rather than working around a rule. A rule that looks wrong is raised with the user,
not disabled.

## Where things are decided

- `docs/practices.md`: how components, state, data, forms, styling and tests are written. Read it before
  writing UI code; its "review" rules are the ones no tool checks.
- `docs/adr/`: stack and state (0001), folders and imports (0002), design system (0003), quality gates
  (0004), personal data in the browser (0005). The API contract, auth and data exposure rules are in
  the API's ADRs 0004, 0009 and 0010.
- Generated, never edited: `src/routeTree.gen.ts` (router plugin) and, once the API publishes its
  OpenAPI file, `src/api/` (orval).

## Code comments

Comment only what the code cannot say, in one or two lines:

- a non-obvious _why_;
- a trap or external constraint that breaks if changed;
- a pointer to the decision instead of re-explaining it: `// docs/adr/0002`.

Never narrate what the code does, and never put usage examples in comments.

## Agent skills

### shadcn

The project skill `.claude/skills/shadcn` and the shadcn MCP server (`.mcp.json`) know the installed
components and their docs; use them before writing UI markup. Add components with `npx shadcn add`.

### screen-asp

`.claude/skills/screen-asp` draws a new platform screen in pen.dev in Radmila's brand and the locked
PLATAFORMA (Hallmark) system, running Hallmark on it; reach for it before drawing any screen, tab or
state.

### Issue tracker

Issues live in GitHub Issues on nikolastt/asp-fe, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default triage roles, each label named after its role. See `docs/agents/triage-labels.md`.

### Domain docs

The domain glossary is the API's (`../asp-api/GLOSSARY.md`); this repo's `GLOSSARY.md` maps screen
words to it, and decisions are in `docs/adr/`. See `docs/agents/domain.md`.
