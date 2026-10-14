import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  type DialogHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { XIcon } from '@phosphor-icons/react';
import { Button, type ButtonProps } from '../button/Button';
import {
  modalBodyStyles,
  modalCloseStyles,
  modalFooterStyles,
  modalStyles,
  modalTitleStyles,
} from './Modal.styles';

export type ModalProps = Omit<
  DialogHTMLAttributes<HTMLDialogElement>,
  'title' | 'children'
> & {
  trigger?: ReactElement<Extract<ButtonProps, { as?: 'button' }>>;
  title: string;
  description: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  actions?: ReactNode;
};

export function Modal({
  trigger,
  title,
  description,
  actions,
  open,
  onOpenChange,
  onClose,
  className,
  ...props
}: ModalProps) {
  const id = useId();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (open === undefined || !dialog || dialog.open === open) return;
    if (open) dialog.showModal();
    else dialog.close();
  }, [open]);

  if (
    trigger !== undefined &&
    (!isValidElement(trigger) || trigger.type !== Button)
  ) {
    throw new Error('Modal: `trigger` must be a single <BLButton> element.');
  }

  return (
    <>
      {trigger &&
        cloneElement(trigger, {
          type: 'button',
          ...(open === undefined
            ? { commandFor: id, command: 'show-modal' }
            : { onClick: () => onOpenChange?.(true) }),
        } as object)}
      <dialog
        closedby="any"
        {...props}
        ref={ref}
        id={id}
        onClose={(event) => {
          onClose?.(event);
          onOpenChange?.(false);
        }}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-body`}
        className={modalStyles({ className })}
      >
        <form method="dialog">
          <button
            type="submit"
            aria-label="Close"
            className={modalCloseStyles()}
          >
            <XIcon aria-hidden />
          </button>
          <h3 id={`${id}-title`} className={modalTitleStyles()}>
            {title}
          </h3>
          <p id={`${id}-body`} className={modalBodyStyles()}>
            {description}
          </p>
          {actions && (
            <footer className={modalFooterStyles()}>{actions}</footer>
          )}
        </form>
      </dialog>
    </>
  );
}
