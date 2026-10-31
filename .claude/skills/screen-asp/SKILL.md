---
name: screen-asp
description: Draws a screen of the ASP platform (Radmila Bartuzi's participant and admin areas) in pen.dev, in her brand and the locked PLATAFORMA (Hallmark) system, running Hallmark on every screen. Use when asked to draw or design a platform screen, tab, modal or state ("desenha a tela de X", "quero uma aba para Y").
---

# Screen ASP

Every screen this skill draws is a **Hallmark app screen** inside a system that is already locked. The
brand decides the words, the system decides the look, Hallmark guards the floor. Nothing is re-derived.

## 1. Load the context

Read both in full, every run:

- [`references/marca.md`](references/marca.md): who the platform serves, the voice, the words, the
  sample data the screens already use.
- [`references/sistema.md`](references/sistema.md): the locked visual system (tokens, type, surfaces,
  controls, layout) and how each piece maps to `src/components/ui`.

Done when you can name the screen's one job, its dominant object and the one primary action, in the
brand's words.

## 2. Run Hallmark

Invoke the `hallmark` skill (Skill tool, args `app screen no pen.dev: <the screen>`) and run its flow
with these bindings, which replace its defaults:

| Hallmark step | Binding for this project                                                                                                                                                                                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0 Pre-flight  | `sistema.md` is the project's `design.md`: a locked system. No theme deal, no draw; genre modern-minimal, theme Coral, as stamped in the log.                                                                                                                                                                             |
| 1 Ask once    | `marca.md` answers audience and tone. Ask only what the request leaves open about the screen itself (what data it shows, its one action), in one message; when the request answers it, ask nothing.                                                                                                                      |
| Scope         | App screen (`references/flow.md` § App screens): no hero, no fold, no word budget; density, states and the signature object still bind.                                                                                                                                                                                  |
| 5 Picks       | App format: Screen, Signature, States, Flows (every frame a control opens), Components (the board's pieces), Material, Sweep.                                                                                                                                                                                            |
| 6 Build       | On the canvas, per [`references/pen.md`](references/pen.md), never HTML. The Floor holds in canvas terms: every colour and font is a `$` variable of the file; labels sentence case, untracked; no dot-joined meta; no card inside a card; no invented figure (sample data comes from `marca.md` § Dados de exemplo). |
| 7 Sweep       | sloplint cannot read `.pen`: waive it on the record. Walk `gates.md` § 5 against the screenshots; run the finish review in a fresh subagent on the exported PNGs; log the build with `theme.mjs log`.                                                                                                                     |

Done when the Picks block is out (before building) and, after building, the log entry is written with
the outcome row filled.

## 3. Draw

Follow `references/pen.md`. A screen ships whole, never as its resting frame alone. Done when the
feature container holds all of it:

- **Flows**: every control on the screen that opens or changes something has its frame. That means the
  panel, picker or menu it opens, a change staged and not yet saved (the destructive one when there is
  one), and the screen after saving.
- **States**: the four states of every data region (`sistema.md` § Every data region has four states).
- **Mobile**: the row at 390 (`sistema.md` § Mobile).
- **Components**: the "Componentes e variantes" board (`pen.md` § The component board). Every
  interactive piece the screens use (field, select, combobox, chip, row, tabs, button, save bar) is
  there as a reusable component, in every state it can take.

Then, for every frame and every board group: `placeholder` is off, the layout-problems visitor prints
nothing, every node's colour and font is a variable, and a screenshot was looked at and matches the
system's surfaces and type.

## 4. Hand back

- The final Picks block with the sweep outcome.
- The frame names and ids, and what changed in shared components (a new menu item propagates to every
  screen).
- The board: each component name with its variants.
- The code map: which `src/components/ui` primitive each board component becomes, and any value that
  must become a token in `src/index.css` first (ADR-0003).
- The material ask: the one real thing (data, copy, a decision from `marca.md` § Pontos em aberto) that
  would most improve the screen.
