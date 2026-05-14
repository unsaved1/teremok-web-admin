import type { ISquareButtonProps } from "./SquareButton.interfaces";
import { Button } from "../base";
import cn from "clsx";
import styles from "./SquareButton.module.scss";

export const SquareButton = ({
  variant = "outline",
  className,
  ...props
}: ISquareButtonProps) => {
  return (
    <Button
      variant={variant}
      className={cn(styles.root, className)}
      {...props}
    />
  );
};
