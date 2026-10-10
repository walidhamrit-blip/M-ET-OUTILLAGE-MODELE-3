"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  id: number;
  slug: string;
  name: string;
  nameAr?: string;
  nameEn?: string;
  price: number;
  image: string;
  qty: number;
};

export type CartItemInput = Omit<CartItem, "qty">;

type CartContextType = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: CartItemInput) => void;
  removeItem: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  lastAdded: CartItemInput | null;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "matek-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartItemInput | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(() => setLastAdded(null), 2500);
    return () => clearTimeout(t);
  }, [lastAdded]);

  const addItem = useCallback((item: CartItemInput) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setLastAdded(item);
  }, []);

  const removeItem = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextType>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.price, 0);
    return { items, count, total, addItem, removeItem, setQty, clear, lastAdded };
  }, [items, addItem, removeItem, setQty, clear, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
