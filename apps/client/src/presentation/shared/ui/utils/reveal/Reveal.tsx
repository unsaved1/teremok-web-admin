import { useRef } from "react";

import cn from "clsx";
import styles from "./Reveal.module.scss";

export interface IRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
}

export function Reveal({ children, className, delay = 0 }: IRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn(styles.root, className, styles[`root--delay${delay}`], {
        [styles["root--visible"]]: true,
      })}
    >
      {children}
    </div>
  );
}
