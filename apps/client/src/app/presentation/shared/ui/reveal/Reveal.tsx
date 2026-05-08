"use client";

import { useEffect, useRef, useState } from "react";
import styles from "@/app/presentation/ui/root.module.scss";

export interface IRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
}

const delayClassMap: Record<number, string> = {
  0: "",
  1: styles.revealDelay1,
  2: styles.revealDelay2,
  3: styles.revealDelay3,
  4: styles.revealDelay4,
};

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

  const classNames = [
    styles.reveal,
    delayClassMap[delay],
    isVisible ? styles.revealVisible : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classNames}>
      {children}
    </div>
  );
}
