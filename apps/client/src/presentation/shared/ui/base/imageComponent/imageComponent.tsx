import type { TElementProps, TImgProps } from "../../../types";

import { useRef, useState } from "react";
import { Skeleton } from "../loading";

import cn from "clsx";
import styles from "./imageComponent.module.scss";

interface IImageProps extends Omit<TImgProps, "onLoad"> {
  rootClassName?: string;
  skeletionClassName?: string;
  pictureProps?: Omit<TElementProps, "className">;
  onLoad?: (ref: HTMLImageElement) => void;
}

const pixelRatio = 1.2;

export const ImageComponent = ({
  className,
  rootClassName,
  skeletionClassName,
  src,
  srcSet,
  pictureProps,
  onLoad,
  ...props
}: IImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <picture className={cn(styles.root, rootClassName)} {...pictureProps}>
      <source
        media={`(-webkit-min-device-pixel-ratio: ${pixelRatio})`}
        srcSet={srcSet}
      />
      <img
        ref={imgRef}
        className={cn(styles.img, className, {
          [styles["img--hidden"]]: isLoading,
        })}
        onLoad={() => {
          setIsLoading(false);
          if (imgRef.current && onLoad) {
            onLoad(imgRef.current);
          }
        }}
        src={src}
        {...props}
      />
      {isLoading && (
        <Skeleton className={cn(styles.skeleton, skeletionClassName)} />
      )}
    </picture>
  );
};
