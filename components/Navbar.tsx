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
  FaLinkedinIn,
  FaPhoneAlt,
  FaTimes,
  FaTwitter,
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
import { getWhatsAppEntryLink, shouldOpenWhatsAppInNewTab } from "@/lib/whatsapp";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Hydroponics", href: "/shop/hydroponics-systems" },
  { label: "Nutrients", href: "/shop/nutrients" },
  { label: "Aluminum", href: "/shop/aluminum-accessories" },
  { label: "Battery", href: "/shop/battery-solutions" },
];

const socialLinkDefs = [
  { label: "Facebook", href: siteConfig.socials.facebook, icon: FaFacebookF },
  { label: "Twitter", href: siteConfig.socials.twitter, icon: FaTwitter },
  { label: "LinkedIn", href: siteConfig.socials.linkedin, icon: FaLinkedinIn },
  { label: "Instagram", href: siteConfig.socials.instagram, icon: FaInstagram },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const directEmailVisible = hasPublicEmail();
  const directPhoneVisible = hasPublicPhone();
  const whatsappVisible = hasPublicWhatsApp();
  const quickActionHref = getWhatsAppEntryLink();
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

  return (
    <header className="fixed inset-x-0 top-0 z-[200] isolate pt-2 sm:pt-3 md:pt-4">
      <div className="hidden xl:block">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between px-4 pb-4 pt-5 text-sm font-semibold text-white md:px-8 lg:px-12">
          <div className="flex items-center gap-8">
            {directEmailVisible ? (
              <a
                href={getPublicEmailHref()}
                className="inline-flex items-center gap-3 transition hover:text-[#86f556]"
              >
                <FaEnvelope className="text-[#86f556]" />
                {siteConfig.email}
              </a>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 transition hover:text-[#86f556]"
              >
                <FaEnvelope className="text-[#86f556]" />
                Contact for email details
              </Link>
            )}
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
                Contact for direct number
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
        <div
          className={`rounded-[1.5rem] border border-white/80 bg-white transition-all duration-300 md:rounded-[2rem] ${
            isScrolled
              ? "shadow-[0_26px_70px_rgba(12,18,14,0.24)]"
              : "shadow-[0_18px_48px_rgba(12,18,14,0.18)]"
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-3 py-3.5 sm:px-5 md:px-7 md:py-4 lg:gap-5 lg:px-8 xl:grid xl:grid-cols-[16rem_minmax(0,1fr)_23rem] xl:items-center xl:gap-6 2xl:grid-cols-[18rem_minmax(0,1fr)_25rem]">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex min-w-0 shrink items-center gap-3"
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
                <p className="truncate font-heading text-sm font-black tracking-tight text-[#132117] sm:text-base md:text-lg">
                  HydroNexfarm
                </p>
                <p className="truncate text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#79d84a] sm:text-[0.68rem]">
                  Hydroponics, battery, and aluminum supply
                </p>
              </div>
            </Link>

            <nav className="hidden min-w-0 items-center justify-center gap-4 xl:flex 2xl:gap-7">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);

                return (
                  <div key={link.label} className="relative shrink-0">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 whitespace-nowrap text-[0.92rem] font-semibold transition 2xl:text-lg ${
                        isActive ? "text-[#79d84a]" : "text-[#151b12] hover:text-[#79d84a]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </div>
                );
              })}
            </nav>

            <div className="hidden shrink-0 items-center justify-end gap-2 xl:flex 2xl:gap-3">
              <BasketButton />
              {quickActionExternal ? (
                <a
                  href={quickActionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#86f556] px-5 py-3 text-sm font-bold text-[#132117] transition hover:bg-[#73e543] 2xl:gap-3 2xl:px-8 2xl:py-4 2xl:text-lg"
                >
                  <FaWhatsapp />
                  <span>{whatsappVisible ? "Quick Order" : "Start Inquiry"}</span>
                </a>
              ) : (
                <Link
                  href={quickActionHref}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#86f556] px-5 py-3 text-sm font-bold text-[#132117] transition hover:bg-[#73e543] 2xl:gap-3 2xl:px-8 2xl:py-4 2xl:text-lg"
                >
                  <FaWhatsapp />
                  <span>Start Inquiry</span>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2 xl:hidden">
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
                className="max-h-[calc(100svh-5.5rem)] overflow-y-auto border-t border-[#edf2e7] bg-white xl:hidden"
              >
                <div className="flex flex-col gap-2 px-4 py-4 sm:px-5">
                  {navLinks.map((link) => (
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

                  <div className="mt-2 rounded-[1.4rem] bg-[#f7f8f1] p-4 text-sm text-[#58636f]">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#79d84a]">
                      Buyer support
                    </p>
                    <p className="mt-3 leading-7">
                      Share product choice, quantity, and city to start a cleaner order or quote flow.
                    </p>
                  </div>

                  <div className="pt-2" onClick={() => setIsOpen(false)}>
                    <BasketButton />
                  </div>

                  {quickActionExternal ? (
                    <a
                      href={quickActionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-[#86f556] px-6 py-3 font-bold text-[#132117] transition hover:bg-[#73e543]"
                    >
                      <FaWhatsapp />
                      {whatsappVisible ? "Quick Order" : "Start Inquiry"}
                    </a>
                  ) : (
                    <Link
                      href={quickActionHref}
                      onClick={() => setIsOpen(false)}
                      className="mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-[#86f556] px-6 py-3 font-bold text-[#132117] transition hover:bg-[#73e543]"
                    >
                      <FaWhatsapp />
                      Start Inquiry
                    </Link>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
