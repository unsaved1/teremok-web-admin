import type { THtmlComponentProps } from "./Section.interfaces";
import { createElement, type HTMLElementType } from "react";

import cn from "clsx";
import styles from "./Section.module.scss";

export function Section<K extends HTMLElementType = "section">({
  type,
  className,
  ...props
}: THtmlComponentProps<K>) {
  return createElement(type || "section", {
    className: cn(styles.root, className),
    ...props,
  });
}

export function SectionTitle<K extends HTMLElementType>({
  type,
  className,
  ...props
}: THtmlComponentProps<K>) {
  return createElement(type || "h2", {
    className: cn(styles.title, className),
    ...props,
  });
}

export function SectionEyebrow<K extends HTMLElementType>({
  type,
  className,
  ...props
}: THtmlComponentProps<K>) {
  return createElement(type || "span", {
    className: cn(styles.eyebrow, className),
    ...props,
  });
}
