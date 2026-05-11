import cn from "clsx";
import styles from "./MobileBar.module.scss";

export function MobileBar({ isOpen }: { isOpen?: boolean }) {
  return (
    <div
      className={cn(styles.root, {
        [styles["root--open"]]: isOpen,
      })}
    >
      <a href="tel:+79878661625" className={styles.root__call}>
        📞 Позвонить
      </a>
      <a href="https://wa.me/79878661625" className={styles.root__whatsapp}>
        💬 WhatsApp
      </a>
    </div>
  );
}
