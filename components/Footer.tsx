"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import {
  hasPublicEmail,
  hasPublicPhone,
  hasPublicSocialLink,
  hasPublicWhatsApp,
  siteConfig,
} from "@/lib/site-config";
import { getWhatsAppEntryLink, shouldOpenWhatsAppInNewTab } from "@/lib/whatsapp";

export function Footer() {
  const visibleSocialLinks = [
    { href: siteConfig.socials.facebook, icon: FaFacebookF, label: "Facebook" },
    { href: siteConfig.socials.instagram, icon: FaInstagram, label: "Instagram" },
    { href: siteConfig.socials.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
    { href: siteConfig.socials.youtube, icon: FaYoutube, label: "YouTube" },
  ].filter((item) => hasPublicSocialLink(item.href));

  const contactItems = [
    hasPublicPhone()
      ? { label: "Direct phone", value: siteConfig.displayPhone }
      : null,
    hasPublicEmail()
      ? { label: "Email address", value: siteConfig.email }
      : null,
    { label: "Service area", value: siteConfig.address },
  ].filter(Boolean) as { label: string; value: string }[];

  const quickActionLabel = hasPublicWhatsApp() ? "Order on WhatsApp" : "Open inquiry form";
  const quickActionHref = getWhatsAppEntryLink();
  const quickActionExternal = shouldOpenWhatsAppInNewTab();

  return (
    <footer className="bg-[#101814] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-16 lg:px-12">
        <div className="grid gap-8 border-b border-white/10 pb-10 sm:gap-10 sm:pb-12 lg:grid-cols-[1.2fr_0.85fr_0.9fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-white/8">
                <Image src={siteConfig.logo} alt={siteConfig.storeName} fill className="object-contain p-1" />
              </div>
              <div>
                <p className="font-heading text-2xl font-black">HydroNexfarm</p>
                <p className="text-xs uppercase tracking-[0.28em] text-[#86f556]">Pakistan</p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/72 sm:mt-6 sm:text-base sm:leading-8">
              Explore hydroponics systems, nutrients, aluminum accessories, battery boxes, and wall brackets from one cleaner product-focused buying flow.
            </p>

            {quickActionExternal ? (
              <a
                href={quickActionHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#86f556] px-6 py-3 font-bold text-[#132117] transition hover:bg-[#73e543]"
              >
                <FaWhatsapp />
                {quickActionLabel}
              </a>
            ) : (
              <Link
                href={quickActionHref}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#86f556] px-6 py-3 font-bold text-[#132117] transition hover:bg-[#73e543]"
              >
                <FaWhatsapp />
                {quickActionLabel}
              </Link>
            )}
          </div>

          <div>
            <h3 className="text-xl font-black">Shop</h3>
            <div className="mt-5 space-y-4 text-white/76">
              {[
                { label: "All Products", href: "/shop" },
                { label: "Hydroponics Systems", href: "/shop/hydroponics-systems" },
                { label: "Nutrients", href: "/shop/nutrients" },
                { label: "Aluminum Accessories", href: "/shop/aluminum-accessories" },
                { label: "Battery Solutions", href: "/shop/battery-solutions" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="block transition hover:text-[#86f556]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black">Support</h3>
            <div className="mt-5 space-y-4 text-white/76">
              {[
                { label: "Inquiry Basket", href: "/inquiry" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-and-conditions" },
                { label: "Refund / Warranty", href: "/refund-policy" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="block transition hover:text-[#86f556]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black">Contact</h3>
            <div className="mt-5 space-y-5 text-sm sm:text-base">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 text-white/76">
                  <FaMapMarkerAlt className="mt-1 text-[#86f556]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">
                      {item.label}
                    </p>
                    <span>{item.value}</span>
                  </div>
                </div>
              ))}
              {!hasPublicPhone() && !hasPublicEmail() ? (
                <div className="rounded-[1.2rem] border border-white/10 bg-white/6 px-4 py-3 text-white/72">
                  Direct phone and email can stay private for now. Buyers can still use the inquiry form to start the conversation.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-6 text-center text-sm text-white/72 md:flex-row md:text-left">
          <p>All rights reserved (c) 2026 HydroNexfarm</p>
          {visibleSocialLinks.length > 0 ? (
            <div className="flex items-center gap-4">
              {visibleSocialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 transition hover:border-[#86f556] hover:text-[#86f556]"
                >
                  <item.icon />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-white/46 md:text-right">
              Social links can be published later
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
