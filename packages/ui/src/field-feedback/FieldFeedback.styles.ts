import { cva } from 'class-variance-authority';

export const fieldFeedbackStyles = cva('flex items-start gap-3 text-helper-text-01', {
  variants: {
    status: { error: 'text-error', success: 'text-helper' },
  },
});

// Icon + text, never color alone; success text stays neutral because `support-success` has 3.2:1 on light
export const fieldFeedbackIconStyles = cva('size-5 flex-none', {
  variants: {
    status: { error: 'text-support-error', success: 'text-support-success' },
  },
});
