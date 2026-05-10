import { Reveal } from "@/app/presentation/shared/ui/utils/reveal";
import { Section, SectionEyebrow } from "../shared";

import styles from "./Rules.module.scss";

interface IRule {
  value: string;
}

const rules: Array<IRule> = [
  {
    value: "🚫 Огонь только в мангальной зоне",
  },
  {
    value: "🔇 Тишина 00:00–10:00",
  },
  {
    value: "🐾 С питомцами можно, 500 ₽ + залог",
  },
  {
    value: "🚗 Только по основной дороге",
  },
  {
    value: "🎆 Фейерверки запрещены",
  },
  {
    value: "👨‍👩‍👧 До 20 лет — со взрослыми",
  },
];

export const Rules = () => {
  return (
    <Section className={styles.root} id="services">
      <div className={styles.header}>
        <Reveal>
          <SectionEyebrow className={styles.title}>
            Правила проживания
          </SectionEyebrow>
        </Reveal>
      </div>
      <div className={styles.rules}>
        {rules.map((r, i) => (
          <Reveal key={i} className={styles.rule} delay={i % 2 == 0 ? 1 : 2}>
            <span className={styles.rule__value}>{r.value}</span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};
