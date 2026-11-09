import context from '../../../../../../../packages/ui/src/components/button/Button.context.md?raw';
import { ButtonDefault } from '../../examples/components/button/default';
import defaultCode from '../../examples/components/button/default?raw';
import { ButtonLevels } from '../../examples/components/button/levels';
import levelsCode from '../../examples/components/button/levels?raw';
import { ButtonSizes } from '../../examples/components/button/sizes';
import sizesCode from '../../examples/components/button/sizes?raw';
import type { Doc } from '../../types/doc';

export const buttonDoc: Doc = {
  slug: 'button',
  title: 'Button',
  layer: 'components',
  context,
  props: [
    { name: 'level', type: "'solid' | 'outline' | 'subtle'", default: "'solid'", description: 'Hierarquia da ação.' },
    { name: 'color', type: "'primary' | 'accent'", default: "'primary'", description: 'Destaque da ação; accent para a mais importante da tela.' },
    { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Altura do controle.' },
    { name: 'as', type: "'button' | 'a'", default: "'button'", description: 'Elemento renderizado; a aceita as props do RAC Link.' },
    { name: 'onPress', type: '(e: PressEvent) => void', description: 'Ação disparada por mouse, toque ou teclado.' },
    { name: 'isDisabled', type: 'boolean', description: 'Ação indisponível no momento.' },
    { name: '...RAC Button', type: 'ButtonProps', description: 'Demais props do Button (ou Link) do RAC.' },
  ],
  examples: [
    { title: 'Default', render: () => <ButtonDefault />, code: defaultCode },
    { title: 'Levels', description: 'One row per color: primary and accent.', render: () => <ButtonLevels />, code: levelsCode },
    { title: 'Sizes', render: () => <ButtonSizes />, code: sizesCode },
  ],
};
