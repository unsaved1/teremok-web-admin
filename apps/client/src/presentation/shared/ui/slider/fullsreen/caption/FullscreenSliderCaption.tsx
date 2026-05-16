import type { TDivProps, TSpanProps } from "@/presentation/shared/types";

import cn from "clsx";
import styles from "./FullscreenSliderCaption.module.scss";

export const FullscrenSliderCaptionRoot = ({
  className,
  ...props
}: TDivProps) => {
  return <div className={cn(styles.root, className)} {...props} />;
};

export const FullscreenSliderCaptionTitle = ({
  className,
  ...props
}: TSpanProps) => {
  return <span className={cn(styles.title, className)} {...props} />;
};

export const FullscreenSliderCaptionDesc = ({
  className,
  ...props
}: TDivProps) => {
  return <div className={cn(styles.desc, className)} {...props} />;
};
