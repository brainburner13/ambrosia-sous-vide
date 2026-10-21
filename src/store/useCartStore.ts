import { create } from "zustand";
import type { CartItem, CartSummary, Product } from "@/types/catalog";

export const MAX_LINE_QUANTITY = 20;

interface CartState {
  cartItems: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

function normalizeQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) {
    return 1;
  }
  return Math.min(MAX_LINE_QUANTITY, Math.max(1, Math.floor(quantity)));
}

export function summarizeCart(cartItems: CartItem[]): CartSummary {
  return cartItems.reduce<CartSummary>(
    (summary, item) => {
      summary.quantity += item.quantity;
      summary.weight += item.product.weight * item.quantity;
      summary.price += item.product.price * item.quantity;
      summary.kcal += item.product.kcal * item.quantity;
      summary.protein += item.product.protein * item.quantity;
      summary.fats += item.product.fats * item.quantity;
      summary.carbs += item.product.carbs * item.quantity;
      return summary;
    },
    { quantity: 0, weight: 0, price: 0, kcal: 0, protein: 0, fats: 0, carbs: 0 },
  );
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addItem: (product) =>
    set((state) => {
      const existing = state.cartItems.find((item) => item.product.id === product.id);

      if (!existing) {
        return { cartItems: [...state.cartItems, { product, quantity: 1 }] };
      }

      return {
        cartItems: state.cartItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(MAX_LINE_QUANTITY, item.quantity + 1),
              }
            : item,
        ),
      };
    }),
  removeItem: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (!Number.isFinite(quantity) || quantity <= 0) {
        return {
          cartItems: state.cartItems.filter((item) => item.product.id !== productId),
        };
      }

      const nextQuantity = normalizeQuantity(quantity);

      return {
        cartItems: state.cartItems.map((item) =>
          item.product.id === productId ? { ...item, quantity: nextQuantity } : item,
        ),
      };
    }),
  clearCart: () => set({ cartItems: [] }),
}));
