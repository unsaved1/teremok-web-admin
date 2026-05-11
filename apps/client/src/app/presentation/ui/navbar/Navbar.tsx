"use client";

import { useEffect, useState } from "react";

import cn from "clsx";
import styles from "./Navbar.module.scss";
import { LinkButton } from "../../shared/ui/button";
import { MobileBar } from "..";

const links = [
  { href: "#about", label: "О нас" },
  { href: "#houses", label: "Домики" },
  { href: "#services", label: "Услуги" },
  { href: "#contact", label: "Контакты" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={cn(styles.root, {
          [styles["root--scrolled"]]: isScrolled,
        })}
      >
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
