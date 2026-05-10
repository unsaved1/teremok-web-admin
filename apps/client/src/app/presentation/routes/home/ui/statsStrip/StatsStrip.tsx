import { Reveal } from "@/app/presentation/shared/ui/utils/reveal";
import styles from "./StatsStrip.module.scss";

const stats = [
  { value: "5", label: "Домиков" },
  { value: "14", label: "Спальных мест" },
  { value: "10+", label: "Лет работы" },
  { value: "500м", label: "До реки" },
] as const;

export function StatsStrip() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        {stats.map((stat, index) => (
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
