import { Reveal } from "@/app/presentation/shared/ui/utils/reveal";
import styles from "@/app/presentation/ui/root.module.scss";

const stats = [
  { value: "5", label: "Домиков" },
  { value: "14", label: "Спальных мест" },
  { value: "10+", label: "Лет работы" },
  { value: "500м", label: "До реки" },
] as const;

export function StatsStrip() {
  return (
    <div className={styles.stats}>
      <div className={styles.statsInner}>
        {stats.map((stat, index) => (
          <Reveal
            key={stat.label}
            className={styles.stat}
            delay={index as 0 | 1 | 2 | 3}
          >
            <div className={styles.statNum}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
