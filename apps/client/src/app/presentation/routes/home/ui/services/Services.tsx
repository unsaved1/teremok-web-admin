import type { IService } from "@root/src/domain/entity/content/interfaces";

import { useSharedPresentationCtx } from "@root/src/app/di/context";

import { Reveal } from "@/app/presentation/shared/ui/utils/reveal";
import { ImageComponent } from "@/app/presentation/shared/ui/imageComponent";

import cn from "clsx";
import rootStyles from "@/app/presentation/ui/root.module.scss";
import styles from "./Services.module.scss";

type ServicesSectionProps = {
  services: IService[];
};

const delays: Array<0 | 1 | 2 | 3> = [0, 1, 2, 3];

export const Services = ({ services }: ServicesSectionProps) => {
  const ctx = useSharedPresentationCtx();
  return (
    <section className={cn(styles.root, rootStyles.section)} id="services">
      <div className={styles.header}>
        <Reveal delay={1}>
          <h2 className={rootStyles.sectionTitle}>
            Наши <em>услуги</em>
          </h2>
        </Reveal>
      </div>
      <div className={styles.grid}>
        {services.map((service, index) => (
          <Reveal
            key={service.id}
            className={styles.item}
            delay={delays[index % 4]}
          >
            <div className={styles.iconWrapper}>
              {service.images.length > 0 ? (
                <ImageComponent
                  src={ctx.imagePath.createUrl(
                    service.images[0].image.thumbnail_path ||
                      service.images[0].image.original_path,
                  )}
                  alt={service.name}
                  width={56}
                  height={56}
                  className={styles.icon}
                />
              ) : (
                service.name.slice(0, 1)
              )}
            </div>
            <div className={styles.name}>{service.name}</div>
            <div className={styles.desc}>{service.description}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
