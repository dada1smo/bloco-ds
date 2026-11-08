import { cva } from 'class-variance-authority';

// `group-data-disabled` follows the field root (RAC sets data-disabled on it)
export const fieldLabelStyles = cva('text-label-01 text-secondary group-data-disabled:text-disabled');

// Not color alone: the asterisk is the signal, the tint only reinforces it
export const fieldLabelRequiredStyles = cva('ml-1 text-error group-data-disabled:text-disabled');
