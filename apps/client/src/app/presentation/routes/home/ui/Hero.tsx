import { Link } from "react-router";
import styles from "@/app/presentation/ui/root.module.scss";

export function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroBg} />
      <div className={styles.heroTrees} />
      <div className={styles.heroContent}>
        <span className={styles.heroEyebrow}>
          Оренбургская область · На берегу реки
        </span>
        <h1 className={styles.heroTitle}>
          Настоящий отдых
          <br />
          на <em>природе</em>
        </h1>
        <p className={styles.heroSub}>
          Домики, баня, рыбалка и свежий воздух в лесу.
          <br />
          Всё что нужно — в одном месте.
        </p>
        <div className={styles.heroActions}>
          <Link to="#cabins" className={styles.btnPrimary}>
            Смотреть домики
          </Link>
          <Link to="tel:+79878661625" className={styles.btnOutline}>
            +7 (987) 866-16-25
          </Link>
        </div>
      </div>
      <div className={styles.heroScroll}>
        <div className={styles.scrollLine} />
        <span>Листать</span>
      </div>
    </section>
  );
}
