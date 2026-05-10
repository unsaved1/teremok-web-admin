import { LinkButton } from "@/app/presentation/shared/ui/button";
import styles from "./Hero.module.scss";
import type { IContact } from "@/domain/entity/content/interfaces";

export const Hero = ({ contactData }: { contactData: IContact }) => {
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
          <LinkButton variant="primary" to="#cabins">
            Смотреть домики
          </LinkButton>
          <LinkButton to={`tel:${contactData.phone}`}>
            {contactData.phone}
          </LinkButton>
        </div>
      </div>
      <div className={styles.scroll}>
        <div className={styles.scrollLine} />
        <span>Листать</span>
      </div>
    </section>
  );
};
