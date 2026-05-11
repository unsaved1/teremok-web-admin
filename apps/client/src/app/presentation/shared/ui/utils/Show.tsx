import type { ReactNode } from "react";
import type { Nullable, Undefinable } from "@repo/shared/types";

type NotFalsy<T> = T extends false ? never : T;

export function Show<T>({
  when,
  children,
  fallback = null,
}: {
  when: Undefinable<Nullable<T>>;
  fallback?: ReactNode;
  children: ((value: NotFalsy<T>) => any) | ReactNode;
}) {
  if (!when) {
    return fallback;
  }

  if (typeof children === "function") {
    return children(when as NotFalsy<T>);
  }
  return children;
}
