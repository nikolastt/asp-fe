# ASP: screen vocabulary

The domain glossary lives in the API: `../asp-api/GLOSSARY.md`. This file only maps the Portuguese
words the screens show to those domain terms, so the code says `athlete` while the screen says
"Participante". Source: the PLATAFORMA frames of the design file.

| On screen (pt-BR)    | In code (domain term) | Note                                                |
| -------------------- | --------------------- | --------------------------------------------------- |
| Participante, Pessoa | Athlete               | "Pessoas" is the tenant panel's list of athletes    |
| Admin (área)         | Tenant panel          | The Owner's and Staff's area; never `admin` in code |
| Método ASP           | ASP Method            |                                                     |
| Fase                 | Phase                 | Autoconhecimento, Saúde, Performance                |
| Diário alimentar     | Food diary            |                                                     |

Words the screens use with no domain term yet stay unmapped until `/domain-modeling` resolves them in
the API's glossary: "Programa" (e.g. "Inicie sua Saúde", which does not match the glossary's
Premium/Basic Plan), "Roda da vida", "Metas da semana", "Encontro ao vivo", "Conquistas".
