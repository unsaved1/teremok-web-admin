"use client";

import { useEffect, useState } from "react";
import styles from "../root.module.scss";

const links = [
  { href: "#about", label: "О нас" },
  { href: "#cabins", label: "Домики" },
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

  const navClassName = [styles.nav, isScrolled ? styles.navScrolled : ""]
    .filter(Boolean)
    .join(" ");
  const burgerClassName = [
    styles.navHamburger,
    isMenuOpen ? styles.navHamburgerOpen : "",
  ]
    .filter(Boolean)
    .join(" ");
  const mobileMenuClassName = [
    styles.mobileMenu,
    isMenuOpen ? styles.mobileMenuOpen : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <nav className={navClassName}>
        <a href="#" className={styles.navLogo}>
          Теремок<span>.</span>
        </a>
        <ul className={styles.navLinks}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a href="tel:+79878661625" className={styles.navCta}>
          Забронировать
        </a>
        <button
          type="button"
          className={burgerClassName}
          aria-label="Меню"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={mobileMenuClassName}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="tel:+79878661625"
          className={styles.mobileCta}
          onClick={() => setIsMenuOpen(false)}
        >
          Забронировать
        </a>
      </div>
    </>
  );
}
