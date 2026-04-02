import type { ReactNode } from "react";

import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <main className="overflow-hidden">
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
    </main>
  );
}
