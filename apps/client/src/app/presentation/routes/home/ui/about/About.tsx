import type { IInfoSection } from "@root/src/domain/entity/content/interfaces";

import { useSharedPresentationCtx } from "@/app/di/context";

import { Reveal } from "@/app/presentation/shared/ui/utils/reveal";
import { LinkButton } from "@/app/presentation/shared/ui/button";
import { Section, SectionEyebrow, SectionTitle } from "../shared";

import styles from "./About.module.scss";

type AboutSectionProps = {
  data: IInfoSection;
};

export function About({ data }: AboutSectionProps) {
  const { imagePath } = useSharedPresentationCtx();
  return (
    <Section className={styles.root} id="about">
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
            <div className={styles.badgeText}>скидка пн-пт</div>
          </div>
        </Reveal>
        <div className={styles.text}>
          <Reveal>
            <SectionEyebrow>О нас</SectionEyebrow>
          </Reveal>
          <Reveal delay={1}>
            <SectionTitle>{data.title}</SectionTitle>
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
            <LinkButton to={"#contact"}>Оставить заявку</LinkButton>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
