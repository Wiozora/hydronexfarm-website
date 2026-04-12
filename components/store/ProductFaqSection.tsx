import type { ProductFaq } from "@/types";

export function ProductFaqSection({
  faqs,
  title = "Questions buyers usually ask before they contact us",
}: {
  faqs: ProductFaq[];
  title?: string;
}) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-18 md:py-22 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
            Product FAQ
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-[#183109] md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-8 text-[#6f7988]">
            Clear answers reduce hesitation and help buyers move toward the right next step faster.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[1.7rem] border border-[#e6ebde] bg-[#f7f8f1] p-6 shadow-[0_18px_45px_rgba(16,23,18,0.05)]"
            >
              <h3 className="text-xl font-black text-[#183109]">{faq.question}</h3>
              <p className="mt-4 text-sm leading-7 text-[#6f7988] sm:text-base sm:leading-8">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
