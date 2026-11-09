import { useState } from 'react';
import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { BLIconButton, BLTypography } from '@bloco/ui';

// Código em bloco com botão de copiar (exemplos e snippet de import das páginas de docs).
export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-layer-01">
      <pre className="overflow-x-auto p-4 pr-16">
        <BLTypography as="code" variant="code-01" font="mono">
          {code}
        </BLTypography>
      </pre>
      <BLIconButton
        level="subtle"
        size="sm"
        aria-label={copied ? 'Copiado' : 'Copiar código'}
        onPress={copy}
        className="absolute top-2 right-2"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </BLIconButton>
    </div>
  );
}
