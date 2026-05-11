import type { HTMLElementType } from "react";

export type THtmlComponentProps<K extends HTMLElementType> = {
  type?: K;
} & JSX.IntrinsicElements[K];
