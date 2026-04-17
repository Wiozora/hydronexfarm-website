"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { CartDrawer } from "@/components/store/CartDrawer";
import { storageKeys } from "@/lib/site-config";
import { getBasketCount, getProductBySlug } from "@/lib/store";
import { trackEvent } from "@/lib/tracking";
import type { BasketItem } from "@/types";

type StoreContextValue = {
  items: BasketItem[];
  totalItems: number;
  isReady: boolean;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: BasketItem) => void;
  removeItem: (item: Pick<BasketItem, "productSlug" | "variantId" | "mode">) => void;
  updateQuantity: (item: Pick<BasketItem, "productSlug" | "variantId" | "mode">, quantity: number) => void;
  clearBasket: () => void;
  clearItemsByMode: (mode: BasketItem["mode"]) => void;
};

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

function isSameItem(current: BasketItem, next: Pick<BasketItem, "productSlug" | "variantId" | "mode">) {
  return (
    current.productSlug === next.productSlug &&
    current.variantId === next.variantId &&
    current.mode === next.mode
  );
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKeys.storeBasket);

      if (stored) {
        const parsed = JSON.parse(stored) as BasketItem[];
        setItems(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setItems([]);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(storageKeys.storeBasket, JSON.stringify(items));
  }, [items, isReady]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  function addItem(item: BasketItem) {
    setItems((current) => {
      const index = current.findIndex((candidate) => isSameItem(candidate, item));

      if (index === -1) {
        return [...current, item];
      }

      return current.map((candidate, candidateIndex) =>
        candidateIndex === index
          ? { ...candidate, quantity: candidate.quantity + item.quantity }
          : candidate,
      );
    });

    const product = getProductBySlug(item.productSlug);
    toast.success(`${product?.shortName ?? "Item"} added to cart!`);
    trackEvent("add_to_cart", {
      item_name: product?.shortName ?? item.productSlug,
      quantity: item.quantity,
      purchase_flow: item.mode,
    });

    // Auto-open cart drawer when item is added
    setIsCartOpen(true);
  }

  function removeItem(item: Pick<BasketItem, "productSlug" | "variantId" | "mode">) {
    setItems((current) => current.filter((candidate) => !isSameItem(candidate, item)));
  }

  function updateQuantity(
    item: Pick<BasketItem, "productSlug" | "variantId" | "mode">,
    quantity: number,
  ) {
    if (quantity <= 0) {
      removeItem(item);
      return;
    }

    setItems((current) =>
      current.map((candidate) =>
        isSameItem(candidate, item) ? { ...candidate, quantity } : candidate,
      ),
    );
  }

  function clearBasket() {
    setItems([]);
  }

  function clearItemsByMode(mode: BasketItem["mode"]) {
    setItems((current) => current.filter((item) => item.mode !== mode));
  }

  return (
    <StoreContext.Provider
      value={{
        items,
        totalItems: getBasketCount(items),
        isReady,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        clearBasket,
        clearItemsByMode,
      }}
    >
      {children}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within a StoreProvider.");
  }

  return context;
}
