import { create } from "zustand";
import { Product } from "@/ecommerce/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotals: () => { subtotal: number; savings: number; total: number; count: number };
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  
  addItem: (product) => {
    const { items } = get();
    const existing = items.find((i) => i.id === product.id);
    
    if (existing) {
      set({
        items: items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
        isOpen: true,
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }], isOpen: true });
    }
  },
  
  removeItem: (productId) => {
    set({ items: get().items.filter((i) => i.id !== productId) });
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.id === productId ? { ...i, quantity } : i
      ),
    });
  },
  
  clearCart: () => set({ items: [] }),
  
  getTotals: () => {
    const { items } = get();
    return items.reduce(
      (acc, item) => {
        const itemTotal = item.price * item.quantity;
        const itemOriginalTotal = (item.originalPrice || item.price) * item.quantity;
        
        acc.subtotal += itemOriginalTotal;
        acc.total += itemTotal;
        acc.savings += (itemOriginalTotal - itemTotal);
        acc.count += item.quantity;
        
        return acc;
      },
      { subtotal: 0, savings: 0, total: 0, count: 0 }
    );
  },
}));
