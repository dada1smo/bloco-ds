import { cva } from 'class-variance-authority';

// `group-data-disabled` follows the field root (RAC sets data-disabled on it)
export const fieldLabelStyles = cva('text-label-01 text-secondary group-data-disabled:text-disabled');
