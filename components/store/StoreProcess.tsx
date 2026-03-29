import { FaClipboardList, FaLayerGroup, FaSearch } from "react-icons/fa";

const steps = [
  {
    title: "Browse by category",
    copy: "Start from hydroponics, nutrients, aluminum accessories, or battery solutions instead of scrolling through mixed sections.",
    icon: FaSearch,
  },
  {
    title: "Open the product page",
    copy: "Review images, descriptions, features, benefits, specifications, and selectable variants before making a decision.",
    icon: FaLayerGroup,
  },
  {
    title: "Cart or quote basket",
    copy: "Fixed-price systems go to cart. Quote-only products go to the quote basket. Both can be sent together on WhatsApp.",
    icon: FaClipboardList,
  },
];

export function StoreProcess() {
  return (
    <section className="bg-white py-14 sm:py-16 md:py-22 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
              Better buying flow
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-[#183109] sm:text-4xl md:text-5xl">
              A simpler path from product page to final inquiry
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#6f7988] sm:text-base sm:leading-8">
            The catalog stays product-first while still keeping WhatsApp or inquiry follow-up as the final sales step.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-[1.7rem] border border-[#e6ebde] bg-[#f7f8f1] p-5 shadow-[0_18px_45px_rgba(16,23,18,0.05)] sm:rounded-[2rem] sm:p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#86f556]/15 text-[#20360f]">
                <step.icon className="text-lg" />
              </div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#84dd58]">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-xl font-black text-[#183109] sm:text-2xl">{step.title}</h3>
              <p className="mt-4 text-sm leading-6 text-[#6f7988] sm:leading-7 md:text-base">{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
