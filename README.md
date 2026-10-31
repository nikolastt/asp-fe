# asp-fe

Front-end do ASP — React 19 + TypeScript + Vite.

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
