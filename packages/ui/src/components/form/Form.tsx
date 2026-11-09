import { Form as AriaForm, type FormProps as AriaFormProps } from 'react-aria-components';
import { formStyles, type FormStyleProps } from './Form.styles';

export type FormProps = Omit<AriaFormProps, 'className'> & FormStyleProps & { className?: string };

/** Formulário RAC: valida e envia os campos filhos; empilha-os com `gap` (padrão `6`). */
export function Form({ gap, className, ...props }: FormProps) {
  return <AriaForm {...props} className={formStyles({ gap, className })} />;
}
