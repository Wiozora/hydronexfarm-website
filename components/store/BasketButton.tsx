"use client";

import { FaClipboardList } from "react-icons/fa";

import { useStore } from "@/components/store/StoreProvider";

type BasketButtonProps = {
  compact?: boolean;
  responsiveLabel?: boolean;
};

export function BasketButton({
  compact = false,
  responsiveLabel = false,
}: BasketButtonProps) {
  const { isReady, totalItems, toggleCart } = useStore();

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label="Toggle cart"
      className={`inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#d6dfcb] text-sm font-bold text-[#183109] transition hover:border-[#86f556] hover:text-[#5c953f] ${
        compact
          ? "px-3 py-2.5"
          : "px-3.5 py-3 min-[1700px]:gap-3 min-[1700px]:px-6"
      }`}
    >
      <FaClipboardList />
      {compact ? null : (
        <span className={responsiveLabel ? "hidden min-[1500px]:inline" : undefined}>
          My Cart
        </span>
      )}
      <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-[#eff8e7] px-2 py-1 text-xs font-black text-[#5c953f]">
        {isReady ? totalItems : 0}
      </span>
    </button>
  );
}
