import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type Item = {
  id: string;
  title: string;
  image: string;
  price?: string;
  source: string;
  createdAt: number;
  normalizedUrl: string;
};

type Store = {
  items: Item[];
  addItem: (item: Item) => void;
  loadItems: () => Promise<void>;
};

export const useWishlist = create<Store>((set, get) => ({
  items: [],
  addItem: async (item) => {
    const dedup = get().items.find(
      (i) => i.normalizedUrl === item.normalizedUrl
    );
    if (dedup) return;
    const updated = [...get().items, item];
    set({ items: updated });
    await AsyncStorage.setItem("wishlist", JSON.stringify(updated));
  },
  loadItems: async () => {
    const saved = await AsyncStorage.getItem("wishlist");
    if (saved) set({ items: JSON.parse(saved) });
  },
}));
