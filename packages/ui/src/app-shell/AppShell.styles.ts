import { cva, type VariantProps } from 'class-variance-authority';

// Tela cheia: header ocupa a linha de cima; sidebars nas colunas de borda (auto = largura da célula), content no meio.
export const appShellStyles = cva(
  'grid h-dvh grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-[auto_minmax(0,1fr)] overflow-hidden bg-background font-sans text-primary',
);

export const appShellHeaderStyles = cva('col-span-full row-start-1 flex h-header items-center border-b border-subtle');

export const appShellMainStyles = cva('col-start-2 row-start-2 overflow-auto');

// Hierarquia: a esquerda (principal) sai do grid abaixo de lg; a direita (secundária) já abaixo de xl.
// A célula é a pegada no grid e anima a largura; abaixo do breakpoint fica só a pegada recolhida.
export const appShellCellStyles = cva('relative row-start-2 motion-safe:transition-[width] motion-safe:duration-200', {
  variants: {
    side: { left: 'col-start-1 lg:overflow-hidden', right: 'col-start-3 xl:overflow-hidden' },
    collapsible: { offcanvas: 'w-0', icon: 'w-rail', none: 'w-sidebar' },
    open: { true: '', false: '' },
  },
  compoundVariants: [
    { side: 'left', collapsible: ['offcanvas', 'icon'], open: true, className: 'lg:w-sidebar' },
    { side: 'right', collapsible: ['offcanvas', 'icon'], open: true, className: 'xl:w-sidebar' },
  ],
});

// O painel guarda o conteúdo. Abaixo do breakpoint vira overlay sobre o content e desliza (offcanvas) ou alarga (icon).
// offcanvas/none mantêm w-sidebar enquanto a célula anima, para o conteúdo não quebrar linha no meio da transição.
export const appShellPanelStyles = cva(
  'group flex h-full flex-col overflow-x-hidden overflow-y-auto border-subtle bg-layer-01 motion-safe:transition-[width,translate] motion-safe:duration-200',
  {
    variants: {
      side: {
        left: 'left-0 border-r max-lg:absolute max-lg:inset-y-0 max-lg:z-10',
        right: 'right-0 border-l max-xl:absolute max-xl:inset-y-0 max-xl:z-10',
      },
      collapsible: { offcanvas: 'w-sidebar', icon: 'w-full', none: 'w-sidebar' },
      openMobile: { true: '', false: '' },
    },
    compoundVariants: [
      { side: 'left', collapsible: 'offcanvas', openMobile: false, className: 'max-lg:-translate-x-full' },
      { side: 'right', collapsible: 'offcanvas', openMobile: false, className: 'max-xl:translate-x-full' },
      { side: 'left', collapsible: 'icon', openMobile: true, className: 'max-lg:w-sidebar' },
      { side: 'right', collapsible: 'icon', openMobile: true, className: 'max-xl:w-sidebar' },
      { side: 'left', collapsible: ['offcanvas', 'icon'], openMobile: true, className: 'max-lg:shadow-floating' },
      { side: 'right', collapsible: ['offcanvas', 'icon'], openMobile: true, className: 'max-xl:shadow-floating' },
    ],
  },
);

export type AppShellPanelStyleProps = VariantProps<typeof appShellPanelStyles>;
