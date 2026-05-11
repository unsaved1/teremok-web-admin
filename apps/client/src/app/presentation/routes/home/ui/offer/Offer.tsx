import type { IOfferProps } from "./Offer.interfaces";

import { Reveal } from "@/app/presentation/shared/ui/utils/reveal";
import { LinkButton } from "@/app/presentation/shared/ui/button";
import { Section, SectionEyebrow, SectionTitle } from "../shared";

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
    <Section className={styles.root} id="contact">
      <div className={styles.inner}>
        <div className={styles.text}>
          <Reveal>
            <SectionEyebrow>Специальное предложение</SectionEyebrow>
          </Reveal>
          <Reveal delay={1}>
            <SectionTitle className={styles.text__title}>
              Беседки — дневное
              <br />
              пребывание <em>500 ₽</em>
            </SectionTitle>
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
          {/* <div className={styles.note}>{contacts.messenger}</div> */}
          <LinkButton variant="primary" to={phoneHref}>
            Позвонить сейчас
          </LinkButton>
        </Reveal>
      </div>
    </Section>
  );
};
