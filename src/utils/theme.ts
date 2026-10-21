export const THEME_COOKIE = "ambrosia-theme";

export type Theme = "light" | "dark";

export function parseTheme(value: string | undefined): Theme {
  return value === "light" ? "light" : "dark";
}

export function themeCookie(theme: Theme): string {
  return `${THEME_COOKIE}=${theme};path=/;max-age=31536000;samesite=lax`;
}
