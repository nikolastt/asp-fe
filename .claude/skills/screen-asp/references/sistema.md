# Sistema: PLATAFORMA (Hallmark)

The locked system of the platform screens. The source of truth is the four "✦ PLATAFORMA (Hallmark)"
frames in the design file and, in code, `src/index.css` (ADR-0003). The older "✦ PLATAFORMA" frames
in Montserrat are not the reference.

Hallmark stamp of the system: `shape: app screen · genre: modern-minimal · theme: Coral` (paper and
stationery lit from the left, one pressed ink for the settled state), with the brand's palette in
place of Coral's and Instrument Sans in place of General Sans (not available in pen.dev).

## Tokens

The `.pen` variables and their `src/index.css` names. Use the variable on the canvas, always.

| Role                                 | `.pen` variable                     | `index.css`                    | Value                    |
| ------------------------------------ | ----------------------------------- | ------------------------------ | ------------------------ |
| Page ground                          | `$papel`                            | `--papel` (`background`)       | #f7f4ee                  |
| Sheet, card, control stock           | `$hm-algodao`                       | `--algodao` (`card`)           | #fdfbf7                  |
| Second neutral, wells                | `$hm-papel-2`                       | `--papel-2` (`muted`)          | #efeae0                  |
| Hairline                             | `$hm-linha`                         | `--linha` (`border`)           | #e3dccf                  |
| Strong line, empty checkbox          | `$hm-linha-forte`                   | `--linha-forte`                | #cfc5b2                  |
| Ink                                  | `$tinta`                            | `--tinta` (`foreground`)       | #121210                  |
| Second ink, labels, meta             | `$tinta-suave`                      | `--tinta-suave`                | #4a4a44                  |
| Brand green, charts                  | `$musgo`                            | `--musgo`                      | #41472b                  |
| Primary action, sidebar              | `$musgo-escuro`                     | `--musgo-escuro` (`primary`)   | #23271a                  |
| The settled state, attention, focus  | `$terracota`                        | `--terracota`                  | #a34603                  |
| Warm accent on dark, chart 3         | `$areia`, `$areia-clara`            | `--areia`, `--areia-clara`     | #dac9a5, #efe7d6         |
| Scrim behind a side panel            | `$hm-veu`                           | `--veu` (new, add to index.css) | #1212104d                |
| Light edge, shade edge, cast         | `$hm-luz`, `$hm-sombra-borda`, `$hm-sombra-cast` | `--luz`, `--sombra-*` | #ffffffe6, #3a2e1f2b, #3a2e1f24 |
| Face, figures, script                | `$hm-font`, `$hm-mono`, `$font-script` | `font-sans`, `font-mono`, `font-script` | Instrument Sans, Geist Mono, Herr Von Muellerhoff |

`$font-display` (Montserrat) belongs to the site and the old frames; platform screens use `$hm-font`.
A value the screen needs that is not here becomes a variable first, and the hand-back names it as a new
token for `index.css`.

## Colour rules

- Terracota is spent on one thing per region: the done/settled state (a checked box, the "Feita"
  stamp), a count that asks attention, the focus ring. Never a fill behind text, a band or a heading.
- Musgo-escuro is the primary action and the sidebar. One filled primary per screen.
- Musgo, terracota, areia carry charts (`chart-1` to `chart-3`).
- Error is terracota text with an icon and a sentence; there is no red.
- The one exception is the menu item's count pill (terracota fill, white figure), which belongs to the
  menu component and the approved admin menu; it shows only when its data has loaded.

## Type

One family, `$hm-font`; figures in columns in `$hm-mono` 13. Sentence case, untracked labels.

| Use                         | Size / weight / tracking   | Colour         |
| --------------------------- | -------------------------- | -------------- |
| Screen title                | 32 / 600 / -0.9, lh 1.05   | `$tinta`       |
| Sheet title                 | 24 / 600 / -0.5            | `$tinta`       |
| Section title               | 18 / 600 / -0.3            | `$tinta`       |
| Row name                    | 16 / 500                   | `$tinta`       |
| Body, notes                 | 14 / 400, lh 1.45 to 1.5   | `$tinta-suave` |
| Labels, meta, column heads  | 13 / 500 (or 400 for meta) | `$tinta-suave` |
| Tag                         | 12 / 500                   | `$tinta`       |
| The stamp "Feita"           | 19 / 600 / -0.3, rotated 5° | `$terracota`  |

Meta lines join with a period or a comma, never a middle dot: "Quinta-feira, 30 de outubro. Semana 5 de 12".

## Surfaces

Paper on a desk, one light from the top left, every cast falling right and down.

- **Raised** (sheet, card, light button, chosen segment), shadcn `shadow-raised`:

  ```js
  raised=[{type:"shadow",shadowType:"inner",color:"$hm-luz",offset:{x:0,y:1}},{type:"shadow",shadowType:"outer",color:"$hm-sombra-borda",blur:1},{type:"shadow",shadowType:"outer",color:"$hm-sombra-borda",offset:{x:0,y:1}},{type:"shadow",shadowType:"outer",color:"$hm-sombra-cast",offset:{x:5,y:5},blur:12}]
  ```

- **Press** (the primary button), `shadow-press`: `{type:"shadow",shadowType:"outer",color:"$hm-sombra-cast",offset:{x:4,y:4},blur:10}`.
- **Well** (segmented control track), `shadow-well`: `[{type:"shadow",shadowType:"inner",color:"$hm-sombra-borda",offset:{x:1,y:1.5},blur:2},{type:"shadow",shadowType:"inner",color:"$hm-luz",offset:{x:-1,y:-1}}]`.
- **Ficha**: a note card (Radmila's recado) pinned over a sheet: `$hm-algodao`, radius 6, raised, rotated
  about 1.2°, avatar "RB" on `$musgo`. It is the Painel's signature; reuse it where Radmila speaks.

Each screen has **one sheet**: the dominant object, `$hm-algodao`, radius 8, raised, padding [32,36].
Everything else sits on the page ground, separated by a top hairline (`stroke $hm-linha`, `strokeWidth
{top:1}`, padding-top 24), never in its own card. A card never holds a card.

## Controls

All 40px tall (app range), radius 8 unless noted.

| Control             | Canvas recipe                                                                                     | Code                     |
| ------------------- | ------------------------------------------------------------------------------------------------- | ------------------------ |
| Primary             | fill `$musgo-escuro`, press shadow, padding [0,18], icon 16 + label 14/500 `$hm-algodao`          | `Button`                 |
| Secondary           | stroke `$tinta` 1, no fill, label 14/500 `$tinta`                                                 | `Button variant=outline` |
| Icon button         | 40×40, `$hm-algodao`, raised, icon 18 `$tinta`                                                    | `Button size=icon`       |
| Input / search      | `$hm-algodao`, radius 6, stroke `$tinta-suave` 1, padding [0,14], placeholder `#12121080` 13      | `Input`                  |
| Segmented / tabs    | well: `$hm-papel-2`, radius 10, padding 3, gap 2; chosen: `$hm-algodao` radius 7 raised; label 13/600, count `$hm-mono` 11 | `Tabs`                   |
| Tag / status        | radius 4, stroke `$tinta` 1, padding [1,6], 12/500                                                | `Badge variant=outline`  |
| Checkbox            | 22×22 radius 6; done: fill `$terracota` + lucide `check` 14 `$hm-algodao`; open: `$hm-algodao`, stroke `$hm-linha-forte` 1.5 | `Checkbox`               |
| Progress            | segments: rectangles height 4, radius 2, gap 3, done `$musgo`, open `$hm-linha`                   | `Progress`               |
| Day toggles (multi) | separate 52×36 radius 8 chips, gap 6, `$hm-algodao`; on: stroke `$tinta` 1.5, lucide `check` 12 + label 13/600; off: stroke `$hm-linha-forte` 1, label `$tinta-suave`. The segmented well stays for one-of-many | `ToggleGroup type=multiple` |
| Link                | text 13 to 14/500 on a frame with `strokeWidth {bottom:1}` in the text's ink (`$musgo` or `$tinta`), padding bottom 1 | `<a>` |
| Table               | full width, heads 13/500 `$tinta-suave`, rows with a top hairline, no outer border                 | `Table`                  |

Icons are lucide, 16 to 18, in the ink of their label.

## Layout

- Frame 1440 wide, `$papel`, `clip: true`. Left: the menu component instance (260, `height:
  fill_container`). Right: "Conteúdo", `fill_container`, vertical, padding [40,48,64,48], gap 36.
- Header: left, a meta line (14 `$tinta-suave`) over the screen title; right, actions (icon button, then
  the one primary). `justifyContent: space_between`, `alignItems: end`.
- Body: a main column (`fill_container`) and, when the screen has a secondary region, a side column of
  340, gap 48; a screen with two kinds of content stacks them as sections instead (task screens).
  Lists are rows with a top hairline, padding [18,0], gap 16.
- The participant menu has more than seven destinations, which is what earns the sidebar; admin has its
  own menu component.

## Patterns already drawn

Reuse these before inventing; copy them from their frame.

- **Week grid** (Participante · Tarefas): a task per row, a 32px cell per day, gap 3. Cell states:
  done (the checkbox, terracota), open (empty box, `$hm-linha-forte`), today to mark (empty box,
  `$tinta` 1.5), not yet (box in `$hm-linha` 1), outside the task (an 8px dash). Today's cells sit on
  `$hm-papel-2` and its head carries a 2px `$musgo` bar. A legend under the grid names the states.
- **Detail in the side panel**: clicking any task (a grid row or a card; rows end in a `chevron-right`)
  opens the same 480 panel as the composer, over the `$hm-veu` scrim, with the clicked row on
  `$hm-papel-2` underneath. Top to bottom: kind tag and area, the title 24/600, the facts (where it was
  agreed, how often) with 15px icons, then sections over hairlines. Participant: "Esta semana" (the
  week with 26px boxes and dates, today on `$hm-papel-2`, progress) and the one primary "Marcar
  <dia> como feita"; "Recado da Radmila" as the ficha with a reply field; "Suas anotações" (mono date,
  note) and "Anotar como foi". Admin: the person above the title, "Semana da <nome>" read-only with a
  plain-language note, "Seu recado" with a field to send another, "Anotações da <nome>", and a footer
  with Editar tarefa, Pausar and a quiet Remover (more in the ellipsis). Never expand a row inline.
- **Task screens** (Participante · Tarefas, Admin · Tarefas) share one shape: sections stacked with
  gap 40, each with its head outside the body (title 24/600, one line of text, a summary or link on
  the right). Each person's own job comes first: the participant's routine grid, then her board; the
  admin's board, then the grid of what she assigned. Recurring tasks live in the **week grid** on a
  sheet, always with the page head's week stepper and the legend under it; one-off tasks live on a
  **board**: three lanes, Hoje, Esta semana, Feitas (each a `$hm-papel-2` panel, radius 12, padding
  [14,12], with its label 14/600, a mono count and a date on the right) holding **task cards**
  (`$hm-algodao`, radius 8, raised, padding [14,16], gap 10). A card reads top to bottom: the kind
  tag and the due date (or the stamp), the title 15/600, the person (22px avatar and name) when there
  is one, an optional note, then a footer over a hairline with its one action. The participant's
  kinds are "Da Radmila" (ink tag) and "Sua" (muted tag); the admin's are "Criar tarefa" (ink tag,
  footer "Criar e atribuir") and "Lembrete" (muted tag, footer "Marcar como feita"). The ink tag is
  filled (`$tinta`, text `$hm-algodao`); the muted one is an outline in `$hm-linha-forte`. A "Criar
  tarefa" card's title names the subject and the person, never the verb again: "Mobilidade para o
  Guilherme".
- **Admin, Atribuídas por você**: the same week grid, one row per person and task (avatar, name, task)
  so she reads a runner's week exactly as the runner does. A task that starts later shows dashes and
  "Começa seg, 3 nov".
- **Composer as a side panel**: "Criar e atribuir" opens a 480 panel on the right over a `$hm-veu`
  scrim (shadcn `Sheet`), never inline. It holds Para (fixed by the card), Tarefa, Área and Começa,
  Dias (day toggles), an optional recado, and a preview of the row in the person's week (grid heads,
  cells, progress, in a well). The footer pins to the bottom: "Ao atribuir, o seu item vai para
  Feitas.", Cancelar, and the one primary "Atribuir ao <nome>". After assigning, the card moves to the
  top of Feitas with its stamp and a trace ("Criada agora: …") with "Ver na rotina de…" and
  "Desfazer", and the person's row appears in the grid. The panel's own states (no day, assigning,
  failed) are in "Admin · Tarefas · Estados do compositor".
- **The pressed stamp** "Feita" for a goal met, the **ficha** for Radmila's note over a sheet, the
  **segmented well** for filters with counts (Admin · Pessoas), the **phase list** (Painel).

## Every data region has four states

Full, loading (a skeleton in the shape of the rows, `$hm-papel-2` bars), empty (what belongs here, why
it is empty, the one action that fills it, optionally one of her phrases) and error (what broke and what
to do, terracota icon, a retry). Draw them; a screen with only the full state is a quarter drawn.
