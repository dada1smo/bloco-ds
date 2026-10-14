import type { ButtonHTMLAttributes } from "react";
import { buttonStyles, type ButtonStyleProps } from "./Button.styles";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleProps;

export function Button({ level, color, size, className, ...props }: ButtonProps) {
  return <button {...props} className={buttonStyles({ level, color, size, className })} />;
}
