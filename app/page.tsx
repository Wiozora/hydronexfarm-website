import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { HomePageSections } from "@/components/sections/HomePageSections";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "I CAN ENERGIES | Battery Cases, Hydroponics Systems, and T & V-Slots",
  description:
    'Browse 19" battery cases, hydroponics systems, and T & V-Slot aluminum accessories with checkout and quote support.',
  path: "/",
});

export default function Home() {
  return (
    <SiteShell>
      <HomePageSections />
    </SiteShell>
  );
}
