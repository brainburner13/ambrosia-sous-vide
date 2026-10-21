"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/shared/BrandLogo/BrandLogo";
import { CopyContact } from "@/components/shared/CopyContact/CopyContact";
import { ThemeToggle } from "@/components/shared/ThemeToggle/ThemeToggle";
import { summarizeCart, useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/utils/format";
import styles from "./Header.module.css";

const links = [
  { href: "/#menu", label: "Витрина" },
  { href: "/#cart", label: "Корзина" },
  { href: "/#process", label: "Су-вид" },
  { href: "/#delivery", label: "Доставка" },
];

export function Header() {
  const cartItems = useCartStore((state) => state.cartItems);
  const summary = summarizeCart(cartItems);

  return (
    <header className={styles.header}>
      <a className={styles.skip} href="#main">
        К содержанию
      </a>
      <div className={styles.inner}>
        <Link
          className={styles.logo}
          href="/#top"
          aria-label="Амброзия су-вид, наверх"
        >
          <BrandLogo animated />
          <span className={styles.descriptor}></span>
        </Link>

        <nav className={styles.nav} aria-label="Разделы страницы">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <address className={styles.contacts}>
            <CopyContact
              value={siteConfig.phoneDisplay}
              label={`Скопировать телефон ${siteConfig.phoneDisplay}`}
            >
              {siteConfig.phoneDisplay}
            </CopyContact>
          </address>
          <ThemeToggle />
          <Link
            className={styles.cart}
            href="/#cart"
            aria-label={`Корзина, ${formatPrice(summary.price)}`}
          >
            <BagIcon />
            <span className={styles.cartSum}>{formatPrice(summary.price)}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function BagIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.2 6.2h9.6l-.7 8.2H4.9L4.2 6.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M6.4 6.1V4.8A2.6 2.6 0 0 1 9 2.2a2.6 2.6 0 0 1 2.6 2.6v1.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
