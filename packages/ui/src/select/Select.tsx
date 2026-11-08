import { useId, type ReactNode, type SelectHTMLAttributes } from 'react';
import { CaretDownIcon, CheckIcon } from '@phosphor-icons/react';
import {
  selectButtonStyles,
  selectCaretStyles,
  selectCheckStyles,
  selectedContentStyles,
  selectFieldStyles,
  selectLabelStyles,
  selectOptionBodyStyles,
  selectOptionDescStyles,
  selectOptionIconStyles,
  selectOptionStyles,
  selectStyles,
} from './Select.styles';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      selectedcontent: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export type SelectOption = {
  value: string;
  label: string;
  description?: string;
  icon?: ReactNode;
};

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  label?: string;
  options: SelectOption[];
};

export function Select({ label, options, id, className, ...props }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div className={selectFieldStyles({ className })}>
      {label && (
        <label htmlFor={selectId} className={selectLabelStyles()}>
          {label}
        </label>
      )}
      <select {...props} id={selectId} className={selectStyles()}>
        <button type="button" className={selectButtonStyles()}>
          <selectedcontent className={selectedContentStyles()} />
          <CaretDownIcon className={selectCaretStyles()} aria-hidden />
        </button>
        {options.map(({ value, label: optionLabel, description, icon }) => (
          <option key={value} value={value} className={selectOptionStyles()}>
            <CheckIcon className={selectCheckStyles()} weight="bold" aria-hidden />
            {icon && (
              <span className={selectOptionIconStyles()} aria-hidden>
                {icon}
              </span>
            )}
            <span className={selectOptionBodyStyles()}>
              <span>{optionLabel}</span>
              {description && <span className={selectOptionDescStyles()}>{description}</span>}
            </span>
          </option>
        ))}
      </select>
    </div>
  );
}
