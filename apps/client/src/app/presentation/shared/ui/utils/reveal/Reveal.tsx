import { useEffect, useRef, useState } from "react";

import cn from "clsx";
import styles from "./Reveal.module.scss";

export interface IRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
}

export function Reveal({ children, className, delay = 0 }: IRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(styles.root, className, styles[`root--delay${delay}`], {
        [styles["root--visible"]]: isVisible,
      })}
    >
      {children}
    </div>
  );
}
