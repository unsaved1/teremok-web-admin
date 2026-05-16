import { Reveal } from "@/presentation/shared/ui/utils";
import styles from "./StatsStrip.module.scss";

interface IStat {
  value: string;
  label: string;
}

export function StatsStrip({ data }: { data: Array<IStat> }) {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        {data.map((stat, index) => (
          <Reveal
            key={stat.label}
            className={styles.stat}
            delay={index as 0 | 1 | 2 | 3}
          >
            <div className={styles.stat__num}>{stat.value}</div>
            <div className={styles.stat__label}>{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
