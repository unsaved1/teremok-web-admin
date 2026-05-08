import type { IHouse } from "@root/src/domain/entity/house/interfaces";

import { useSharedPresentationCtx } from "@root/src/app/di/context";

import { ImageComponent } from "@/app/presentation/shared/ui/imageComponent";
import { Reveal, type IRevealProps } from "@/app/presentation/shared/ui/reveal";

import styles from "@/app/presentation/ui/root.module.scss";

type CabinsSectionProps = {
  data: IHouse[];
};

export function CabinsSection({ data }: CabinsSectionProps) {
  const { imagePath } = useSharedPresentationCtx();
  
  return (
    <section className={styles.cabins} id="cabins">
      <div className={styles.cabinsHeader}>
        <div>
          <p className={styles.sectionEyebrow}>Размещение</p>
          <h2 className={styles.sectionTitle}>
            Наши <em>домики</em>
          </h2>
        </div>
        <a href="#contact" className={styles.btnOutline}>
          Все варианты
        </a>
      </div>
      <div className={styles.cabinsGrid}>
        {data.map((h, i) => {
          const cardClasses = [
            styles.cabinCard,
            i === 0 ? styles.cabinCardFeatured : "",
          ]
            .filter(Boolean)
            .join(" ");
          const imageClasses = [
            styles.cabinImage,
            i === 0 ? styles.cabinImageWide : "",
          ]
            .filter(Boolean)
            .join(" ");
            
            console.log(i)

          return (
            <Reveal
              key={h.id}
              className={cardClasses}
              delay={i as IRevealProps["delay"]}
            >
              <div className={imageClasses}>
                {h.images.length > 0 && (
                  <ImageComponent
                    src={imagePath.createUrl(
                      h.images[0].image.thumbnail_path ||
                        h.images[0].image.original_path,
                    )}
                    alt={h.name}
                    className={styles.cabinImagePhoto}
                  />
                )}
              </div>
              <div className={styles.cabinBody}>
                <div className={styles.cabinName}>{h.name}</div>
                <div className={styles.cabinDesc}>{h.description}</div>
                <div className={styles.cabinSpecs}>
                  {h.params.map((param) => (
                    <div key={param.key} className={styles.cabinSpec}>
                      {/* <span className={styles.cabinSpecIcon}>{spec.icon}</span> */}
                      {param.value}
                    </div>
                  ))}
                </div>
                <div className={styles.cabinFooter}>
                  <div className={styles.cabinPrice}>
                    {h.price}
                    <span> / сутки</span>
                  </div>
                  <a href="#contact" className={styles.cabinButton}>
                    Забронировать
                  </a>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
