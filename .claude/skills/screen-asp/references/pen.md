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
| Participante · Tarefas (Hallmark)      | `FyRRo`  | x 6560, y 41200; below it "Detalhe da tarefa" (`bKhQh`) and the states |
| Menu item "Tarefas" (in the component) | `w6UtSU` | second item, after Início   |
| Admin · Tarefas (Hallmark)             | `mxHa2`  | x 8200, y 41200; below it "Criando para o Guilherme" (`oginP`, the side panel), "Depois de atribuir" (`hAgk0`), "Detalhe da tarefa" (`h1aWap`) and the states |
| Admin menu item "Tarefas"              | `gve1y`  | first under Acompanhamento  |
| Admin · Tarefas · Estados do compositor | `d6bCx5` | x 9840, y 41200            |
| Mobile: Participante · Tarefas, Detalhe; Admin · Tarefas, Criando, Detalhe | `zksjt`, `k7rJ7`, `k1nQk`, `sQHgw`, `Q6mKe` | x 11480 to 13360, 470 apart, y 41200 |

Ids drift as people edit; when one is missing, find the node by name with a visitor instead of
recreating it. New platform screens go on the Hallmark row (y 41200), 1640 apart, to the right of the
last one; their state frames go under the screen, 200 below its bottom. Name them
`✦ PLATAFORMA (Hallmark) — <Área> · <Tela>` and `… · Estado <vazio|carregando|erro>`.

## Recipe for a new screen

1. **Copy the closest Hallmark screen** to the new position with `placeholder: true` (participant:
   `kvAJP`; admin: `NQ4xB`), and turn it off once the header stands, so the region screenshots
   render. The copy keeps the menu instance and its font overrides.
2. **Set the active menu item** on the copy's menu instance with `descendants`: the active item gets
   `{fill:"#ffffff17",cornerRadius:12}`, its `…/z4bGp` (icon) `{fill:"$areia"}` and its `…/WjmdY`
   (label) `{fill:"#ffffff",fontWeight:"600"}`; the item that was active goes back to `{fill:
   "#00000000"}`, icon `{fill:"#ffffff8c"}`, label `{fill:"#ffffffb3",fontWeight:"500"}`. The menu's
   white-alpha colours are the component's own and stay literal.
3. **Clear "Conteúdo"** (delete its children) and build the header, then the dominant sheet, then the
   side column, one `execute` per region, each ending in a `TakeScreenshot` of that region.
4. **Draw the states** as their own frames: copy the finished screen, replace only the data region.
5. **Check**: `Get(screen,(n,c)=>c.problems&&Print(n.name,c.parentCtx?.node.name,c.problems))` prints
   nothing but nodes you disabled (`enabled: false` reports as "fully clipped"); a visitor finds no
   `fill`, `stroke` or `fontFamily` that is a literal outside the menu instance; the frame's `height`
   is "Conteúdo"'s height, but never under the menu's own (900 participant, 932 admin), or the menu's
   footer rides over its items. A copy keeps the source's fixed height, so set it every time.
6. **Export** the screen and its states to PNG (`Export([...],"png",<scratchpad dir>)`) for the finish
   review.

## A new menu destination

Add it to the component, not to one screen: `Insert` a `ref` to `gw7a3` into the component's items
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
