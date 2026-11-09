#!/usr/bin/env bash
# Stop: se packages/ui mudou, exige typecheck + testes verdes antes de encerrar.
[[ $(jq -r '.stop_hook_active') == true ]] && exit 0  # evita loop
cd "$CLAUDE_PROJECT_DIR" || exit 0
[[ -z $(git status --porcelain packages/ui) ]] && exit 0
for cmd in "pnpm --filter ./packages/ui exec tsc --noEmit" "pnpm test"; do
  if ! out=$($cmd 2>&1); then
    echo "'$cmd' falhou:" >&2
    echo "$out" | tail -40 >&2
    exit 2
  fi
done
