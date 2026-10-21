"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  COOKIE_CONSENT_KEY,
  type CookieConsent,
} from "@/utils/cookieConsent";
import { THEME_COOKIE, themeCookie, type Theme } from "@/utils/theme";
import styles from "./CookieBanner.module.css";

const APPEAR_DELAY = 1500;

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let frame = 0;

    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored === "accepted" || stored === "declined") {
        return;
      }
    } catch {
      return;
    }

    frame = window.setTimeout(() => setVisible(true), APPEAR_DELAY);

    return () => window.clearTimeout(frame);
  }, []);

  useEffect(() => {
    if (!leaving) {
      return;
    }

    const frame = window.setTimeout(() => setVisible(false), 320);
    return () => window.clearTimeout(frame);
  }, [leaving]);

  function choose(value: CookieConsent) {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {
      // Выбор всё равно скрывает баннер до конца визита.
    }

    if (value === "accepted") {
      const theme: Theme =
        document.documentElement.dataset.theme === "light" ? "light" : "dark";
      document.cookie = themeCookie(theme);
    } else {
      document.cookie = `${THEME_COOKIE}=;path=/;max-age=0;samesite=lax`;
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      setVisible(false);
      return;
    }

    setLeaving(true);
  }

  if (!visible) {
    return null;
  }

  return (
    <aside
      className={leaving ? `${styles.banner} ${styles.leaving}` : styles.banner}
      data-cookie-banner=""
      role="dialog"
      aria-label="Уведомление о cookie"
    >
      <div className={`container ${styles.inner}`}>
        <p className={styles.text}>
          Мы используем файлы cookie для корректной работы сайта и сохранения
          выбранной вами темы. Оставаясь на сайте, вы соглашаетесь с нашей{" "}
          <Link href="/privacy" className={styles.policy}>
            Политикой конфиденциальности
          </Link>
          .
        </p>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.reject}
            onClick={() => choose("declined")}
          >
            Отклонить
          </button>
          <button
            type="button"
            className={styles.accept}
            onClick={() => choose("accepted")}
          >
            Принять
          </button>
        </div>
      </div>
    </aside>
  );
}
