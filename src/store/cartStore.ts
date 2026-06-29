import { create } from "zustand";

interface ICartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface ICartState {
  items: ICartItem[];
  total: number;
  addItem: (item: Omit<ICartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<ICartState>((set) => ({
  items: [],
  total: 0,
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        const items = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        return { items, total: items.reduce((s, i) => s + i.price * i.quantity, 0) };
      }
      const items = [...state.items, { ...item, quantity: 1 }];
      return { items, total: items.reduce((s, i) => s + i.price * i.quantity, 0) };
    }),
  removeItem: (id) =>
    set((state) => {
      const items = state.items.filter((i) => i.id !== id);
      return { items, total: items.reduce((s, i) => s + i.price * i.quantity, 0) };
    }),
  clearCart: () => set({ items: [], total: 0 }),
}));
