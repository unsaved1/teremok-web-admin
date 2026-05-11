import type { IContact } from "@root/src/domain/entity/content/interfaces";
import { Link } from "react-router";

import styles from "./Footer.module.scss";

type FooterProps = {
  contacts: IContact;
};

export function Footer({ contacts }: FooterProps) {
  return (
    <footer className={styles.root}>
      <div className={styles.grid}>
        <div>
          <div className={styles.logo}>
            Теремок<span>.</span>
          </div>
          <div className={styles.brandType}>БАЗА ОТДЫХА</div>
          <p className={styles.tagline}>
            Отдых на природе в Оренбурге. У нас есть всё для комфортного отдыха.
          </p>
          {/* <div className={styles.socials}>
            <a href="#" className={styles.socialBtn}>
              📷
            </a>
            <a href="#" className={styles.socialBtn}>
              VK
            </a>
          </div> */}
        </div>
        <div>
          <div className={styles.colTitle}>Навигация</div>
          <ul className={styles.links}>
            <li>
              <Link to="#hero">Главная</Link>
            </li>
            <li>
              <Link to="#about">О нас</Link>
            </li>
            <li>
              <Link to="#houses">Домики</Link>
            </li>
            <li>
              <Link to="#services">Услуги</Link>
            </li>
            <li>
              <Link to="#contact">Контакты</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className={styles.colTitle}>Контакты</div>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📞</span>
            {contacts.phone}
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactIcon}>📍</span>
            {contacts.address}
          </div>
          {/* <div className={styles.contactItem}>
            <span className={styles.contactIcon}>💬</span>
            {contacts.messenger}
          </div> */}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.copy}>
          © 2026 База отдыха «Теремок». Все права защищены.
        </div>
        <div className={styles.copy}>Оренбург</div>
      </div>
    </footer>
  );
}
