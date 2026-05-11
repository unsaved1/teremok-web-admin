import { type ReactNode, useEffect, useRef, useState } from "react";
import type { Nullable } from "@repo/shared/types";

export function ShowFor({
  children,
  duration,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  duration?: number;
}) {
  const destroyTimeoutFnRef = useRef<Nullable<NodeJS.Timeout>>(null);
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    if (destroyTimeoutFnRef.current) {
      clearTimeout(destroyTimeoutFnRef.current);
    }
    destroyTimeoutFnRef.current = setTimeout(() => {
      setIsShow(false);
    }, duration);
    return () => {
      if (destroyTimeoutFnRef.current) {
        clearTimeout(destroyTimeoutFnRef.current);
      }
    };
  }, [duration]);

  if (!isShow) {
    return fallback ?? null;
  }

  return children;
}
