import { FaStar } from "react-icons/fa";

import { testimonials, type Testimonial } from "@/data/testimonials";
import { getTestimonialsByIds } from "@/lib/store";

type TestimonialsProps = {
  eyebrow?: string;
  ids?: string[];
  intro?: string;
  items?: Testimonial[];
  title?: string;
  variant?: "compact" | "default";
};

export function Testimonials({
  eyebrow = "Testimonials",
  ids,
  intro = "Proof from recent buyers helps new customers understand what felt clear, trustworthy, and easy during the purchase journey.",
  items,
  title = "Buyer feedback snapshots",
  variant = "default",
}: TestimonialsProps) {
  const resolvedItems = items ?? (ids?.length ? getTestimonialsByIds(ids) : testimonials);

  if (resolvedItems.length === 0) {
    return null;
  }

  const compact = variant === "compact";

  return (
    <section className={compact ? "bg-[#f7f8f1] py-18 md:py-22 lg:py-24" : "bg-[#deefd9] py-16 md:py-24"}>
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className={compact ? "max-w-3xl" : "mx-auto max-w-3xl text-center"}>
          <p className="section-label inline-flex border-l-0 border-none pl-0 text-green-dark">
            {eyebrow}
          </p>
          <h2 className={compact ? "text-3xl font-black text-[#183109] md:text-4xl" : "text-3xl font-black text-primary md:text-4xl"}>
            {title}
          </h2>
          <p className={compact ? "mt-5 text-base leading-8 text-[#6f7988]" : "mt-6 text-base leading-8 text-text-muted md:text-lg"}>
            {intro}
          </p>
        </div>

        <div className={compact ? "mt-10 grid gap-6 md:grid-cols-2" : "mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"}>
          {resolvedItems.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-[2rem] border border-primary/8 bg-white p-7 text-primary shadow-[0_18px_50px_rgba(20,28,18,0.08)]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full bg-[#eff8e7] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#5c953f]">
                  {testimonial.highlight}
                </span>
                <div className="flex items-center gap-1 text-[#5c953f]">
                  {Array.from({ length: testimonial.stars }).map((_, index) => (
                    <FaStar key={`${testimonial.id}-${index}`} />
                  ))}
                </div>
              </div>

              <p className="mt-6 text-lg leading-8 text-[#243026]">&ldquo;{testimonial.text}&rdquo;</p>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-green-dark/80">
                {testimonial.product}
              </p>
              <h3 className="mt-3 text-xl font-black text-[#183109]">{testimonial.name}</h3>
              <p className="mt-2 text-sm text-[#6f7988]">{testimonial.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
