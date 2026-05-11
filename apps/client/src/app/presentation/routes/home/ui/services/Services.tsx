import type { IService } from "@root/src/domain/entity/content/interfaces";

import { useSharedPresentationCtx } from "@root/src/app/di/context";

import { Reveal } from "@/app/presentation/shared/ui/utils/reveal";
import { ImageComponent } from "@/app/presentation/shared/ui/imageComponent";
import { Section, SectionTitle } from "../shared";

import styles from "./Services.module.scss";

type ServicesSectionProps = {
  services: IService[];
};

const delays: Array<0 | 1 | 2 | 3> = [0, 1, 2, 3];

export const Services = ({ services }: ServicesSectionProps) => {
  const ctx = useSharedPresentationCtx();
  const servicesWithImage = [];
  const servicesWithoutImage = [];
  for (const s of services) {
    if (s.images.length > 0) {
      servicesWithImage.push(s);
    } else {
      servicesWithoutImage.push(s);
    }
  }
  return (
    <Section className={styles.root} id="services">
      <div className={styles.header}>
        <Reveal delay={1}>
          <SectionTitle>
            Наши <em>услуги</em>
          </SectionTitle>
        </Reveal>
      </div>
      <div className={styles.grid}>
        {servicesWithImage.map((s, i) => (
          <Reveal key={s.id} className={styles.item} delay={delays[i % 4]}>
            <div className={styles.iconWrapper}>
              {s.images.length > 0 ? (
                <ImageComponent
                  src={ctx.imagePath.createUrl(
                    s.images[0].image.thumbnail_path ||
                      s.images[0].image.original_path,
                  )}
                  alt={s.name}
                  width={56}
                  height={56}
                  rootClassName={styles.icon}
                  className={styles.iconImg}
                />
              ) : (
                s.name.slice(0, 1)
              )}
            </div>
            <div className={styles.textWrapper}>
              <div className={styles.name}>{s.name}</div>
              <div className={styles.desc}>{s.description}</div>
            </div>
          </Reveal>
        ))}
        {servicesWithoutImage.map((s, i) => (
          <Reveal key={s.id} className={styles.item} delay={delays[i % 4]}>
            <div className={styles.textWrapper}>
              <div className={styles.name}>{s.name}</div>
              <div className={styles.desc}>{s.description}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
