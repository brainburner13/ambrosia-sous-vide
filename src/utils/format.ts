const priceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 0,
});

function plain(value: string): string {
  return value.replace(/\u00a0/g, " ");
}

export function formatPrice(value: number): string {
  return plain(priceFormatter.format(value));
}

export function formatNumber(value: number): string {
  return plain(numberFormatter.format(Math.round(value)));
}

export function formatDecimal(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }
  return rounded.toFixed(1).replace(".", ",");
}

export function maskPhone(value: string): string {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits.startsWith("9")) {
    digits = `7${digits}`;
  }

  digits = digits.slice(0, 11);
  const local = digits.startsWith("7") ? digits.slice(1) : digits;

  if (!digits) {
    return "";
  }

  let masked = "+7";

  if (local.length === 0) {
    return masked;
  }

  masked += ` (${local.slice(0, 3)}`;

  if (local.length < 3) {
    return masked;
  }

  masked += ")";

  if (local.length > 3) {
    masked += ` ${local.slice(3, 6)}`;
  }

  if (local.length > 6) {
    masked += `-${local.slice(6, 8)}`;
  }

  if (local.length > 8) {
    masked += `-${local.slice(8, 10)}`;
  }

  return masked;
}

export function formatWeight(grams: number): string {
  return `${formatDecimal(grams)} г`;
}

export function formatKcal(kcal: number): string {
  return `${formatDecimal(kcal)} ккал`;
}

export function formatMacros(nutrition: {
  protein: number;
  fats: number;
  carbs: number;
}): string {
  return `Б ${formatDecimal(nutrition.protein)} · Ж ${formatDecimal(nutrition.fats)} · У ${formatDecimal(nutrition.carbs)}`;
}
