import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Header/Header";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Амброзия су-вид",
  description:
    "Какие данные собирает Амброзия су-вид, зачем они нужны и какие права есть у пользователя.",
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main id="main" className={styles.main}>
        <article className={`container ${styles.article}`}>
          <Link href="/" className={styles.back}>
            ← Вернуться на главную
          </Link>
          <h1>Политика конфиденциальности</h1>
          <p className={styles.lead}>
            Оператор: {siteConfig.legalName}, ОГРНИП {siteConfig.ogrnip}, ИНН{" "}
            {siteConfig.inn}, {siteConfig.city}. Связь: {siteConfig.email}.
          </p>

          <section className={styles.section}>
            <h2>1. Общие положения</h2>
            <p>
              Эта политика описывает, как {siteConfig.name} обрабатывает
              персональные данные посетителей сайта. Обработка ведётся по
              Федеральному закону № 152-ФЗ «О персональных данных». Отправляя
              заказ или оставаясь на сайте после уведомления о cookie, вы
              подтверждаете, что прочитали эту политику.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Какие данные мы собираем</h2>
            <p>Сайт запрашивает только то, что нужно для заказа и оформления:</p>
            <ul>
              <li>имя, которое вы указываете при оформлении заказа;</li>
              <li>номер телефона для связи по заказу;</li>
              <li>
                файл cookie с выбранной темой оформления — тёмной или светлой.
                Других cookie сайт не ставит.
              </li>
            </ul>
            <p>
              Паспортные данные, платёжные реквизиты и сведения о здоровье не
              запрашиваются и не хранятся.
            </p>
          </section>

          <section className={styles.section}>
            <h2>3. Цели сбора</h2>
            <p>
              Имя и телефон нужны, чтобы оформить и доставить су-вид рационы.
              Заказ уходит сообщением в выбранный мессенджер: Telegram,
              ВКонтакте или MAX. Cookie темы нужен только для
              корректного отображения сайта при следующем визите. Если cookie
              отклонены, тема действует до закрытия страницы и не сохраняется.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Права пользователей</h2>
            <p>
              Вы можете узнать, какие данные обрабатываются, попросить их
              уточнить, ограничить или удалить, а также отозвать согласие.
              Напишите на {siteConfig.email}. Cookie можно отклонить в
              уведомлении внизу сайта: тогда тема оформления не записывается.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
