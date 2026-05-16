import type { IImage } from "@/domain/shared/entity/image";

import { useSharedPresentationCtx } from "@/app/di/context";

import { ImageComponent } from "@/presentation/shared/ui/base";
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react";
import { Scrollbar } from "swiper/modules";

import cn from "clsx";
import styles from "./Slider.module.scss";
import "swiper/css";
import "swiper/css/scrollbar";

interface IHouseCardCarouselProps extends Omit<SwiperProps, "children"> {
  slides: Array<IImage>;
  isWide?: boolean;
}

export const CardSlider = ({
  spaceBetween = 0,
  slidesPerView = 1,
  slides,
  isWide,
  className,
  ...props
}: IHouseCardCarouselProps) => {
  const { imagePath } = useSharedPresentationCtx();

  return (
    <Swiper
      className={cn(styles.root, className, {
        [styles["root--wide"]]: isWide,
      })}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      modules={[Scrollbar]}
      scrollbar={{
        enabled: true,
        draggable: false,
        horizontalClass: styles.scrollbar,
      }}
      {...props}
    >
      {slides.map((s, i) => (
        <SwiperSlide key={i} className={styles.slide}>
          <ImageComponent
            className={styles.image}
            src={imagePath.createUrl(s.originalPath)}
            alt={s.id.slice(0, 5)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
