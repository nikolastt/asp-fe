# Drawing in pen.dev

## Before the first call

- `mcp__pencil__get_app_state` names the open file; the platform lives in `untitled.pen` (on this
  machine `/home/nikolas/Downloads/untitled.pen`). Pass that path as `filePath` on every call.
- Read the pen.dev skill once per session: `read_skill()`, then `execute.md` and `guide/web-app.md`.
  `.pen` files are encrypted; touch them only through the MCP tools.

## Where things are

| What                                   | Id       | Position                    |
| -------------------------------------- | -------- | --------------------------- |
| Componente / Item de menu              | `gw7a3`  | x -1640, y 39600            |
| Componente / Menu lateral · Participante | `F3E5rT` | x -1640, y 39720          |
| Componente / Menu lateral · Admin      | `j3d9NF` | x -1340, y 39720            |
| Participante · Painel (Hallmark)       | `kvAJP`  | x 0, y 41200                |
| Participante · Roda da vida (Hallmark) | `uEbqK`  | x 1640, y 41200             |
| Admin · Visão geral (Hallmark)         | `s6N7uH` | x 3280, y 41200             |
| Admin · Pessoas (Hallmark)             | `NQ4xB`  | x 4920, y 41200             |
| Menu item "Tarefas" (in the component) | `w6UtSU` | second item, after Início   |
| Admin menu item "Tarefas"              | `gve1y`  | first under Acompanhamento  |
| ✦ FEATURE — Tarefas (all task screens) | `QWmIG`  | x 0, y 43200                |
| Admin menu item "Permissões"           | `DZYbc`  | last under Gestão           |
| ✦ FEATURE — Permissões                 | `c95D0`  | x 0, y 51600                |

Inside "✦ FEATURE — Tarefas": row "Participante, desktop" (`FyRRo` Tarefas, `bKhQh` Detalhe, then the
three states), row "Admin, desktop" (`mxHa2` Tarefas, `oginP` Criando para o Guilherme, `hAgk0`
Depois de atribuir, `h1aWap` Detalhe), row "Admin, compositor e estados" (`d6bCx5` and the three
states), row "Mobile" (`zksjt`, `k7rJ7`, `k1nQk`, `sQHgw`, `Q6mKe`).

Inside "✦ FEATURE — Permissões": row "Admin, desktop" (`DWH6R` Permissões, `iy9RV` Equipe, `bHJ7H`
Mudando o cargo, `c0bHrK` Depois de salvar, `Le6j2` Acesso do Pedro, `PhieW` Seletor de pessoa,
`jB4Vw` Roda da vida), row "Admin, estados", row "Plataforma, desktop" (`P0obI` Espaços and its
states; the platform panel has a top bar, no menu component), row "Mobile", and the board "Componentes
e variantes" (`HzlWw`), the reference for every board below.

Ids drift as people edit; when one is missing, find the node by name with a visitor instead of
recreating it.

**Each feature lives in its own container**, never loose on the canvas: a frame `✦ FEATURE — <nome>`
(`$areia-clara`, radius 48, vertical, padding [160,160,200,160], gap 160) placed in empty space below
the rest (`FindEmptySpace`, or under the lowest node), with a head (the name 120/600 and one line of
what it covers) and one row per audience and breakpoint ("Participante, desktop", "Admin, desktop",
"Mobile"…), closing with the row "Componentes e variantes". A row is a label (64/600 and a mono count) over the screens side by side (gap 120, 96 on
mobile); each screen sits in a cell with its caption (32/500 `$tinta-suave`) above it, because only
top-level frames show their name on the canvas. Screens inside take their place from the layout, so
their x/y are ignored. Name each screen `✦ PLATAFORMA (Hallmark) — <Área> · <Tela>` and its states
`… · Estado <vazio|carregando|erro>`. The four original Hallmark screens stay on their row at y 41200.

## Recipe for a new screen

1. **Copy the closest Hallmark screen** into its cell in the feature container with `placeholder:
   true` (participant:
   `kvAJP`; admin: `NQ4xB`), and turn it off once the header stands, so the region screenshots
   render. The copy keeps the menu instance and its font overrides.
2. **Set the active menu item** on the copy's menu instance with `descendants`: the active item gets
   `{fill:"#ffffff17",cornerRadius:12}`, its `…/z4bGp` (icon) `{fill:"$areia"}` and its `…/WjmdY`
   (label) `{fill:"#ffffff",fontWeight:"600"}`; the item that was active goes back to `{fill:
   "#00000000"}`, icon `{fill:"#ffffff8c"}`, label `{fill:"#ffffffb3",fontWeight:"500"}`. The menu's
   white-alpha colours are the component's own and stay literal.
3. **Clear "Conteúdo"** (delete its children) and build the header, then the dominant sheet, then the
   side column, one `execute` per region, each ending in a `TakeScreenshot` of that region.
4. **Draw the flows and the states** as their own frames, each a copy of the finished screen with only
   the changed region replaced. A flow is every control that opens or changes something: the panel or
   picker it opens (a copy with the scrim and the 480 panel), the staged change not yet saved (its row
   on `$hm-papel-2` with "Ainda não salva." and Desfazer, plus the save bar naming who it reaches), and
   the screen after saving (the row's trace with the terracota check).
5. **Draw the mobile row** (`sistema.md` § Mobile) and **the component board** (below).
6. **Check**: `Get(screen,(n,c)=>c.problems&&Print(n.name,c.parentCtx?.node.name,c.problems))` prints
   nothing but nodes you disabled (`enabled: false` reports as "fully clipped"); a visitor finds no
   `fill`, `stroke` or `fontFamily` that is a literal outside the menu instance; the frame's `height`
   is "Conteúdo"'s height, but never under the menu's own (900 participant, 932 admin), or the menu's
   footer rides over its items. A copy keeps the source's fixed height, so set it every time.
7. **Export** the screens, flows, states and board groups to PNG (`Export([...],"png",<scratchpad
   dir>)`) for the finish review.

## The component board

The row "Componentes e variantes" holds one frame "Prancha" (`$papel`, radius 24, padding 80, vertical,
gap 96, about 3400 wide) with one group per interactive piece of the feature's screens. Copy the
groups of `HzlWw` before drawing new ones.

- **Group**: a top hairline, padding-top 40, gap 32. Its head is the name (32/600) over one line (18
  `$tinta-suave`) saying where it is used and its `src/components/ui` primitive. Then its variants side by side
  (gap 40, `alignItems: start`), each in a cell with its caption (15/500 `$tinta-suave`) above. A
  piece that has kinds and states (the access chip) is a grid: one row per state with its label on the
  left, one column per kind.
- **Variant**: `reusable: true`, named `<Feature> / <Peça> / <Variante>`. A new screen inserts `ref`s
  to these instead of redrawing them.
- **Which pieces**: every field, select, combobox, chip or toggle, tabs, list or table row, button and
  link, save bar, and any menu or popover the screens use, at the size and copy the screens use.
- **Which states**, every one the piece can take (`sistema.md` § Every control has its states):
  rest, hover, focus, disabled. Selects, comboboxes and menus are also drawn open, with an option on
  hover and the chosen one checked. Anything that searches or loads adds searching, no result and
  loading. Rows add selected (open in the panel), staged and saved. Buttons add saving.

## A new menu destination

Add it to the component, not to one screen (and keep the component outside any feature container): `Insert` a `ref` to `gw7a3` into the component's items
frame (participant `F3E5rT` → Navegação → Itens; admin `j3d9NF`, where each section frame holds its
"Seção" label first and then the items), `Move` it to its place (after the label in the admin menu),
set `descendants` for the icon (lucide name) and label, and screenshot the menu to see where it
landed. Then, on every Hallmark-frame instance of the menu, add the same font override the
other items carry (`<newItemId>/WjmdY` and `<newItemId>/eQupm`: `{fontFamily:"$hm-font"}`), since the
component's own font is the old `$font-display`. Say in the hand-back that every screen's menu changed.

## Canvas gotchas

- A frame with `placeholder: true` screenshots blank. Turn it off once the layout stands, and take the
  screenshot in a separate `execute`: one in the same call as a placeholder change can render stale.
- A side panel is two `layoutPosition: "absolute"` children of the screen frame: the `$hm-veu`
  scrim at 1440 wide and the 480 panel at x 960, both as tall as the frame; when the frame's height
  changes, change theirs.
- `underline` is in the schema but does not stick on text; draw a link as a frame with a bottom
  stroke (`sistema.md` § Controls).
- Globals assigned in one `execute` are not reliably there in the next; carry ids as string literals
  from the previous call's output.

- Text is invisible without `fill`; wrapping text needs `textGrowth:"fixed-width"` and a width.
- No percentages, margins or `alignItems: stretch`; use `fill_container`, gaps and padding.
- A pinned note over a sheet uses `layoutPosition:"absolute"` with x/y inside the sheet's column.
- Grids are rows of frames with `fill_container` cells; there is no wrap.
- On a failed `execute`, patch it with `edits` and the `editId`; never resend the snippet.

## The Hallmark log

Append the build with `node ~/.claude/skills/hallmark/scripts/theme.mjs log --log <log> --entry
'<json>'`, where `<log>` is the log the earlier platform builds used (`/home/nikolas/nikolas/.hallmark/
log.json` on this machine; `.hallmark/log.json` at the repo root otherwise). Fields: `scope: "app"`,
`mode` (`build` or `redesign`), `theme: "coral"`, `shape: "app screen"`, `signature`, `sections` (the regions), `waived`
(`"sloplint não roda em .pen"`, and `"fonte General Sans indisponível no pen.dev: Instrument Sans"`),
`prompt`, `date`.
