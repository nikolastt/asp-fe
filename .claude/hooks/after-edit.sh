#!/usr/bin/env bash
# PostToolUse (Edit|Write): format the edited file and lint it. A lint error
# exits 2 so Claude sees it and fixes it right away (docs/adr/0004).
set -uo pipefail
cd "$CLAUDE_PROJECT_DIR" || exit 0

file=$(node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{process.stdout.write(JSON.parse(s).tool_input?.file_path??"")}catch{}})')
case "$file" in
  "$CLAUDE_PROJECT_DIR"/node_modules/* | "$CLAUDE_PROJECT_DIR"/dist/* | "") exit 0 ;;
  *.ts | *.tsx | *.cjs | *.json | *.css | *.md) ;;
  *) exit 0 ;;
esac
[ -f "$file" ] || exit 0

npx prettier --write --log-level warn "$file" >&2
case "$file" in
  *.ts | *.tsx | *.cjs)
    if ! out=$(npx oxlint "$file" 2>&1); then
      echo "$out" >&2
      exit 2
    fi
    ;;
esac
exit 0
