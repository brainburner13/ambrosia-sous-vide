"use client";

import { useEffect, useId, useRef, useState } from "react";
import { MessengerIcon } from "@/components/shared/MessengerIcon/MessengerIcon";
import { Button } from "@/components/ui/Button/Button";
import {
  MAX_LINE_QUANTITY,
  summarizeCart,
  useCartStore,
} from "@/store/useCartStore";
import {
  buildMessengerUrl,
  validateCustomer,
  type CustomerErrors,
  type MessengerChannel,
} from "@/utils/orderRouter";
import {
  formatKcal,
  formatMacros,
  formatPrice,
  formatWeight,
  maskPhone,
} from "@/utils/format";
import styles from "./OrderCart.module.css";

const channels: Array<{ id: MessengerChannel; label: string }> = [
  { id: "telegram", label: "Telegram" },
  { id: "vk", label: "ВКонтакте" },
  { id: "max", label: "MAX" },
];

export function OrderCart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const summary = summarizeCart(cartItems);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<CustomerErrors>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
      nameRef.current?.focus();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setOpen(false);
    }
  }, [cartItems.length]);

  function closeCheckout() {
    setOpen(false);
  }

  function send(channel: MessengerChannel) {
    const customer = { name, phone };
    const nextErrors = validateCustomer(customer);
    setErrors(nextErrors);

    if (nextErrors.name) {
      nameRef.current?.focus();
      return;
    }

    if (nextErrors.phone) {
      phoneRef.current?.focus();
      return;
    }

    if (cartItems.length === 0) {
      return;
    }

    const href = buildMessengerUrl(channel, { cartItems, customer });
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <section className={styles.section} id="cart" aria-labelledby="cart-title">
      <div className="container">
        <header className={styles.header}>
          <p className="eyebrow">Заказ</p>
          <h2 id="cart-title">Корзина</h2>
        </header>

        {cartItems.length === 0 ? (
          <div className={styles.empty}>
            <p>
              В корзине пока нет позиций. Добавьте мясо, рыбу или гарнир с
              витрины.
            </p>
            <Button href="#menu" variant="secondary">
              Перейти в меню
            </Button>
          </div>
        ) : (
          <div className={styles.layout}>
            <ul className={styles.list}>
              {cartItems.map((item) => {
                const lineWeight = item.product.weight * item.quantity;
                const linePrice = item.product.price * item.quantity;
                const lineKcal = item.product.kcal * item.quantity;

                return (
                  <li key={item.product.id} className={styles.row}>
                    <div>
                      <h3 className={styles.name}>{item.product.name}</h3>
                      <p className={styles.meta}>
                        {formatWeight(lineWeight)} · {formatKcal(lineKcal)} ·{" "}
                        {formatMacros({
                          protein: item.product.protein * item.quantity,
                          fats: item.product.fats * item.quantity,
                          carbs: item.product.carbs * item.quantity,
                        })}
                      </p>
                    </div>
                    <div className={styles.controls}>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        aria-label={`Уменьшить количество: ${item.product.name}`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= MAX_LINE_QUANTITY}
                        aria-label={`Увеличить количество: ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.linePrice}>{formatPrice(linePrice)}</p>
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeItem(item.product.id)}
                    >
                      Убрать
                    </button>
                  </li>
                );
              })}
            </ul>

            <aside className={styles.summary}>
              <p className={styles.totalLabel}>Итого</p>
              <p className={styles.total}>{formatPrice(summary.price)}</p>
              <p className={styles.note}>
                {formatWeight(summary.weight)} · {summary.quantity} шт.
              </p>
              <p className={styles.note}>
                {formatKcal(summary.kcal)} · {formatMacros(summary)}
              </p>
              <Button
                type="button"
                className={styles.checkout}
                onClick={() => setOpen(true)}
              >
                Оформить заказ
              </Button>
              <button
                type="button"
                className={styles.clear}
                onClick={clearCart}
              >
                Очистить корзину
              </button>
            </aside>
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby={titleId}
        onClose={closeCheckout}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            closeCheckout();
          }
        }}
      >
        <form
          className={styles.form}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            send("telegram");
          }}
        >
          <header className={styles.dialogHeader}>
            <h3 id={titleId} className={styles.dialogTitle}>
              Куда отправить заказ
            </h3>
            <button
              type="button"
              className={styles.close}
              onClick={closeCheckout}
            >
              Закрыть
            </button>
          </header>
          <p className={styles.note}>
            {formatPrice(summary.price)} · {formatWeight(summary.weight)} ·{" "}
            {formatKcal(summary.kcal)}
          </p>
          <label className={styles.label} htmlFor="order-name">
            Имя
          </label>
          <input
            id="order-name"
            ref={nameRef}
            className={styles.input}
            name="name"
            autoComplete="name"
            value={name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "order-name-error" : undefined}
            onChange={(event) => setName(event.target.value)}
          />
          {errors.name ? (
            <p id="order-name-error" className={styles.error} role="alert">
              {errors.name}
            </p>
          ) : null}

          <label className={styles.label} htmlFor="order-phone">
            Телефон
          </label>
          <input
            id="order-phone"
            ref={phoneRef}
            className={styles.input}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7 (999) 999-99-99"
            value={phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "order-phone-error" : undefined}
            onChange={(event) => setPhone(maskPhone(event.target.value))}
          />
          {errors.phone ? (
            <p id="order-phone-error" className={styles.error} role="alert">
              {errors.phone}
            </p>
          ) : null}

          <div className={styles.channels}>
            {channels.map((channel) => (
              <Button
                key={channel.id}
                type={channel.id === "telegram" ? "submit" : "button"}
                variant="secondary"
                className={styles.channel}
                onClick={
                  channel.id === "telegram" ? undefined : () => send(channel.id)
                }
              >
                <MessengerIcon name={channel.id} />
                {channel.label}
              </Button>
            ))}
          </div>
        </form>
      </dialog>
    </section>
  );
}
