import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

export type PrimitiveButtonProps =
  | ({ as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>);

/** Unstyled: renders a `<button>` or an `<a>` depending on `as`. */
export function PrimitiveButton(props: PrimitiveButtonProps) {
  if (props.as === 'a') {
    const { as: _as, ...rest } = props;
    return <a {...rest} />;
  }
  const { as: _as, type = 'button', ...rest } = props;
  return <button type={type} {...rest} />;
}
