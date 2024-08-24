import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  RefObject,
} from "react";

export type ElementProps<T> = HTMLAttributes<HTMLElement> & { fRef?: RefObject<T> };
export type DivProps = HTMLAttributes<HTMLDivElement> & {
  fRef?: RefObject<HTMLDivElement>;
};
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fRef?: RefObject<HTMLButtonElement>;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  fRef?: RefObject<HTMLInputElement>;
};

export type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  fRef?: RefObject<HTMLTextAreaElement>;
};

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  fRef?: RefObject<HTMLLabelElement>;
};
