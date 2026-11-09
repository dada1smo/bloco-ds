#!/usr/bin/env bash
# PostToolUse: valida tokens do DS quando um arquivo de estilo é editado.
file=$(jq -r '.tool_input.file_path // empty')
[[ "$file" =~ packages/ui/src/.*(\.styles\.ts|\.module\.css)$ || "$file" =~ packages/ui/src/theme/.*\.css$ ]] || exit 0
cd "$CLAUDE_PROJECT_DIR" || exit 0
if ! out=$(pnpm --filter @bloco/ui exec vitest run src/theme/tokens.test.ts 2>&1); then
  echo "tokens.test.ts falhou após editar $file:" >&2
  echo "$out" | tail -40 >&2
  exit 2
fi
