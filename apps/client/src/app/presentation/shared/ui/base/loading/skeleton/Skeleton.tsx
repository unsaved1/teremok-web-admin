import { type ISkeletonProps } from "./Skeleton.interfaces";

import cn from "clsx";
import styles from "./Skeleton.module.scss";

export const Skeleton = ({ children, className, ...props }: ISkeletonProps) => {
  return (
    <div className={cn(styles.root, className)} {...props}>
      {children}
    </div>
  );
};
