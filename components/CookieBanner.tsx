"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { storageKeys } from "@/lib/site-config";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKeys.cookies);
    if (!stored) {
      const timer = window.setTimeout(() => setVisible(true), 600);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function accept() {
    window.localStorage.setItem(storageKeys.cookies, "accepted");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          className="fixed bottom-20 left-0 right-0 z-[125] p-4 sm:bottom-0"
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 rounded-[1.5rem] border border-[var(--color-border)] bg-white p-4 shadow-[0_-14px_36px_rgba(12,28,45,0.1)] sm:p-5 md:flex-row md:items-center md:justify-between md:rounded-[1.8rem]">
            <div>
              <h4 className="text-lg font-semibold text-primary">Cookies & privacy</h4>
              <p className="mt-1 text-sm leading-6 text-text-muted">
                We use lightweight cookies to remember preferences and keep the I CAN ENERGIES experience smooth.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="rounded-full border border-[var(--color-border)] px-4 py-2.5 text-sm font-semibold text-text-muted transition hover:border-slate-300 hover:bg-slate-50"
                onClick={accept}
                type="button"
              >
                Manage later
              </button>
              <button
                className="rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
                onClick={accept}
                type="button"
              >
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

