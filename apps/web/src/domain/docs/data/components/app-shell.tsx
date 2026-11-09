import { AppShellDefault } from '../../examples/components/app-shell/default';
import defaultCode from '../../examples/components/app-shell/default?raw';
import { AppShellHeaderOnly } from '../../examples/components/app-shell/header-only';
import headerOnlyCode from '../../examples/components/app-shell/header-only?raw';
import { AppShellIcon } from '../../examples/components/app-shell/icon';
import iconCode from '../../examples/components/app-shell/icon?raw';
import { AppShellRightOnly } from '../../examples/components/app-shell/right-only';
import rightOnlyCode from '../../examples/components/app-shell/right-only?raw';
import type { Doc } from '../../types/doc';

export const appShellDoc: Doc = {
  slug: 'app-shell',
  title: 'AppShell',
  layer: 'components',
  examples: [
    { title: 'Default', render: () => <AppShellDefault />, code: defaultCode },
    { title: 'Header only', render: () => <AppShellHeaderOnly />, code: headerOnlyCode },
    { title: 'Icon', render: () => <AppShellIcon />, code: iconCode },
    { title: 'Right only', render: () => <AppShellRightOnly />, code: rightOnlyCode },
  ],
};
