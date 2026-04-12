import Link from "next/link";

import type { ProductTrustHighlight } from "@/types";

export function ProductTrustHighlights({
  highlights,
  variant = "compact",
}: {
  highlights: ProductTrustHighlight[];
  variant?: "compact" | "section";
}) {
  if (highlights.length === 0) {
    return null;
  }

  if (variant === "compact") {
    return (
      <div className="mt-6 grid gap-3">
        {highlights.map((highlight) => (
          <div
            key={highlight.title}
            className="rounded-[1.3rem] border border-white/10 bg-black/14 p-4"
          >
            <p className="text-sm font-black text-white">{highlight.title}</p>
            <p className="mt-2 text-sm leading-6 text-white/72">{highlight.detail}</p>
            {highlight.href && highlight.linkLabel ? (
              <Link
                href={highlight.href}
                className="mt-3 inline-flex text-xs font-bold uppercase tracking-[0.18em] text-[#86f556]"
              >
                {highlight.linkLabel}
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="bg-[#102412] py-18 md:py-22 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
            Buyer confidence
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-white md:text-5xl">
            Practical reasons buyers move forward with this product
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="rounded-[1.7rem] border border-white/10 bg-white/6 p-6 text-white shadow-[0_18px_45px_rgba(8,18,12,0.16)]"
            >
              <h3 className="text-xl font-black">{highlight.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                {highlight.detail}
              </p>
              {highlight.href && highlight.linkLabel ? (
                <Link
                  href={highlight.href}
                  className="mt-4 inline-flex text-sm font-bold uppercase tracking-[0.18em] text-[#86f556]"
                >
                  {highlight.linkLabel}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
