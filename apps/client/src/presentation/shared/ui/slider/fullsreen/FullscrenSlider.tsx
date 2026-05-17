import type { Nullable } from "@repo/shared/types";
import type { TBtnProps, TSpanProps } from "@/presentation/shared/types";
import type { IImage } from "@/domain/shared/entity/image";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSharedPresentationCtx } from "@/app/di/context";

import {
  Swiper,
  SwiperSlide,
  type SwiperProps,
  type SwiperClass,
  useSwiper,
} from "swiper/react";
import { Navigation, Pagination, Thumbs, Zoom } from "swiper/modules";
import { ImageComponent, SquareButton } from "@/presentation/shared/ui/base";

import ArrowIcon from "@/presentation/assets/icons/arrow.svg?react";
import CloseIcon from "@/presentation/assets/icons/close.svg?react";
import ZoomInIcon from "@/presentation/assets/icons/zoomIn.svg?react";
import ZoomOutIcon from "@/presentation/assets/icons/zoomOut.svg?react";

import cn from "clsx";
import styles from "./FullscrenSlider.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

interface IFullscreenSliderProps extends Omit<SwiperProps, "children"> {
  slides: Array<IImage>;
  onClose?: () => void;
  bottomStartSlot?: ReactNode;
}

export const FullscreenSlider = ({
  slides,
  spaceBetween = 0,
  slidesPerView = 1,
  className,
  bottomStartSlot,
  onClose,
  ...props
}: IFullscreenSliderProps) => {
  const { imagePath, scrollLock } = useSharedPresentationCtx();
  const [thumbsSwiper, setThumbsSwiper] = useState<Nullable<SwiperClass>>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollLock.lock();
    const handleEsc = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      scrollLock.unlock();
    };
  }, []);

  const handleClose = () => {
    onClose?.();
  };

  return createPortal(
    <div className={styles.root}>
      <div className={styles.topBar} ref={topBarRef} />
      <Swiper
        className={cn(styles.slider, className)}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        modules={[Pagination, Navigation, Thumbs, Zoom]}
        thumbs={{
          swiper: thumbsSwiper,
          slideThumbActiveClass: styles["thumbsSlider__slide--active"],
        }}
        navigation={{
          prevEl: `.${styles["navBtn--prev"]}`,
          nextEl: `.${styles["navBtn--next"]}`,
        }}
        zoom={{
          containerClass: styles.slider__slideZoomWrapper,
        }}
        {...props}
      >
        {slides.map((s, i) => {
          if (!s.thumbnailPath) {
            return null;
          }
          return (
            <SwiperSlide key={i} className={styles.slider__slide}>
              <div className={styles.slider__slideZoomWrapper}>
                <ImageComponent
                  className={styles.slider__slideImage}
                  src={imagePath.createUrl(s.originalPath)}
                  alt={s.id.slice(0, 5)}
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          );
        })}
        <div
          slot="container-start"
          className={cn(styles.scrim, styles["scrim--top"])}
        />
        <div
          slot="container-end"
          className={cn(styles.scrim, styles["scrim--bottom"])}
        />
        <>
          {navRef.current && createPortal(<SliderCount />, navRef.current)}
          {topBarRef.current &&
            createPortal(
              <>
                <ZoomInBtn />
                <ZoomOutBtn />
                <CloseBtn onClose={handleClose} />
              </>,
              topBarRef.current,
            )}
        </>
      </Swiper>
      <div className={styles.bottom}>
        <div className={styles.bottomStartSlot}>{bottomStartSlot}</div>
        <Swiper
          className={styles.thumbsSlider}
          wrapperClass={styles.thumbsSlider__wrapper}
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
          slidesPerView={4}
          spaceBetween={8}
          breakpoints={{
            576: {
              slidesPerView: 5,
            },
            768: {
              slidesPerView: 6,
            },
          }}
        >
          {slides.map((s, i) => {
            if (!s.thumbnailPath) {
              return null;
            }
            return (
              <SwiperSlide key={i} className={styles.thumbsSlider__slide}>
                <ImageComponent
                  className={styles.thumbsSlider__slideImage}
                  src={imagePath.createUrl(s.thumbnailPath)}
                  alt={s.id.slice(0, 5)}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={styles.nav} ref={navRef}>
          <div className={styles.nav__buttons}>
            <SquareButton className={cn(styles.navBtn, styles["navBtn--prev"])}>
              <ArrowIcon />
            </SquareButton>
            <SquareButton className={cn(styles.navBtn, styles["navBtn--next"])}>
              <ArrowIcon />
            </SquareButton>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

const SliderCount = (props: TSpanProps) => {
  const slider = useSwiper();
  const [currentIndex, setCurrentIndex] = useState(slider.activeIndex);

  useEffect(() => {
    slider.on("activeIndexChange", (e) => {
      setCurrentIndex(e.activeIndex);
    });
    return () => {
      slider.off("activeIndexChange");
    };
  }, []);

  return (
    <span className={styles.nav__count} {...props}>
      {currentIndex + 1} / {slider.slides.length}
    </span>
  );
};

const CloseBtn = ({ onClose }: { onClose: () => void }) => {
  const handleClick: TBtnProps["onClick"] = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <SquareButton className={styles.closeBtn} onClick={handleClick}>
      <CloseIcon />
    </SquareButton>
  );
};

const ZoomInBtn = () => {
  const slider = useSwiper();

  const handleClick: TBtnProps["onClick"] = (e) => {
    e.preventDefault();
    console.log("new ratio: ", slider.zoom.scale + 1);
    slider.zoom.in(slider.zoom.scale + 1);
  };

  return (
    <SquareButton
      className={cn(styles.zoomBtn, styles["zoomBtn--in"], {
        [styles["zoomBtn--disabled"]]:
          typeof slider.params.zoom === "object"
            ? slider.zoom.scale === slider.params.zoom.maxRatio
            : slider.zoom.scale === 3,
      })}
      onClick={handleClick}
    >
      <ZoomInIcon />
    </SquareButton>
  );
};

const ZoomOutBtn = () => {
  const slider = useSwiper();

  const handleClick: TBtnProps["onClick"] = (e) => {
    e.preventDefault();
    slider.zoom.out();
  };

  useEffect(() => {
    slider.on("zoomChange", ({ zoom }) => {
      console.log(zoom.enabled);
    });
    return () => {
      slider.off("zoomChange");
    };
  }, []);

  return (
    <SquareButton
      className={cn(styles.zoomBtn, styles["zoomBtn--out"], {
        [styles["zoomBtn--disabled"]]:
          typeof slider.params.zoom === "object"
            ? slider.zoom.scale === slider.params.zoom.minRatio
            : slider.zoom.scale === 1,
      })}
      onClick={handleClick}
    >
      <ZoomOutIcon />
    </SquareButton>
  );
};
