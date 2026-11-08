import { cva } from 'class-variance-authority';

// Mobile-first: empilha no base, lado a lado a partir de md; gap = gutter do grid (ADR 0008).
export const sidebarStyles = cva('flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8 2xl:gap-10');

export const sidebarSideStyles = cva('shrink-0 md:w-sidebar');

export const sidebarContentStyles = cva('min-w-0 flex-1');
