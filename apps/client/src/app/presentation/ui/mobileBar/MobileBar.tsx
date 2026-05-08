import styles from "../root.module.scss";

export function MobileBar() {
  return (
    <div className={styles.mobileBar}>
      <a href="tel:+79878661625" className={styles.mobileBarCall}>
        📞 Позвонить
      </a>
      <a href="https://wa.me/79878661625" className={styles.mobileBarWhatsapp}>
        💬 WhatsApp
      </a>
    </div>
  );
}
