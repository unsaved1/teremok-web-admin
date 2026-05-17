import type { IHousesSectionProps } from "./Houses.interfaces";
import type { IHouse } from "@/domain/entity/house/interfaces";
import type { Nullable } from "@repo/shared/types";

import { useState } from "react";
import { useSharedPresentationCtx } from "@/app/di/context";

import {
  CardSlider,
  FullscreenSlider,
  FullscreenSliderCaptionDesc,
  FullscreenSliderCaptionTitle,
  FullscrenSliderCaptionRoot,
} from "@/presentation/shared/ui/slider";
import {
  Show,
  Reveal,
  type IRevealProps,
} from "@/presentation/shared/ui/utils";
import { SquareButton } from "@/presentation/shared/ui/base";

import BedIcon from "@/presentation/assets/icons/bed.svg?react";
import ZoomOutMapIcon from "@/presentation/assets/icons/zoomOutMap.svg?react";

import cn from "clsx";
import styles from "./Houses.module.scss";

export function Houses({ data }: IHousesSectionProps) {
  const { fmt } = useSharedPresentationCtx();
  const [isOpenedFsSlider, setIsOpenedFsSlider] =
    useState<Nullable<IHouse["id"]>>();

  return (
    <section className={styles.root} id="houses">
      <div className={styles.header}>
        <div>
          <p className={styles.header__eyebrow}>Размещение</p>
          <h2 className={styles.header__title}>
            Наши <em>домики</em>
          </h2>
        </div>
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
                className={cn(styles.cardSlider, {
                  [styles["cardSlider--wide"]]: i === 0,
                })}
              >
                <Show when={h.images.length > 0}>
                  <CardSlider
                    slideClassName={styles.cardSlider__slide}
                    slides={h.images.map(({ image }) => image)}
                  />
                  <SquareButton
                    className={styles.cardSlider__openBtn}
                    onClick={() => setIsOpenedFsSlider(h.id)}
                  >
                    <ZoomOutMapIcon />
                  </SquareButton>
                </Show>
              </div>
              <div className={styles.body}>
                <div className={styles.name}>{h.name}</div>
                <div className={styles.desc}>{h.description}</div>
                <div className={styles.specs}>
                  {h.params.map((param) => (
                    <div key={param.key} className={styles.spec}>
                      {/* <span className={styles.spec__icon}>{spec.icon}</span> */}
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
      <Show
        when={
          !!isOpenedFsSlider &&
          typeof window !== "undefined" &&
          data.find((h) => h.id === isOpenedFsSlider)
        }
      >
        {(h) => (
          <FullscreenSlider
            slides={h.images.map(({ image }) => image)}
            onClose={() => setIsOpenedFsSlider(null)}
            bottomStartSlot={
              <FullscrenSliderCaptionRoot>
                <FullscreenSliderCaptionTitle>
                  {h.name}
                </FullscreenSliderCaptionTitle>
                <FullscreenSliderCaptionDesc
                  className={styles.fsSliderCaptionDesc}
                >
                  <div className={styles.fsSliderCaptionDesc__beds}>
                    <BedIcon /> <span>{h.beds}</span>
                  </div>
                  ·
                  <span className={styles.fsSliderCaptionDesc__price}>
                    {fmt.price(h.price)} ₽ / сутки
                  </span>
                </FullscreenSliderCaptionDesc>
              </FullscrenSliderCaptionRoot>
            }
          />
        )}
      </Show>
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
