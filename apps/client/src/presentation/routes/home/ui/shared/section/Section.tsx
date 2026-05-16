import type { THtmlComponentProps } from "./Section.interfaces";
import { createElement } from "react";

import cn from "clsx";
import styles from "./Section.module.scss";

export function Section({
  type,
  className,
  ...props
}: THtmlComponentProps<"section">) {
  return createElement(type || "section", {
    className: cn(styles.root, className),
    ...props,
  });
}

export function SectionTitle({
  type,
  className,
  ...props
}: THtmlComponentProps<"h2">) {
  return createElement(type || "h2", {
    className: cn(styles.title, className),
    ...props,
  });
}

export function SectionEyebrow({
  type,
  className,
  ...props
}: THtmlComponentProps<"span">) {
  return createElement(type || "span", {
    className: cn(styles.eyebrow, className),
    ...props,
  });
}
