import { useId, type ReactElement, type ReactNode } from 'react';
import { XIcon } from '@phosphor-icons/react';
import {
  Dialog,
  DialogTrigger,
  Heading,
  Modal as RACModal,
  ModalOverlay,
  Text,
  type ModalOverlayProps,
} from 'react-aria-components';
import { ButtonGroup, type ButtonGroupItem } from '../button-group/ButtonGroup';
import { IconButton } from '../icon-button/IconButton';
import {
  modalBodyStyles,
  modalDialogStyles,
  modalHeaderStyles,
  modalOverlayStyles,
  modalStyles,
  modalTitleStyles,
  type ModalStyleProps,
} from './Modal.styles';

export type ModalProps = Omit<ModalOverlayProps, 'children' | 'className'> & {
  /** A pressable element (e.g. `BLButton`) that opens the modal. Omit to control with `isOpen`. */
  trigger?: ReactElement;
  title: string;
  description: ReactNode;
  /** Buttons with `slot="close"` close the modal. */
  actions?: ButtonGroupItem[];
  className?: string;
} & ModalStyleProps;

/** RAC `ModalOverlay` + `Modal` + `Dialog`. Dismissable by Escape and outside click by default. */
export function Modal({
  trigger,
  title,
  description,
  actions,
  size,
  className,
  isDismissable = true,
  ...props
}: ModalProps) {
  // RAC's Dialog doesn't link `slot="description"`, so wire aria-describedby by hand.
  const descriptionId = useId();
  const modal = (
    <ModalOverlay {...props} isDismissable={isDismissable} className={modalOverlayStyles()}>
      <RACModal className={modalStyles({ size, className })}>
        <Dialog aria-describedby={descriptionId} className={modalDialogStyles({ withFooter: !!actions?.length })}>
          <div className={modalHeaderStyles()}>
            <Heading slot="title" className={modalTitleStyles()}>
              {title}
            </Heading>
            <IconButton slot="close" level="subtle" size="sm" aria-label="Close">
              <XIcon aria-hidden />
            </IconButton>
          </div>
          <Text elementType="p" id={descriptionId} className={modalBodyStyles()}>
            {description}
          </Text>
          {actions?.length ? <ButtonGroup position="bottom" items={actions} /> : null}
        </Dialog>
      </RACModal>
    </ModalOverlay>
  );

  return trigger ? (
    <DialogTrigger>
      {trigger}
      {modal}
    </DialogTrigger>
  ) : (
    modal
  );
}
