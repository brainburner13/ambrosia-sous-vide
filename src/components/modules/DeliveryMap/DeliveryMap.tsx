import { siteConfig } from "@/config/site";
import styles from "./DeliveryMap.module.css";

const { latitude, longitude, zoom } = siteConfig.map;

const yandexWidget = `https://yandex.ru/map-widget/v1/?ll=${longitude}%2C${latitude}&z=${zoom}&pt=${longitude},${latitude},pm2rdm`;
const yandexLink = `https://yandex.ru/maps/?ll=${longitude}%2C${latitude}&z=${zoom}&pt=${longitude},${latitude}&text=${encodeURIComponent("Тверь")}`;

export function DeliveryMap() {
  return (
    <section
      className={styles.section}
      id="delivery"
      aria-labelledby="delivery-title"
    >
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow">География</p>
          <h2 id="delivery-title">Доставка по Твери</h2>
          <p className={styles.lead}>
            Готовые су-вид позиции привозим по городу. Точка на карте — Тверь,
            {latitude.toFixed(4)}° с.ш., {longitude.toFixed(4)}° в.д.
          </p>
          <a
            className={styles.link}
            href={yandexLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Открыть Тверь в Яндекс Картах
          </a>
        </div>
        <div className={styles.frame}>
          <iframe
            title="Карта доставки: Тверь"
            src={yandexWidget}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
