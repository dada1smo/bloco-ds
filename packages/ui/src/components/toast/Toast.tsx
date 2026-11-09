import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  WarningOctagonIcon,
  XIcon,
} from '@phosphor-icons/react';
import {
  Text,
  UNSTABLE_Toast as RACToast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
  composeRenderProps,
} from 'react-aria-components';
import { IconButton } from '../icon-button/IconButton';
import {
  toastContentStyles,
  toastDescriptionStyles,
  toastIconStyles,
  toastRegionStyles,
  toastStyles,
  toastTitleStyles,
  type ToastStyleProps,
} from './Toast.styles';

export type ToastData = {
  title: string;
  description?: string;
} & Pick<ToastStyleProps, 'kind'>;

/** Global queue. Call `toastQueue.add({ title, kind }, { timeout })` from anywhere; `timeout` in ms, omit to persist. */
export const toastQueue = new ToastQueue<ToastData>({ maxVisibleToasts: 5 });

const icons = {
  info: InfoIcon,
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: WarningOctagonIcon,
};

export type ToastProps = { className?: string };

/** RAC `ToastRegion` bound to `toastQueue`. Render once near the app root. */
export function Toast({ className }: ToastProps) {
  return (
    <ToastRegion queue={toastQueue} className={toastRegionStyles({ className })}>
      {({ toast }) => {
        const { title, description, kind = 'info' } = toast.content;
        const Icon = icons[kind ?? 'info'];
        return (
          <RACToast
            toast={toast}
            className={composeRenderProps('', (cn) => toastStyles({ kind, className: cn }))}
          >
            <Icon aria-hidden weight="fill" className={toastIconStyles({ kind })} />
            <ToastContent className={toastContentStyles()}>
              <Text slot="title" className={toastTitleStyles()}>
                {title}
              </Text>
              {description ? (
                <Text slot="description" className={toastDescriptionStyles()}>
                  {description}
                </Text>
              ) : null}
            </ToastContent>
            <IconButton slot="close" level="subtle" size="sm" aria-label="Close">
              <XIcon aria-hidden />
            </IconButton>
          </RACToast>
        );
      }}
    </ToastRegion>
  );
}
