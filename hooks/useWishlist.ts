import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type Item = {
  id: string;
  title: string;
  image: string;
  price?: number;
  source: string;
  createdAt: number;
  normalizedUrl: string;
};

type Store = {
  items: Item[];
  addItem: (item: Item) => Promise<void>;
  loadItems: () => Promise<void>;
  clearItems: () => Promise<void>;
};

const STORAGE_KEY = "wishlist";

// Preloaded demo items with real images
const preloaded: Item[] = [
  {
    id: "1",
    title: "Airpods Max - Midnight",
    image: "https://m.media-amazon.com/images/I/81jkMpNHVsL._AC_SX522_.jpg",
    price: 499.99,
    source: "apple.com",
    createdAt: Date.now(),
    normalizedUrl: "https://apple.com/airpods-max",
  },
  {
    id: "2",
    title: "Stretch Bandeau Top",
    image: "https://m.media-amazon.com/images/I/71NIFGErRCL._AC_SY445_.jpg",
    price: 79.99,
    source: "zara.com",
    createdAt: Date.now(),
    normalizedUrl: "https://zara.com/stretch-bandeau-top",
  },
];

export const useWishlist = create<Store>((set, get) => ({
  items: [],

  addItem: async (item) => {
    const exists = get().items.find(
      (i) => i.normalizedUrl.toLowerCase() === item.normalizedUrl.toLowerCase()
    );
    if (exists) return;

    const updated = [item, ...get().items];
    set({ items: updated });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  loadItems: async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);

      if (saved) {
        set({ items: JSON.parse(saved) });
      } else {
        // preload demo items if empty
        set({ items: preloaded });
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preloaded));
      }
    } catch (e) {
      console.error("Failed to load wishlist:", e);
    }
  },

  clearItems: async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    set({ items: [] });
  },
}));
