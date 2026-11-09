import { colorDoc } from './foundations/color';
import { spacingDoc } from './foundations/spacing';
import { layoutDoc } from './foundations/layout';
import { gridDoc } from './components/grid';
import { stackDoc } from './components/stack';
import { clusterDoc } from './components/cluster';
import { sidebarDoc } from './components/sidebar';
import { appShellDoc } from './components/app-shell';
import { accordionDoc } from './components/accordion';
import { navigationTreeDoc } from './components/navigation-tree';
import { buttonDoc } from './components/button';
import { buttonGroupDoc } from './components/button-group';
import { iconButtonDoc } from './components/icon-button';
import { dropdownDoc } from './components/dropdown';
import { inputDoc } from './components/input';
import { checkboxDoc } from './components/checkbox';
import { switchDoc } from './components/switch';
import { formDoc } from './components/form';
import { selectDoc } from './components/select';
import { modalDoc } from './components/modal';
import { tabsDoc } from './components/tabs';
import { badgeDoc } from './components/badge';
import { cardDoc } from './components/card';
import { anchorCardDoc } from './components/anchor-card';
import { toastDoc } from './components/toast';
import { tooltipDoc } from './components/tooltip';
import { tableDoc } from './components/table';
import { richTableDoc } from './components/rich-table';
import { typographyDoc } from './components/typography';
import { headerDoc } from './patterns/header';
import type { Doc } from '../types/doc';

// Ordem da sidebar dentro de cada camada.
export const docs: Doc[] = [
  colorDoc,
  spacingDoc,
  layoutDoc,
  gridDoc,
  stackDoc,
  clusterDoc,
  sidebarDoc,
  appShellDoc,
  accordionDoc,
  navigationTreeDoc,
  buttonDoc,
  buttonGroupDoc,
  iconButtonDoc,
  dropdownDoc,
  inputDoc,
  checkboxDoc,
  switchDoc,
  formDoc,
  selectDoc,
  modalDoc,
  tabsDoc,
  badgeDoc,
  cardDoc,
  anchorCardDoc,
  toastDoc,
  tooltipDoc,
  tableDoc,
  richTableDoc,
  typographyDoc,
  headerDoc,
];
