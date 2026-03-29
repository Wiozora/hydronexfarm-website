"use client";

import Link from "next/link";
import { FaClipboardList } from "react-icons/fa";

import { useStore } from "@/components/store/StoreProvider";

export function BasketButton() {
  const { isReady, totalItems } = useStore();

  return (
    <Link
      href="/inquiry"
      className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[#d6dfcb] px-4 py-3 text-sm font-bold text-[#183109] transition hover:border-[#86f556] hover:text-[#5c953f] 2xl:gap-3 2xl:px-6"
    >
      <FaClipboardList />
      <span className="xl:hidden 2xl:inline">Cart / Quote</span>
      <span className="hidden xl:inline 2xl:hidden">Basket</span>
      <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-[#eff8e7] px-2 py-1 text-xs font-black text-[#5c953f]">
        {isReady ? totalItems : 0}
      </span>
    </Link>
  );
}
