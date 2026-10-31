# asp-fe

Front-end do ASP — React 19 + TypeScript + Vite, com Tailwind CSS v4 e shadcn/ui (Radix).

## Tema

O tema vem dos frames **PLATAFORMA (Hallmark)** do arquivo de design e fica todo em `src/index.css`:

- paleta da marca como utilitários próprios (`bg-musgo`, `text-terracota`, `border-linha`…) e mapeada
  nos tokens do shadcn (`primary` = musgo-escuro, `card` = algodão, `border` = linha, `sidebar` = musgo-escuro);
- fontes Instrument Sans (`font-sans`), Geist Mono (`font-mono`, para números) e Herr Von Muellerhoff
  (`font-script`), servidas via Fontsource;
- sombras de papel: `shadow-raised` (cards, botões claros), `shadow-float` (menus), `shadow-press`
  (botão primário) e `shadow-well` (trilho das abas).

Componentes novos: `npx shadcn@latest add <componente>`.

## Setup

```bash
npm install
cp .env.example .env   # opcional: muda para onde o /api aponta
npm run dev
```

Em dev, chamadas para `/api/*` são encaminhadas ao [asp-api](https://github.com/nikolastt/asp-api)
(`http://localhost:3000` por padrão), sem o prefixo `/api`.

## Scripts

| Script            | O que faz                          |
| ----------------- | ---------------------------------- |
| `npm run dev`     | servidor de desenvolvimento (Vite) |
| `npm run build`   | type-check + build de produção     |
| `npm run preview` | serve o build localmente           |
| `npm run lint`    | oxlint                             |
| `npm run format`  | prettier                           |
| `npm test`        | vitest (jsdom + Testing Library)   |
