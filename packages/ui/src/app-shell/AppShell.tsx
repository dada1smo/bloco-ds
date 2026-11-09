import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type ReactNode,
} from 'react';
import {
  appShellCellStyles,
  appShellHeaderStyles,
  appShellMainStyles,
  appShellPanelStyles,
  appShellStyles,
} from './AppShell.styles';

type Side = 'left' | 'right';
type Collapsible = 'offcanvas' | 'icon' | 'none';

// Abaixo destes valores o lado sai do grid e vira overlay (--breakpoint-lg 66rem, --breakpoint-xl 82rem).
const overlayQuery: Record<Side, string> = {
  left: '(max-width: 65.99rem)',
  right: '(max-width: 81.99rem)',
};

export type AppShellSidebarState = {
  state: 'expanded' | 'collapsed';
  /** Aberta quando o lado está no grid. */
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Aberta quando o lado está em overlay (abaixo do breakpoint). */
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  /** O lado está em overlay agora. */
  isMobile: boolean;
  /** Alterna `openMobile` ou `open`, conforme `isMobile`. */
  toggleSidebar: () => void;
};

const AppShellContext = createContext<Record<Side, AppShellSidebarState> | null>(null);

/** Estado e controle de uma sidebar do `AppShell`, para qualquer componente dentro dele (ex.: botão no header). */
export function useAppShell(side: Side): AppShellSidebarState {
  const context = useContext(AppShellContext);
  if (!context) throw new Error('useAppShell must be used inside AppShell');
  return context[side];
}

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window.matchMedia !== 'function') return () => {};
      const media = window.matchMedia(query);
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => typeof window.matchMedia === 'function' && window.matchMedia(query).matches,
    () => false,
  );
}

function useSidebarState(
  side: Side,
  collapsible: Collapsible,
  value: boolean | undefined,
  defaultValue: boolean,
  onChange?: (open: boolean) => void,
): AppShellSidebarState {
  const [internal, setInternal] = useState(defaultValue);
  const [openMobile, setOpenMobile] = useState(false);
  const isMobile = useMediaQuery(overlayQuery[side]);
  const open = value ?? internal;
  const setOpen = (next: boolean) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };
  const isOpen = collapsible === 'none' || (isMobile ? openMobile : open);
  return {
    state: isOpen ? 'expanded' : 'collapsed',
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar: () => (isMobile ? setOpenMobile(!openMobile) : setOpen(!open)),
  };
}

export type AppShellProps = ComponentProps<'div'> & {
  /** Área do topo, em toda a largura. */
  header?: ReactNode;
  /** Sidebar principal, à esquerda. Sai do grid (overlay) abaixo de `lg`. */
  sidebarLeft?: ReactNode;
  /** Sidebar secundária, à direita. Sai do grid (overlay) antes, abaixo de `xl`. */
  sidebarRight?: ReactNode;
  /** Como a sidebar recolhe: some (`offcanvas`), vira trilho de ícones (`icon`) ou nunca recolhe (`none`). */
  leftCollapsible?: Collapsible;
  rightCollapsible?: Collapsible;
  leftOpen?: boolean;
  defaultLeftOpen?: boolean;
  onLeftOpenChange?: (open: boolean) => void;
  rightOpen?: boolean;
  defaultRightOpen?: boolean;
  onRightOpenChange?: (open: boolean) => void;
};

/** Casco de tela cheia: reserva header, sidebars e content, sem decidir o que vai em cada área. */
export function AppShell({
  header,
  sidebarLeft,
  sidebarRight,
  leftCollapsible = 'offcanvas',
  rightCollapsible = 'offcanvas',
  leftOpen,
  defaultLeftOpen = true,
  onLeftOpenChange,
  rightOpen,
  defaultRightOpen = true,
  onRightOpenChange,
  children,
  className,
  ...props
}: AppShellProps) {
  const left = useSidebarState('left', leftCollapsible, leftOpen, defaultLeftOpen, onLeftOpenChange);
  const right = useSidebarState('right', rightCollapsible, rightOpen, defaultRightOpen, onRightOpenChange);

  const sidebar = (side: Side, content: ReactNode, collapsible: Collapsible, state: AppShellSidebarState) => {
    if (content === undefined) return null;
    const hidden = state.state === 'collapsed' && collapsible === 'offcanvas';
    return (
      <div className={appShellCellStyles({ side, collapsible, open: state.open })}>
        <div
          data-side={side}
          data-state={state.state}
          data-collapsible={collapsible}
          aria-hidden={hidden || undefined}
          inert={hidden}
          className={appShellPanelStyles({ side, collapsible, openMobile: state.openMobile })}
        >
          {content}
        </div>
      </div>
    );
  };

  return (
    <AppShellContext.Provider value={{ left, right }}>
      <div {...props} className={appShellStyles({ className })}>
        {header !== undefined && <header className={appShellHeaderStyles()}>{header}</header>}
        {sidebar('left', sidebarLeft, leftCollapsible, left)}
        <main className={appShellMainStyles()}>{children}</main>
        {sidebar('right', sidebarRight, rightCollapsible, right)}
      </div>
    </AppShellContext.Provider>
  );
}
