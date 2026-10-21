import { Button } from "@/components/ui/Button/Button";
import { HeroVideo } from "./HeroVideo";
import styles from "./Hero.module.css";

const facts = [
  {
    value: "На вес",
    label: "Рыба, мясо и гарниры поштучно",
    icon: <ScaleIcon />,
  },
  {
    value: "7–14 дней",
    label: "Хранение в вакууме",
    icon: <HourglassIcon />,
  },
  {
    value: "5 минут",
    label: "Разогрев перед подачей",
    icon: <StopwatchIcon />,
  },
];

export function Hero() {
  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.media}>
        <HeroVideo />
        <div className={styles.veil} />
      </div>

      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow}`}>
            Амброзия су-вид · доставка по Твери
          </p>
          <h1 id="hero-title" className={styles.title}>
            Готовые позиции
            <br />
            <em>су-вид</em> на вес
          </h1>
          <div className={styles.lead}>
            <p>
              Ваш персональный ресторанный гастроном. Избавьтесь от рутины
              готовки без компромиссов по вкусу и качеству.
            </p>
            <p>
              Набирайте любимые позиции поштучно, оформляйте заказ в
              мессенджерах и наслаждайтесь сочным мясом и рыбой у себя дома.
            </p>
          </div>
          <div className={styles.actions}>
            <Button href="#menu">Смотреть витрину</Button>
            <Button href="#cart" variant="secondary">
              Корзина
            </Button>
          </div>
        </div>

        <ul className={styles.trust}>
          {facts.map((fact) => (
            <li key={fact.value} className={styles.fact}>
              <span className={styles.icon} aria-hidden="true">
                {fact.icon}
              </span>
              <span>
                <span className={styles.factValue}>{fact.value}</span>
                <span className={styles.factLabel}>{fact.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ScaleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M14 5v18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8 8.5h12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8 8.5 4.5 15.2a3.6 3.6 0 0 0 7 0L8 8.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M20 8.5 16.5 15.2a3.6 3.6 0 0 0 7 0L20 8.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M10 23h8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HourglassIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path
        d="M8 4.5h12M8 23.5h12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M9 4.8c.3 3.6 2.4 5.6 5 7.2-2.6 1.6-4.7 3.6-5 7.2M19 4.8c-.3 3.6-2.4 5.6-5 7.2 2.6 1.6 4.7 3.6 5 7.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StopwatchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="16" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M14 16V11.5M14 5.5V4M11 5.5h6M18.2 8.2l1.2-1.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
