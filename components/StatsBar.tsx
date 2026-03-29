"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaBolt, FaBoxOpen, FaLeaf, FaSeedling } from "react-icons/fa";

const stats = [
  { icon: FaSeedling, value: 500, suffix: "+", label: "Farms Installed" },
  { icon: FaBolt, value: 200, suffix: "+", label: "Energy Clients" },
  { icon: FaBoxOpen, value: 1000, suffix: "+", label: "Products Sold" },
  { icon: FaLeaf, value: 100, suffix: "%", label: "Organic Solutions" },
];

export function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="bg-bg-green py-8">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-primary/8 bg-white px-5 py-6 text-center text-primary shadow-sm transition-all hover:-translate-y-1 hover:border-green/20 hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green/10 text-2xl text-green-dark">
                <item.icon />
              </div>
              <div className="mt-4 text-3xl font-black">
                {inView ? <CountUp end={item.value} duration={2} /> : 0}
                {item.suffix}
              </div>
              <p className="mt-2 text-sm text-text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
