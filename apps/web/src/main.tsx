import { createRoot } from 'react-dom/client';
import { BLButton, BLThemeSwitch } from '@bloco/ui';
import './index.css';

const levels = ['solid', 'outline', 'subtle'] as const;
const colors = ['primary', 'accent'] as const;

createRoot(document.getElementById('root')!).render(
  <main className="min-h-screen bg-background p-6 font-sans text-foreground">
    <header className="mb-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">bloco-ds</h1>
      <BLThemeSwitch />
    </header>
    <div className="flex flex-col gap-3">
      {colors.map((color) => (
        <div key={color} className="flex items-center gap-2">
          {levels.map((level) => (
            <BLButton key={level} level={level} color={color}>
              {color} {level}
            </BLButton>
          ))}
        </div>
      ))}
      <div className="flex items-center gap-2">
        <BLButton size="sm" level="solid" color="accent">
          sm
        </BLButton>
        <BLButton size="md">md</BLButton>
        <BLButton size="lg">lg</BLButton>
      </div>
    </div>
  </main>,
);
