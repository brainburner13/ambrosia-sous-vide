import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/shared/BrandLogo/BrandLogo";
import { CopyContact } from "@/components/shared/CopyContact/CopyContact";
import { MessengerIcon } from "@/components/shared/MessengerIcon/MessengerIcon";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Link
          className={styles.logo}
          href="/#top"
          aria-label="Амброзия су-вид, наверх"
        >
          <BrandLogo />
        </Link>
        <div className={styles.contacts}>
          <p>
            {siteConfig.nameRu} · {siteConfig.city}
          </p>
          <CopyContact
            value={siteConfig.phoneDisplay}
            label={`Скопировать телефон ${siteConfig.phoneDisplay}`}
          >
            {siteConfig.phoneDisplay}
          </CopyContact>
          <CopyContact
            value={siteConfig.email}
            label={`Скопировать почту ${siteConfig.email}`}
          >
            {siteConfig.email}
          </CopyContact>
          <ul className={styles.social}>
            {siteConfig.social.map((item) => (
              <li key={item.id}>
                <a
                  className={styles.socialLink}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  <MessengerIcon name={item.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <dl className={styles.legal}>
          <div>
            <dt>Наименование организации</dt>
            <dd>{siteConfig.legalName}</dd>
          </div>
          <div>
            <dt>ОГРНИП</dt>
            <dd>{siteConfig.ogrnip}</dd>
          </div>
          <div>
            <dt>ИНН</dt>
            <dd>{siteConfig.inn}</dd>
          </div>
        </dl>
        <div className={styles.bar}>
          <p>
            © {year} {siteConfig.name}. Все права защищены.
          </p>
          <Link href="/privacy" className={styles.privacy}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
