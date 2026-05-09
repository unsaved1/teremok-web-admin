import type { IOfferProps } from "./Offer.interfaces";
import { Reveal } from "@/app/presentation/shared/ui/utils/reveal";

import cn from "clsx";
import rootStyles from "@/app/presentation/ui/root.module.scss";
import styles from "./Offer.module.scss";

function toPhoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    return `tel:${digits}`;
  }
  return `tel:+${digits}`;
}

export const Offer = ({ contacts }: IOfferProps) => {
  const phoneHref = toPhoneHref(contacts.phone);

  return (
    <section className={styles.root} id="contact">
      <div className={styles.inner}>
        <div className={styles.text}>
          <Reveal>
            <p className={rootStyles.sectionEyebrow}>Специальное предложение</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className={cn(styles.text__title, rootStyles.sectionTitle)}>
              Беседки — дневное
              <br />
              пребывание <em>500 ₽</em>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className={styles.sub}>
              Дети до 7 лет бесплатно. Для компаний и юридических лиц —
              индивидуальные условия.
            </p>
          </Reveal>
        </div>
        <Reveal className={styles.actions} delay={2}>
          <a href={phoneHref} className={styles.phone}>
            {contacts.phone}
          </a>
          <div className={styles.note}>{contacts.messenger}</div>
          <a href={phoneHref} className={rootStyles.btnPrimary}>
            Позвонить сейчас
          </a>
        </Reveal>
      </div>
    </section>
  );
};
