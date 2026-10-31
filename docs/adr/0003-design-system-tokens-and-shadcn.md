# 0003 — Design system: tokens and shadcn primitives

Status: accepted (2026-10-30)

The look comes from the **PLATAFORMA (Hallmark)** frames of the design file (`untitled.pen`, pen.dev):
Participante · Painel, Participante · Roda da vida, Admin · Visão geral, Admin · Pessoas. The earlier
PLATAFORMA frames, in Montserrat, are not the reference.

## Decisions

- **`src/index.css` is the only source of colors, fonts, radii and shadows.** The brand palette (musgo,
  terracota, areia, papel, algodão, linha, tinta…) is mapped onto shadcn's semantic variables
  (`primary` = musgo-escuro, `card` = algodão, `border` = linha, `sidebar` = musgo-escuro) and exposed
  as utilities of its own (`bg-musgo`, `text-terracota`). Fonts are Instrument Sans (`font-sans`),
  Geist Mono (`font-mono`, for figures) and Herr Von Muellerhoff (`font-script`), self-hosted through
  Fontsource. Paper shadows: `shadow-raised`, `shadow-float`, `shadow-press`, `shadow-well`.
- **Lint forbids colors outside the theme**: arbitrary color values (`bg-[#…]`) and Tailwind's default
  palette (`text-red-500`) fail `better-tailwindcss/no-restricted-classes`; unknown classes fail
  `no-unknown-classes`; inline `style` fails `react/forbid-dom-props`. A design value that is not a
  token yet becomes a token in `index.css` first.
- **No dark mode**: the design has none. The `@custom-variant dark` stays so shadcn's `dark:` classes
  never follow the OS theme.
- **shadcn/ui primitives live in `src/components/ui/`**, added with the CLI (`npx shadcn add`), on Radix,
  with Lucide icons. They were tuned once to the design (40px controls, `shadow-raised` cards, the
  "Ativa" tag as `Badge outline`, tabs in a sunken well). Screens use them through their variants and
  `className` for layout; a primitive changes only when the design system changes, never to fit one
  screen. A new variant is preferred over overriding colors from outside.
- **Agents look components up before writing markup**: the project has the official shadcn skill
  (`.claude/skills/shadcn`, pinned in `skills-lock.json`) and the shadcn MCP server (`.mcp.json`).
- **A screen is done when it matches its frame**: the agent opens the running app in a browser and
  compares a screenshot with the frame, at the frame's width.
