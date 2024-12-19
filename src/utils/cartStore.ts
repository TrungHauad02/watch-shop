import { create } from "zustand";

interface CartStore {
  items: any[];
  getTotalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  getTotalItems: () => get().items.length,
}));
