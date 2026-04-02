import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { HomePageSections } from "@/components/sections/HomePageSections";

export const metadata: Metadata = {
  title: "I CAN ENERGIES | Renewable Products and Fabrication Pakistan",
  description:
    "Browse hydroponics plantation towers, PaniPani pumps, nutrient plans, aluminum V/T slots, battery racks, and custom sheet metal products.",
  keywords: [
    "hydroponics plantation Pakistan",
    "PaniPani water pump Pakistan",
    "battery rack Pakistan",
    "barebone battery rack Pakistan",
    "V slot aluminum Pakistan",
    "sheet metal custom product Pakistan",
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
