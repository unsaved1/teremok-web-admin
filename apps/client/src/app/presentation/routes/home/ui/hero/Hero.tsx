import { Link } from "react-router";

import rootStyles from "@/app/presentation/ui/root.module.scss";
import styles from "./Hero.module.scss";

export const Hero = () => {
  return (
    <section className={styles.root} id="hero">
      <div className={styles.bg} />
      <div className={styles.trees} />
      <div className={styles.content}>
        <span className={styles.eyebrow}>
          Оренбургская область · На берегу реки
        </span>
        <h1 className={styles.title}>
          Настоящий отдых
          <br />
          на <em>природе</em>
        </h1>
        <p className={styles.sub}>
          Домики, баня, рыбалка и свежий воздух в лесу.
          <br />
          Всё что нужно — в одном месте.
        </p>
        <div className={styles.actions}>
          <Link to="#cabins" className={rootStyles.btnPrimary}>
            Смотреть домики
          </Link>
          <Link to="tel:+79878661625" className={rootStyles.btnOutline}>
            +7 (987) 866-16-25
          </Link>
        </div>
      </div>
      <div className={styles.scroll}>
        <div className={styles.scrollLine} />
        <span>Листать</span>
      </div>
    </section>
  );
};
