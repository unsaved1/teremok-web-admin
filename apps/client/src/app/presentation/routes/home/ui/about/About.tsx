import type { IInfoSection } from "@root/src/domain/entity/content/interfaces";
import { Reveal } from "@/app/presentation/shared/ui/utils/reveal";
import { useSharedPresentationCtx } from "@/app/di/context";

import cn from "clsx";
import rootStyles from "@/app/presentation/ui/root.module.scss";
import styles from "./About.module.scss";

type AboutSectionProps = {
  data: IInfoSection;
};

export function About({ data }: AboutSectionProps) {
  const { imagePath } = useSharedPresentationCtx();
  return (
    <section className={cn(styles.root, rootStyles.section)} id="about">
      <div className={styles.inner}>
        <Reveal className={styles.imageWrapper}>
          <div
            className={styles.image}
            style={
              data.images.length > 0
                ? {
                    backgroundImage: `url(${imagePath.createUrl(data.images[0].image.thumbnail_path || data.images[0].image.original_path)})`,
                  }
                : undefined
            }
          >
            <div className={styles.imageInner}>🌲</div>
          </div>
          <div className={styles.badge}>
            <div className={styles.badgeNum}>20%</div>
            <div className={styles.badgeText}>скидка вс-чт</div>
          </div>
        </Reveal>
        <div className={styles.text}>
          <Reveal>
            <p className={rootStyles.sectionEyebrow}>О нас</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className={rootStyles.sectionTitle}>{data.title}</h2>
          </Reveal>
          <Reveal delay={2}>
            <p className={styles.body}>{data.description}</p>
          </Reveal>
          <Reveal delay={3}>
            <div className={styles.features}>
              {data.services.map((feature) => (
                <div key={feature.id} className={styles.feature}>
                  <div className={styles.featureIcon}>•</div>
                  {feature.name}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={4}>
            <a href="#contact" className={rootStyles.btnPrimary}>
              Оставить заявку
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
