import type { IButtonLinkProps, IButtonProps } from "./Button.interfaces";

import cn from "clsx";
import styles from "./Button.module.scss";
import { Link } from "react-router";

export const Button = ({
  variant = "outline",
  className,
  ...props
}: IButtonProps) => {
  return (
    <button
      className={cn(styles.root, className, styles[`root--${variant}`])}
      {...props}
    />
  );
};

export const LinkButton = ({
  variant = "outline",
  className,
  ...props
}: IButtonLinkProps) => {
  return (
    <Link
      className={cn(styles.root, className, styles[`root--${variant}`])}
      {...props}
    />
  );
};
