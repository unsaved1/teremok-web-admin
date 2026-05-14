import type { ISpinnerProps } from "./SimpleSpinner.interfaces";

import { Show } from "@/app/presentation/shared/ui/utils";

import cn from "clsx";
import styles from "./SimpleSpinner.module.scss";

export const Spinner = ({ label, className, ...props }: ISpinnerProps) => {
  return (
    <div className={cn(styles.root, className)}>
      <span className={styles.icon} {...props} />
      <Show when={label}>
        {(value) => <span className={styles.label}>{value}</span>}
      </Show>
    </div>
  );
};
