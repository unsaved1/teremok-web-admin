import type { IContact } from "@root/src/domain/entity/content/interfaces";
import styles from "@/app/presentation/ui/root.module.scss";

type FooterProps = {
  contacts: IContact;
};

export function Footer({ contacts }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div>
          <div className={styles.footerLogo}>
            Теремок<span>.</span>
          </div>
          <div className={styles.footerBrandType}>БАЗА ОТДЫХА</div>
          <p className={styles.footerTagline}>
            Отдых на природе в Оренбурге. У нас есть всё для комфортного отдыха.
          </p>
          <div className={styles.footerSocials}>
            <a href="#" className={styles.socialButton}>
              📷
            </a>
            <a href="#" className={styles.socialButton}>
              VK
            </a>
          </div>
        </div>
        <div>
          <div className={styles.footerColTitle}>Навигация</div>
          <ul className={styles.footerLinks}>
            <li>
              <a href="#hero">Главная</a>
            </li>
            <li>
              <a href="#about">О нас</a>
            </li>
            <li>
              <a href="#cabins">Домики</a>
            </li>
            <li>
              <a href="#services">Услуги</a>
            </li>
            <li>
              <a href="#contact">Контакты</a>
            </li>
          </ul>
        </div>
        <div>
          <div className={styles.footerColTitle}>Домики</div>
          <ul className={styles.footerLinks}>
            <li>
              <a href="#cabins">Летний</a>
            </li>
            <li>
              <a href="#cabins">Полулюкс</a>
            </li>
            <li>
              <a href="#cabins">Люкс</a>
            </li>
            <li>
              <a href="#cabins">Люкс 2</a>
            </li>
            <li>
              <a href="#cabins">Гостевой</a>
            </li>
          </ul>
        </div>
        <div>
          <div className={styles.footerColTitle}>Контакты</div>
          <div className={styles.footerContactItem}>
            <span className={styles.footerContactIcon}>📞</span>
            {contacts.phone}
          </div>
          <div className={styles.footerContactItem}>
            <span className={styles.footerContactIcon}>📍</span>
            {contacts.address}
          </div>
          <div className={styles.footerContactItem}>
            <span className={styles.footerContactIcon}>💬</span>
            {contacts.messenger}
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.footerCopy}>
          © 2025 База отдыха «Теремок». Все права защищены.
        </div>
        <div className={styles.footerCopy}>Оренбург</div>
      </div>
    </footer>
  );
}
