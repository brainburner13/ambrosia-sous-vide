export const THEME_COOKIE = "ambrosia-theme";

export type Theme = "light" | "dark";

export function parseTheme(value: string | undefined): Theme {
  return value === "light" ? "light" : "dark";
}

export function themeCookie(theme: Theme): string {
  return `${THEME_COOKIE}=${theme};path=/;max-age=31536000;samesite=lax`;
}

export const themeBootScript = `(function(){try{var match=document.cookie.match(/(?:^|; )${THEME_COOKIE}=([^;]*)/);document.documentElement.dataset.theme=match&&decodeURIComponent(match[1])==="light"?"light":"dark";}catch(e){}})();`;
