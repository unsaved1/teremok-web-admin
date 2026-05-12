import type { TElementProps, TImgProps } from "../../types";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Skeleton } from "../loading";

import cn from "clsx";
import styles from "./imageComponent.module.scss";

interface IImageProps extends TImgProps {
  rootClassName?: string;
  skeletionClassName?: string;
  pictureProps?: Omit<TElementProps, "className">;
}

const pixelRatio = 1.2;

export const ImageComponent = ({
  className,
  rootClassName,
  skeletionClassName,
  src,
  srcSet,
  pictureProps,
  ...props
}: IImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(!imgRef.current?.complete);
  }, [src, srcSet]);

  return (
    <picture className={cn(styles.root, rootClassName)} {...pictureProps}>
      <source
        media={`(-webkit-min-device-pixel-ratio: ${pixelRatio})`}
        srcSet={srcSet}
      />
      <img
        className={cn(styles.img, className, {
          [styles["img--hidden"]]: isLoading,
        })}
        onLoad={() => {
          setIsLoading(false);
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
