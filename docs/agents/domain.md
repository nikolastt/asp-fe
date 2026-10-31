# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Before exploring, read these

- **`../asp-api/GLOSSARY.md`**: the domain glossary, shared by both repos and kept in the API. If `asp-api` is not checked out next to this repo, read it with `gh api repos/nikolastt/asp-api/contents/GLOSSARY.md --jq .content | base64 -d`.
- **`GLOSSARY.md`** at this repo's root: only the words the screens use, and which domain term each one maps to.
- **`docs/adr/`**: read ADRs that touch the area you're about to work in. Decisions about the API contract, auth and personal data live in the API's `docs/adr/` (ADR-0004, ADR-0009, ADR-0010); this repo's ADRs point at them.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## File structure

```
/
├── GLOSSARY.md        ← screen words → domain terms
├── docs/adr/          ← front-end decisions
└── src/
```

A new domain term goes into the API's `GLOSSARY.md`, not here: both repos speak the same domain.

## Use the glossary's vocabulary

Code (identifiers, file and folder names, test names, issue titles) uses the English domain term from the glossary. Screens use the Portuguese words in this repo's `GLOSSARY.md`. Don't drift to synonyms the glossary explicitly avoids: a folder is `features/athletes`, never `features/participants` or `features/patients`.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, here or in the API, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0002 (features are isolated), but worth reopening because…_
