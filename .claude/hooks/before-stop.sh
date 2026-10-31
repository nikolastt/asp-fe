#!/usr/bin/env bash
# Stop: when TypeScript changed, typecheck, check the import rules and run the
# tests related to the changed files; exit 2 keeps Claude working until they
# pass (docs/adr/0004).
set -uo pipefail
cd "$CLAUDE_PROJECT_DIR" || exit 0

changed=$( { git diff --name-only HEAD; git ls-files --others --exclude-standard; } \
  | grep -E '\.tsx?$' | sort -u | while read -r f; do [ -f "$f" ] && echo "$f"; done)
[ -z "$changed" ] && exit 0

if ! out=$(npx tsc -b 2>&1); then
  printf 'Typecheck failed:\n%s\n' "$out" >&2
  exit 2
fi
if ! out=$(npm run --silent depcruise 2>&1); then
  printf 'Import rules (docs/adr/0002) failed:\n%s\n' "$out" | tail -40 >&2
  exit 2
fi
# shellcheck disable=SC2086
if ! out=$(npx vitest related --run --passWithNoTests $changed 2>&1); then
  printf 'Tests related to the changed files failed:\n%s\n' "$out" | tail -60 >&2
  exit 2
fi
exit 0
