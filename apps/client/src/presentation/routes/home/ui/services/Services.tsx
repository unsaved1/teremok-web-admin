import type { IService } from "@root/src/domain/entity/content/interfaces";
import type { Nullable } from "@repo/shared/types";

import { useState } from "react";

import { Reveal, Show } from "@/presentation/shared/ui/utils";
import { SquareButton } from "@/presentation/shared/ui/base";
import { Section, SectionTitle } from "../shared";
import {
  CardSlider,
  FullscreenSlider,
} from "@/presentation/shared/ui/slider";

import styles from "./Services.module.scss";
import ZoomOutMapIcon from "@/presentation/assets/icons/zoomOutMap.svg?react";

type ServicesSectionProps = {
  services: IService[];
};

const delays: Array<0 | 1 | 2 | 3> = [0, 1, 2, 3];

export const Services = ({ services }: ServicesSectionProps) => {
  const [isOpenedFsSlider, setIsOpenedFsSlider] =
    useState<Nullable<IService["id"]>>(null);
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
            <div className={styles.itemSlider}>
              <CardSlider slides={s.images.map(({ image }) => image)} />
              <SquareButton
                className={styles.itemSlider__openBtn}
                onClick={() => setIsOpenedFsSlider(s.id)}
              >
                <ZoomOutMapIcon />
              </SquareButton>
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
      <Show
        when={
          !!isOpenedFsSlider &&
          typeof window !== "undefined" &&
          services.find((s) => s.id === isOpenedFsSlider)
        }
      >
        {(h) => (
          <FullscreenSlider
            slides={h.images.map(({ image }) => image)}
            onClose={() => setIsOpenedFsSlider(null)}
          />
        )}
      </Show>
    </Section>
  );
};
