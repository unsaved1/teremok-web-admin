import type { IContact } from "@root/src/domain/entity/content/interfaces";
import { Reveal } from "@/app/presentation/shared/ui/reveal";
import styles from "@/app/presentation/ui/root.module.scss";

type CtaBannerProps = {
  contacts: IContact;
};

function toPhoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) {
    return `tel:${digits}`;
  }
  return `tel:+${digits}`;
}

export function CtaBanner({ contacts }: CtaBannerProps) {
  const phoneHref = toPhoneHref(contacts.phone);

  return (
    <section className={styles.ctaBanner} id="contact">
      <div className={styles.ctaInner}>
        <div className={styles.ctaText}>
          <Reveal>
            <p className={styles.sectionEyebrow}>Специальное предложение</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className={styles.sectionTitle}>
              Беседки — дневное
              <br />
              пребывание <em>500 ₽</em>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className={styles.ctaSub}>
              Дети до 7 лет бесплатно. Для компаний и юридических лиц —
              индивидуальные условия.
            </p>
          </Reveal>
        </div>
        <Reveal className={styles.ctaActions} delay={2}>
          <a href={phoneHref} className={styles.ctaPhone}>
            {contacts.phone}
          </a>
          <div className={styles.ctaNote}>{contacts.messenger}</div>
          <a href={phoneHref} className={styles.btnPrimary}>
            Позвонить сейчас
          </a>
        </Reveal>
      </div>
    </section>
  );
}
