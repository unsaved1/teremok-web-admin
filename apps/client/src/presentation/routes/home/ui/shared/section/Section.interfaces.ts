import type { JSX } from "react";

type THtmlElementKey = keyof JSX.IntrinsicElements;

export type THtmlComponentProps<K extends THtmlElementKey> = {
  type?: K;
} & JSX.IntrinsicElements[K];
