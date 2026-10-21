export const siteConfig = {
  name: "Ambrosia Sous-Vide",
  nameRu: "Амброзия су-вид",
  title: "Амброзия су-вид — готовые позиции на вес",
  description:
    "Витрина готовых су-вид позиций на вес: рыба, мясо и гарниры. Заказ уходит сообщением в Telegram, ВКонтакте или MAX.",
  city: "Тверь",
  map: {
    latitude: 56.858721,
    longitude: 35.917596,
    zoom: 12,
  },
  phoneDisplay: "+7 (999) 999-99-99",
  email: "hello@ambrosia-sousvide.ru",
  legalName: "Шатунов Илья Игоревич",
  ogrnip: "999999999999999",
  inn: "999999999999",
  url: "https://ambrosia-sousvide.ru",
  social: [
    {
      id: "telegram",
      label: "Telegram",
      href: "https://t.me/ambrosia_sousvide",
    },
    {
      id: "vk",
      label: "ВКонтакте",
      href: "https://vk.ru/ambrosia_sousvide",
    },
    {
      id: "max",
      label: "MAX",
      href: "https://max.ru/u/ambrosia_sousvide",
    },
  ],
} as const;
