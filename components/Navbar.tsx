"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBars,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";

import { BasketButton } from "@/components/store/BasketButton";
import {
  getPublicEmailHref,
  getPublicPhoneHref,
  hasPublicEmail,
  hasPublicPhone,
  hasPublicSocialLink,
  hasPublicWhatsApp,
  siteConfig,
} from "@/lib/site-config";
import {
  getPageAwareWhatsAppMessage,
  getWhatsAppEntryLink,
  shouldOpenWhatsAppInNewTab,
} from "@/lib/whatsapp";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Battery Cases", href: "/shop/battery-cases" },
  { label: "Hydroponics", href: "/shop/hydroponics-systems" },
  { label: "T & V-Slots", href: "/shop/t-v-slots" },
];
const mobileNavLinks = navLinks.filter((link) => link.href === "/" || link.href === "/shop");

const socialLinkDefs = [
  { label: "Facebook", href: siteConfig.socials.facebook, icon: FaFacebookF },
  { label: "Instagram", href: siteConfig.socials.instagram, icon: FaInstagram },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const directEmailVisible = hasPublicEmail();
  const directPhoneVisible = hasPublicPhone();
  const whatsappVisible = hasPublicWhatsApp();
  const quickActionHref = getWhatsAppEntryLink(getPageAwareWhatsAppMessage(pathname));
  const quickActionExternal = shouldOpenWhatsAppInNewTab();
  const visibleSocialLinks = socialLinkDefs.filter((item) => hasPublicSocialLink(item.href));
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isLinkActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const topStripClasses = `mx-auto flex max-w-[92rem] items-center justify-between rounded-[1.35rem] border px-4 py-3 text-sm font-semibold backdrop-blur-xl transition-all duration-300 md:px-8 lg:px-12 ${
    isScrolled
      ? "border-white/14 bg-[linear-gradient(135deg,rgba(14,34,18,0.72),rgba(16,36,18,0.46))] text-white shadow-[0_18px_44px_rgba(8,18,12,0.22)]"
      : "border-white/18 bg-[linear-gradient(135deg,rgba(20,44,24,0.54),rgba(18,38,22,0.26))] text-white shadow-[0_18px_44px_rgba(8,18,12,0.14)]"
  }`;
  const mainNavClasses = `rounded-[1.5rem] border transition-all duration-300 backdrop-blur-2xl md:rounded-[2rem] ${
    isScrolled
      ? "border-white/42 bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(245,250,242,0.72))] shadow-[0_26px_70px_rgba(12,18,14,0.22)]"
      : "border-white/55 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(247,250,244,0.58))] shadow-[0_18px_48px_rgba(12,18,14,0.14)]"
  }`;
  const mobilePanelClasses =
    "max-h-[calc(100svh-5.5rem)] overflow-y-auto border-t border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(247,250,244,0.74))] backdrop-blur-2xl min-[1200px]:hidden";

  return (
    <header className="fixed inset-x-0 top-0 z-[200] isolate pt-2 sm:pt-3 md:pt-4">
      <div className="hidden min-[1200px]:block">
        <div className={topStripClasses}>
          <div className="flex items-center gap-8">
            {directEmailVisible ? (
              <a
                href={getPublicEmailHref()}
                className="inline-flex items-center gap-3 transition hover:text-[#86f556]"
              >
                <FaEnvelope className="text-[#86f556]" />
                {siteConfig.email}
              </a>
            ) : null}
            {directPhoneVisible ? (
              <a
                href={getPublicPhoneHref()}
                className="inline-flex items-center gap-3 transition hover:text-[#86f556]"
              >
                <FaPhoneAlt className="text-[#86f556]" />
                {siteConfig.displayPhone}
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 transition hover:text-[#86f556]"
              >
                <FaPhoneAlt className="text-[#86f556]" />
                Phone shared after inquiry
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {(visibleSocialLinks.length > 0 ? visibleSocialLinks : socialLinkDefs).map((item) => {
              const isLive = hasPublicSocialLink(item.href);

              return isLive ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#86f556] text-[#132117] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <item.icon />
                </a>
              ) : (
                <Link
                  key={item.label}
                  href="/contact"
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#86f556] text-[#132117] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <item.icon />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[92rem] px-3 sm:px-4 md:px-6">
        <div className={mainNavClasses}>
          <div className="flex items-center justify-between gap-3 px-3 py-3.5 sm:px-5 md:px-7 md:py-4 lg:gap-5 lg:px-8">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex min-w-0 flex-1 items-center gap-3 min-[1200px]:max-w-[15.25rem] min-[1200px]:flex-[0_1_15.25rem] min-[1500px]:max-w-[17rem] min-[1500px]:flex-[0_1_17rem] min-[1700px]:max-w-[20rem] min-[1700px]:flex-[0_1_20rem]"
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full sm:h-11 sm:w-11 md:h-12 md:w-12">
                <Image
                  src={siteConfig.logo}
                  alt={`${siteConfig.storeName} logo`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="min-w-0">
                <p className="font-heading text-sm font-black leading-none tracking-tight text-[#132117] sm:text-base md:text-lg">
                  {siteConfig.storeName}
                </p>
              </div>
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 min-[1200px]:flex min-[1500px]:gap-4 min-[1700px]:gap-6">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);

                return (
                  <div key={link.label} className="relative shrink-0">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 whitespace-nowrap text-[0.88rem] font-semibold transition min-[1500px]:text-[0.96rem] min-[1700px]:text-[1.04rem] ${
                        isActive ? "text-[#79d84a]" : "text-[#151b12] hover:text-[#79d84a]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="hidden shrink-0 items-center justify-end gap-2.5 min-[1200px]:flex min-[1700px]:gap-3">
              <BasketButton responsiveLabel />
              {quickActionExternal ? (
                <a
                  href={quickActionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#86f556] px-4 py-3 text-[0.9rem] font-bold text-[#132117] transition hover:bg-[#73e543] min-[1500px]:px-5 min-[1500px]:text-[0.95rem] min-[1700px]:gap-3 min-[1700px]:px-8 min-[1700px]:py-4 min-[1700px]:text-lg"
                >
                  <FaWhatsapp />
                  <span className="min-[1500px]:hidden">{whatsappVisible ? "WhatsApp" : "Quote"}</span>
                  <span className="hidden min-[1500px]:inline">{whatsappVisible ? "WhatsApp Now" : "Request Quote"}</span>
                </a>
              ) : (
                <Link
                  href={quickActionHref}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#86f556] px-4 py-3 text-[0.9rem] font-bold text-[#132117] transition hover:bg-[#73e543] min-[1500px]:px-5 min-[1500px]:text-[0.95rem] min-[1700px]:gap-3 min-[1700px]:px-8 min-[1700px]:py-4 min-[1700px]:text-lg"
                >
                  <FaWhatsapp />
                  <span className="min-[1500px]:hidden">Quote</span>
                  <span className="hidden min-[1500px]:inline">Request Quote</span>
                </Link>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2 min-[1200px]:hidden">
              {quickActionExternal ? (
                <a
                  href={quickActionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={whatsappVisible ? "WhatsApp Now" : "Request Quote"}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#86f556] text-[#132117] sm:h-11 sm:w-11"
                >
                  <FaWhatsapp />
                </a>
              ) : (
                <Link
                  href={quickActionHref}
                  aria-label="Request Quote"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#86f556] text-[#132117] sm:h-11 sm:w-11"
                >
                  <FaWhatsapp />
                </Link>
              )}
              <button
                type="button"
                onClick={() => setIsOpen((current) => !current)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dde6d6] text-[#132117] sm:h-11 sm:w-11"
                aria-label="Toggle navigation"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className={mobilePanelClasses}
              >
                <div className="flex flex-col gap-2 px-4 py-4 sm:px-5">
                  {mobileNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        isLinkActive(link.href)
                          ? "bg-[#eff9e7] text-[#79d84a]"
                          : "text-[#1d2619] hover:bg-[#f5f8f0] hover:text-[#79d84a]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}


