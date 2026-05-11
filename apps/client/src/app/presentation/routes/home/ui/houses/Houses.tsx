import type { IHousesSectionProps } from "./Houses.interfaces";
import { useSharedPresentationCtx } from "@root/src/app/di/context";

import { ImageComponent } from "@/app/presentation/shared/ui/imageComponent";
import {
  Reveal,
  type IRevealProps,
} from "@/app/presentation/shared/ui/utils/reveal";

import cn from "clsx";
import styles from "./Houses.module.scss";
import { LinkButton } from "@/app/presentation/shared/ui/button";
import { Show } from "@/app/presentation/shared/ui/utils";

export function Houses({ data }: IHousesSectionProps) {
  const { imagePath } = useSharedPresentationCtx();

  return (
    <section className={styles.root} id="cabins">
      <div className={styles.header}>
        <div>
          <p className={styles.header__eyebrow}>Размещение</p>
          <h2 className={styles.header__title}>
            Наши <em>домики</em>
          </h2>
        </div>
        <LinkButton className={styles.header__btn} to={"#contact"}>Все варианты</LinkButton>
      </div>
      <Conditions />
      <div className={styles.grid}>
        {data.map((h, i) => {
          return (
            <Reveal
              key={h.id}
              className={cn(styles.card, {
                [styles["card--featured"]]: i === 0,
              })}
              delay={i as IRevealProps["delay"]}
            >
              <div
                className={cn(styles.cardImage, {
                  [styles["cardImage--wide"]]: i === 0,
                })}
              >
                <Show when={h.images.length > 0 && h.images[0]}>
                  {({ image }) => (
                    <ImageComponent
                      className={styles.cardImage__photo}
                      src={imagePath.createUrl(image.original_path)}
                      alt={h.name}
                    />
                  )}
                </Show>
              </div>
              <div className={styles.body}>
                <div className={styles.name}>{h.name}</div>
                <div className={styles.desc}>{h.description}</div>
                <div className={styles.specs}>
                  {h.params.map((param) => (
                    <div key={param.key} className={styles.spec}>
                      {/* <span className={styles.cabinSpecIcon}>{spec.icon}</span> */}
                      {param.value}
                    </div>
                  ))}
                </div>
                <div className={styles.footer}>
                  <div className={styles.price}>
                    {h.price}
                    <span> / сутки</span>
                  </div>
                  <a href="#contact" className={styles.btn}>
                    Забронировать
                  </a>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <AdditionalConditions />
    </section>
  );
}

const Conditions = () => {
  return (
    <ul className={styles.conditions}>
      <li className={styles.condition}>
        <span className={styles.condition__title}>14:00</span>

        <span className={styles.condition__subtitle}>Заезд</span>
      </li>
      <li className={styles.condition}>
        <span className={styles.condition__title}>12:00</span>
        <span className={styles.condition__subtitle}>Выезд</span>
      </li>
      <li className={cn(styles.condition, styles["condition--discount"])}>
        <span className={styles.condition__title}>-20%</span>
        <span className={styles.condition__subtitle}>Пн-Пт</span>
      </li>
    </ul>
  );
};

const AdditionalConditions = () => {
  return (
    <ul className={styles.additionalConditions}>
      <li className={styles.additionalCondition}>
        <span>💧</span>
        <span> Привозите питьевую воду — на турбазе техническая </span>
      </li>
    </ul>
  );
};
