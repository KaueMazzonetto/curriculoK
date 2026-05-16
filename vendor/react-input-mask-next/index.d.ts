import * as React from "react";
export type InputMaskProps = React.InputHTMLAttributes<HTMLInputElement> & { mask: string };
declare const InputMask: React.ForwardRefExoticComponent<InputMaskProps & React.RefAttributes<HTMLInputElement>>;
export default InputMask;
