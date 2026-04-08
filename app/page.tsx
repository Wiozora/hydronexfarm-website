import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { HomePageSections } from "@/components/sections/HomePageSections";

export const metadata: Metadata = {
  title: "I CAN ENERGIES | Battery Cases, Hydroponics Systems, and T & V-Slots",
  description:
    'Browse 19" battery cases, hydroponics systems, and T & V-Slot aluminum accessories with WhatsApp inquiry support.',
  keywords: [
    '19" battery box Pakistan',
    "V slot aluminum Pakistan",
    "hydroponics system Pakistan",
    "I CAN ENERGIES",
    "M/S I CAN ENERGIES Pvt. Ltd.",
  ],
};

export default function Home() {
  return (
    <SiteShell>
      <HomePageSections />
    </SiteShell>
  );
}
