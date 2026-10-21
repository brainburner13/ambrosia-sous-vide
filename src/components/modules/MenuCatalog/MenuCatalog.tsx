"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import cloche from "@/components/shared/BrandLogo/cloche.svg";
import { products } from "@/data/mockData";
import { useCartStore } from "@/store/useCartStore";
import {
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type Category,
} from "@/types/catalog";
import {
  formatKcal,
  formatMacros,
  formatPrice,
  formatWeight,
} from "@/utils/format";
import styles from "./MenuCatalog.module.css";

const groups = CATEGORY_ORDER.map((category) => ({
  category,
  items: products.filter((product) => product.category === category),
})).filter((group) => group.items.length > 0);

export function MenuCatalog() {
  const cartItems = useCartStore((state) => state.cartItems);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <section className={styles.section} id="menu" aria-labelledby="menu-title">
      <div className={`container ${styles.inner}`}>
        <header className={styles.header}>
          <p className="eyebrow">Витрина</p>
          <h2 id="menu-title" className={styles.title}>
            Су-вид позиции на вес
          </h2>
        </header>

        {groups.map((group) => (
          <CategoryGroup
            key={group.category}
            category={group.category}
            quantityOf={(id) =>
              cartItems.find((item) => item.product.id === id)?.quantity ?? 0
            }
            onAdd={addItem}
            items={group.items}
          />
        ))}
      </div>
    </section>
  );
}

function CategoryGroup({
  category,
  items,
  quantityOf,
  onAdd,
}: {
  category: Category;
  items: (typeof products)[number][];
  quantityOf: (id: string) => number;
  onAdd: (product: (typeof products)[number]) => void;
}) {
  const [open, setOpen] = useState(true);
  const openRef = useRef(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = `category-${category}`;

  function toggle(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const next = !openRef.current;
    openRef.current = next;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      panel.style.height = "";
      setOpen(next);
      return;
    }

    if (next) {
      setOpen(true);
      const target = panel.scrollHeight;
      panel.style.height = `${panel.getBoundingClientRect().height}px`;
      void panel.offsetHeight;
      panel.style.height = `${target}px`;
      panel.addEventListener(
        "transitionend",
        (endEvent) => {
          if (endEvent.propertyName !== "height" || !openRef.current) {
            return;
          }
          panel.style.height = "";
        },
        { once: true },
      );
      return;
    }

    panel.style.transition = "none";
    panel.style.height = `${panel.getBoundingClientRect().height}px`;
    void panel.offsetHeight;
    panel.style.transition = "";
    panel.style.height = "0px";
    panel.addEventListener(
      "transitionend",
      (endEvent) => {
        if (endEvent.propertyName !== "height" || openRef.current) {
          return;
        }
        setOpen(false);
        requestAnimationFrame(() => {
          if (!openRef.current) {
            panel.style.height = "";
          }
        });
      },
      { once: true },
    );
  }

  return (
    <details className={styles.group} open={open}>
      <summary className={styles.summary} onClick={toggle}>
        <h3 id={titleId} className={styles.groupTitle}>
          {CATEGORY_LABELS[category]}
        </h3>
        <span className={styles.chevron} aria-hidden="true">
          <ChevronIcon />
        </span>
      </summary>
      <div
        className={styles.panel}
        ref={panelRef}
        inert={open ? undefined : true}
      >
        <div className={styles.panelInner}>
          <ul className={styles.grid}>
            {items.map((product) => {
              const quantity = quantityOf(product.id);

              return (
                <li key={product.id}>
                  <article className={styles.card}>
                    <div className={styles.media}>
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 360px"
                          className={styles.photo}
                        />
                      ) : (
                        <span className={styles.placeholder} aria-hidden="true">
                          <Image src={cloche} alt="" width={72} height={60} />
                        </span>
                      )}
                    </div>
                    <div className={styles.body}>
                      <p className={styles.weight}>
                        {formatWeight(product.weight)}
                      </p>
                      <h4 className={styles.name}>{product.name}</h4>
                      {product.description ? (
                        <p className={styles.description}>
                          {product.description}
                        </p>
                      ) : null}
                      <p className={styles.kcal}>{formatKcal(product.kcal)}</p>
                      <p className={styles.macros}>{formatMacros(product)}</p>
                      <div className={styles.footer}>
                        <p className={styles.price}>
                          {formatPrice(product.price)}
                        </p>
                        <button
                          type="button"
                          className={styles.add}
                          onClick={() => onAdd(product)}
                        >
                          Добавить в корзину
                          {quantity > 0 ? (
                            <span className={styles.inCart}>{quantity}</span>
                          ) : null}
                        </button>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </details>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 6 8 10.5 12.5 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
