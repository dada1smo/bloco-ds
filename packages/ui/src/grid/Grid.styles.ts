import { cva } from 'class-variance-authority';

// Grid 2x do Carbon com gutter e margem que crescem por breakpoint (ADR 0008).
const columnStyles = 'grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16';
const gutterStyles = 'gap-4 md:gap-6 lg:gap-8 2xl:gap-10';
const marginStyles = 'mx-auto w-full max-w-page px-4 md:px-6 lg:px-8 2xl:px-10';

export const gridStyles = cva([columnStyles, gutterStyles, marginStyles]);
