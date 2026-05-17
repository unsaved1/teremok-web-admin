"use client";

import { useEffect, useRef, useState } from "react";

import { LinkButton } from "@/presentation/shared/ui/base";
import { MobileBar } from "../mobileBar";

import cn from "clsx";
import styles from "./Navbar.module.scss";
import { Delay } from "@repo/shared/lib";

const links = [
  { href: "#about", label: "О нас" },
  { href: "#houses", label: "Домики" },
  { href: "#services", label: "Услуги" },
  { href: "#contact", label: "Контакты" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }
    console.log("init nav");
    const handleScroll = Delay.throttle(null, () => {
      const refEl = rootRef.current!!;
      if (window.scrollY > 60) {
        if (!refEl.classList.contains(styles["root--scrolled"])) {
          refEl.classList.add(styles["root--scrolled"]);
        }
      } else {
        if (refEl.classList.contains(styles["root--scrolled"])) {
          refEl.classList.remove(styles["root--scrolled"]);
        }
      }
    });

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav ref={rootRef} className={styles.root}>
        <a href="#" className={styles.logo}>
          Теремок<span>.</span>
        </a>
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <LinkButton to={"tel:+79878661625"} className={styles.cta}>
          Забронировать
        </LinkButton>
        <button
          type="button"
          className={cn(styles.hamburger, {
            [styles["hamburger--open"]]: isMenuOpen,
          })}
          aria-label="Меню"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <MobileBar isOpen={isMenuOpen} />
    </>
  );
}
