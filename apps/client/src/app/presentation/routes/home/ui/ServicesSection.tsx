import type { IService } from "@root/src/domain/entity/content/interfaces";

import { Reveal } from "@/app/presentation/shared/ui/reveal";
import { ImageComponent } from "../../../shared/ui/imageComponent";

import styles from "@/app/presentation/ui/root.module.scss";
import { useSharedPresentationCtx } from "@root/src/app/di/context";

type ServicesSectionProps = {
  services: IService[];
};

const delays: Array<0 | 1 | 2 | 3> = [0, 1, 2, 3];

export function ServicesSection({ services }: ServicesSectionProps) {
  const ctx = useSharedPresentationCtx();
  return (
    <section
      className={[styles.section, styles.services].join(" ")}
      id="services"
    >
      <div className={styles.servicesHeader}>
        <Reveal>
          <p className={styles.sectionEyebrow}>Инфраструктура</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className={styles.sectionTitle}>
            Наши <em>услуги</em>
          </h2>
        </Reveal>
      </div>
      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <Reveal
            key={service.id}
            className={styles.serviceItem}
            delay={delays[index % 4]}
          >
            <div className={styles.serviceIcon}>
              {service.images.length > 0 ? (
                <ImageComponent
                  src={ctx.imagePath.createUrl(
                    service.images[0].image.thumbnail_path ||
                      service.images[0].image.original_path,
                  )}
                  alt={service.name}
                  width={56}
                  height={56}
                  className={styles.serviceIconImage}
                />
              ) : (
                service.name.slice(0, 1)
              )}
            </div>
            <div className={styles.serviceName}>{service.name}</div>
            <div className={styles.serviceDesc}>{service.description}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
