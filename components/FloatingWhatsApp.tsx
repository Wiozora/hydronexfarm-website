"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ClipboardList, MessageCircle, ShoppingBag } from "lucide-react";

import { useStore } from "@/components/store/StoreProvider";
import { hasPublicWhatsApp } from "@/lib/site-config";
import { getBasketDestination } from "@/lib/store";
import { getPageAwareWhatsAppMessage, getWhatsAppEntryLink } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const { items } = useStore();
  const [showMobileBar, setShowMobileBar] = useState(false);
  const whatsappVisible = hasPublicWhatsApp();
  const href = getWhatsAppEntryLink(getPageAwareWhatsAppMessage(pathname));
  const basketDestination = getBasketDestination(items);
  const mobileSecondaryAction = pathname === "/checkout"
    ? basketDestination.hasQuote
      ? {
          href: "/inquiry?mode=mixed",
          label: "Request Quote",
          icon: ClipboardList,
        }
      : {
          href: "/shop",
          label: "View Details",
          icon: ShoppingBag,
        }
    : pathname === "/inquiry"
      ? basketDestination.hasCart
        ? {
            href: "/checkout",
            label: "Checkout",
            icon: ShoppingBag,
          }
        : {
            href: "/shop",
            label: "View Details",
            icon: ShoppingBag,
          }
      : basketDestination.label !== "My List"
        ? {
            href: basketDestination.href,
            label: basketDestination.label,
            icon: basketDestination.label === "Checkout" ? ShoppingBag : ClipboardList,
          }
        : {
            href: "/shop",
            label: "View Details",
            icon: ShoppingBag,
          };
  const sharedProps = {
    className:
      "group fixed bottom-4 right-4 z-[115] hidden items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_18px_40px_rgba(37,211,102,0.36)] transition hover:bg-[#1da851] sm:bottom-6 sm:right-6 sm:flex sm:p-4",
    whileHover: { scale: 1.08 },
    whileTap: { scale: 0.94 },
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 260, damping: 22, delay: 0.9 },
  } as const;

  const label = whatsappVisible ? "WhatsApp Now" : "Request Quote";
  const mobilePrimaryLabel = whatsappVisible ? "WhatsApp Now" : "Request Quote";
  const mobilePrimaryClasses =
    "inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#86f556] px-4 py-3 text-sm font-bold text-[#132117] transition hover:bg-[#73e543]";
  const mobileSecondaryClasses =
    "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/18 px-4 py-3 text-sm font-bold text-white transition hover:border-[#86f556] hover:text-[#86f556]";

  useEffect(() => {
    const onScroll = () => setShowMobileBar(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mobilePrimary = whatsappVisible ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={mobilePrimaryClasses}
    >
      <MessageCircle className="h-4 w-4" />
      <span>{mobilePrimaryLabel}</span>
    </a>
  ) : (
    <Link href={href} className={mobilePrimaryClasses}>
      <MessageCircle className="h-4 w-4" />
      <span>{mobilePrimaryLabel}</span>
    </Link>
  );

  if (!whatsappVisible) {
    const SecondaryIcon = mobileSecondaryAction.icon;

    return (
      <>
        {showMobileBar ? (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
            className="fixed inset-x-3 bottom-3 z-[126] rounded-[1.35rem] border border-white/12 bg-[#102412]/92 p-2.5 shadow-[0_22px_50px_rgba(8,18,12,0.32)] backdrop-blur-md sm:hidden"
          >
            <div className="flex items-center gap-2">
              {mobilePrimary}
              <Link href={mobileSecondaryAction.href} className={mobileSecondaryClasses}>
                <SecondaryIcon className="h-4 w-4" />
                <span>{mobileSecondaryAction.label}</span>
              </Link>
            </div>
          </motion.div>
        ) : null}

        <motion.div {...sharedProps}>
          <Link href={href} className="flex items-center justify-center">
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary opacity-0 shadow-lg transition duration-300 group-hover:opacity-100 sm:block">
              {label}
            </span>
          </Link>
        </motion.div>
      </>
    );
  }

  const SecondaryIcon = mobileSecondaryAction.icon;

  return (
    <>
      {showMobileBar ? (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.1 }}
          className="fixed inset-x-3 bottom-3 z-[126] rounded-[1.35rem] border border-white/12 bg-[#102412]/92 p-2.5 shadow-[0_22px_50px_rgba(8,18,12,0.32)] backdrop-blur-md sm:hidden"
        >
          <div className="flex items-center gap-2">
            {mobilePrimary}
            <Link href={mobileSecondaryAction.href} className={mobileSecondaryClasses}>
              <SecondaryIcon className="h-4 w-4" />
              <span>{mobileSecondaryAction.label}</span>
            </Link>
          </div>
        </motion.div>
      ) : null}

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...sharedProps}
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary opacity-0 shadow-lg transition duration-300 group-hover:opacity-100 sm:block">
          {label}
        </span>
      </motion.a>
    </>
  );
}

