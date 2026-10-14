import { createRoot } from 'react-dom/client';
import { Button } from '@bloco/ui';
import './index.css';

const levels = ['solid', 'outline', 'subtle'] as const;
const colors = ['primary', 'accent'] as const;

createRoot(document.getElementById('root')!).render(
  <main className="min-h-screen bg-background p-6 font-sans text-foreground">
    <h1 className="mb-4 text-2xl font-bold">bloco-ds</h1>
    <div className="flex flex-col gap-3">
      {colors.map((color) => (
        <div key={color} className="flex items-center gap-2">
          {levels.map((level) => (
            <Button key={level} level={level} color={color}>
              {color} {level}
            </Button>
          ))}
        </div>
      ))}
      <div className="flex items-center gap-2">
        <Button size="sm" level="solid" color="accent">
          sm
        </Button>
        <Button size="md">md</Button>
        <Button size="lg">lg</Button>
      </div>
    </div>
  </main>,
);
