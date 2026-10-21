import type { StaticImageData } from "next/image";

export type Category = "fish" | "meat" | "sides" | "breakfast";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  kcal: number;
  protein: number;
  fats: number;
  carbs: number;
  category: Category;
  image: StaticImageData | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  quantity: number;
  weight: number;
  price: number;
  kcal: number;
  protein: number;
  fats: number;
  carbs: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  fish: "Рыба и морепродукты",
  meat: "Мясо и птица",
  sides: "Овощи и гарниры",
  breakfast: "Завтраки и полезные десерты",
};

export const CATEGORY_ORDER: readonly Category[] = [
  "fish",
  "meat",
  "sides",
  "breakfast",
];
