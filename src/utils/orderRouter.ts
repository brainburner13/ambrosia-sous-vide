import { siteConfig } from "@/config/site";
import type { CartItem } from "@/types/catalog";
import { summarizeCart } from "@/store/useCartStore";
import { formatDecimal } from "@/utils/format";

export interface OrderCustomer {
  name: string;
  phone: string;
}

export interface OrderDraft {
  cartItems: CartItem[];
  customer: OrderCustomer;
}

export interface CustomerErrors {
  name?: string;
  phone?: string;
}

export type MessengerChannel = "telegram" | "vk" | "max";

function formatOrderPrice(value: number): string {
  return `${Math.round(value)} ₽`;
}

export function validateCustomer(customer: OrderCustomer): CustomerErrors {
  const errors: CustomerErrors = {};
  const name = customer.name.trim();
  const digits = customer.phone.replace(/\D/g, "");

  if (name.length < 2) {
    errors.name = "Укажите имя — не короче 2 символов";
  }

  if (digits.length !== 11 || !digits.startsWith("7")) {
    errors.phone = "Укажите телефон в формате +7 (999) 999-99-99";
  }

  return errors;
}

export function buildOrderMessage(draft: OrderDraft): string {
  const name = draft.customer.name.trim() || "не указано";
  const phone = draft.customer.phone.trim() || "не указан";
  const summary = summarizeCart(draft.cartItems);

  const lines =
    draft.cartItems.length === 0
      ? ["- Позиции пока не выбраны"]
      : draft.cartItems.map((item) => {
          const weight = item.product.weight * item.quantity;
          const price = item.product.price * item.quantity;
          return `- ${item.product.name} x${item.quantity} (${weight}г) — ${formatOrderPrice(price)}`;
        });

  return [
    "🌿 *Новый заказ в Ambrosia Sous-Vide!* 🌿",
    `👤 *Клиент:* ${name} (${phone})`,
    "🛍️ *Выбранные су-вид позиции:*",
    ...lines,
    "---",
    `📊 *Суммарный КБЖУ заказа:* ${formatDecimal(summary.kcal)} ккал | Б: ${formatDecimal(summary.protein)} | Ж: ${formatDecimal(summary.fats)} | У: ${formatDecimal(summary.carbs)}`,
    `💰 *Итого к оплате:* ${Math.round(summary.price)} рублей`,
  ].join("\n");
}

function withText(base: string, message: string): string {
  return `${base}${encodeURIComponent(message)}`;
}

export function buildTelegramUrl(draft: OrderDraft): string {
  const message = buildOrderMessage(draft);
  const url = encodeURIComponent(siteConfig.url);
  return `https://t.me/share/url?url=${url}&text=${encodeURIComponent(message)}`;
}

export function buildVkUrl(draft: OrderDraft): string {
  const params = new URLSearchParams({
    url: siteConfig.url,
    title: "Заказ Ambrosia Sous-Vide",
    comment: buildOrderMessage(draft),
  });
  return `https://vk.com/share.php?${params.toString()}`;
}

export function buildMaxUrl(draft: OrderDraft): string {
  return withText("https://max.ru/:share?text=", buildOrderMessage(draft));
}

export function buildMessengerUrl(
  channel: MessengerChannel,
  draft: OrderDraft,
): string {
  switch (channel) {
    case "telegram":
      return buildTelegramUrl(draft);
    case "vk":
      return buildVkUrl(draft);
    case "max":
      return buildMaxUrl(draft);
  }
}
