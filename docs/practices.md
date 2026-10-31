# Front-end practices

How code is written in `asp-fe`. Each rule says what catches it: **lint**, **types**, **depcruise**
(import rules), **tests**, or **review** when no tool can. The review rules are why this file exists;
read it before writing UI code. The reasons behind the rules are in `docs/adr/`.

## Components

- One component per file, named export, kebab-case file named after it: `athlete-card.tsx` exports
  `AthleteCard`. Props typed in the same file; no `React.FC`. _lint (no default export), review_
- A component does one job. When it needs a comment to explain a JSX block, passes ~150 lines, or
  takes more than ~6 props, split it. _review_
- Build from the shadcn primitives in `components/ui` before writing a styled `div`: Card for panels,
  Badge for tags, Separator for rules, Skeleton for loading, Table for tables. Unsure which one? Ask the
  shadcn skill or run `npx shadcn docs <component>`. _review_
- Never edit a primitive in `components/ui` to fit one screen (ADR-0003). _review_
- Lists use a stable key from the data, never the index. No `style`, no `dangerouslySetInnerHTML`.
  _lint_

## State and effects

- Pick the first that fits: server data → generated Query hook; shareable or reload-safe (filters,
  tabs, page, selected record) → search params validated in the route; local → `useState`. No global
  store without an ADR. _review_
- Never copy query data or props into state; compute it during render. _lint (`set-state-in-effect`),
  review_
- `useEffect` only to sync with something outside React. Logic caused by a click goes in the handler;
  resetting state uses `key`. _lint (React Compiler rules), review_
- No `useMemo`, `useCallback` or `memo`: React Compiler does it. _lint_

## Data

- Only the generated client talks to the API; never `fetch` or a hand-written query key. _lint, review_
- Wrap a generated hook in a feature hook only to add behavior (invalidation, toast, mapping). _review_
- What the first paint needs is prefetched in the route `loader` with `ensureQueryData`. _review_
- Every query has its loading, empty and error state on screen: `Skeleton`, an empty message, and the
  error's `code` mapped to Portuguese copy. _review, tests_

## Forms

- react-hook-form with the generated Zod schema; shadcn `Field`/`FieldLabel`/`FieldError`. Every input
  has a label. Submit through the generated mutation and disable the button while it runs. _lint
  (jsx-a11y), review_

## Styling

- Theme colors only (`bg-card`, `text-muted-foreground`, `bg-musgo`): no hex, no Tailwind default
  palette. A missing value becomes a token in `src/index.css` first. _lint_
- Layout with flex or grid and `gap-*`, never `space-x/y-*`; `size-*` when width equals height. _lint,
  review_
- Figures (metrics, hours, counts) use `font-mono`, as the design does. _review_
- A screen matches its frame in the design file: open it in a browser at the frame's width and compare
  a screenshot before calling it done. _review_

## Accessibility

- A button for actions, a `Link` for navigation; never a clickable `div`. _lint (jsx-a11y)_
- Every control has an accessible name; icon-only buttons get `aria-label`; dialogs get a title. _lint,
  review_
- Test through roles. If `getByRole` cannot find something, the markup is wrong, not the test. _lint
  (testing-library)_

## Words

- Screens are in Portuguese, written in the JSX (no i18n library). Code is in English, with the domain
  terms from the glossary: `athlete`, never `participant` or `patient` (`GLOSSARY.md`). _review_
- Dates and numbers through `Intl` with `pt-BR` (`src/lib/format.ts`). _review_

## Personal and health data

- Nothing in browser storage, no personal data in URLs, no `console` (ADR-0005). _lint, review_

## Tests

- Test behavior the user sees: render the route (`renderRoute` in `src/testing/render.tsx`), act with
  the user's events, assert on roles and text. No snapshots, no `container` queries. _lint, review_
- API responses come from MSW handlers declared in the test; a request with no handler fails. _tests_
- A bug fix starts with a test that fails. _review_
- Nothing external: no network, no running API. _tests_

## Comments

Comment only what the code cannot say, in one or two lines: a non-obvious _why_, a trap, or a pointer
to the decision (`// docs/adr/0002`). Never narrate what the code does.
