import type { IInfoSection } from "@root/src/domain/entity/content/interfaces";
import { Reveal } from "@/app/presentation/shared/ui/reveal";
import styles from "@/app/presentation/ui/root.module.scss";
import { useSharedPresentationCtx } from "@/app/di/context";

type AboutSectionProps = {
  data: IInfoSection;
};

export function AboutSection({ data }: AboutSectionProps) {
  const { imagePath } = useSharedPresentationCtx();
  return (
    <section className={[styles.section, styles.about].join(" ")} id="about">
      <div className={styles.aboutInner}>
        <Reveal className={styles.aboutImageWrap}>
          <div
            className={styles.aboutImage}
            style={
              data.images.length > 0
                ? {
                    backgroundImage: `url(${imagePath.createUrl(data.images[0].image.thumbnail_path || data.images[0].image.original_path)})`,
                  }
                : undefined
            }
          >
            <div className={styles.aboutImageInner}>🌲</div>
          </div>
          <div className={styles.aboutBadge}>
            <div className={styles.aboutBadgeNum}>20%</div>
            <div className={styles.aboutBadgeText}>скидка вс-чт</div>
          </div>
        </Reveal>
        <div className={styles.aboutText}>
          <Reveal>
            <p className={styles.sectionEyebrow}>О нас</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className={styles.sectionTitle}>{data.title}</h2>
          </Reveal>
          <Reveal delay={2}>
            <p className={styles.aboutBody}>{data.description}</p>
          </Reveal>
          <Reveal delay={3}>
            <div className={styles.aboutFeatures}>
              {data.services.map((feature) => (
                <div key={feature.id} className={styles.aboutFeature}>
                  <div className={styles.aboutFeatureIcon}>•</div>
                  {feature.name}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={4}>
            <a href="#contact" className={styles.btnPrimary}>
              Оставить заявку
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
