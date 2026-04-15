"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight, FaQuoteLeft, FaStar } from "react-icons/fa";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

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
  const compact = variant === "compact";
  const paginationId = `testimonials-pagination-${useId().replace(/:/g, "")}`;
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const hasMultipleSlides = resolvedItems.length > 1;

  if (resolvedItems.length === 0) {
    return null;
  }

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

        <div className={`${compact ? "mt-8 max-w-4xl" : "mt-10 max-w-5xl"} mx-auto`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-medium text-[#5a6a62]">
              {hasMultipleSlides ? "Swipe or use the arrows to move through buyer stories." : "Buyer feedback from this range."}
            </p>

            {hasMultipleSlides ? (
              <div className="flex items-center gap-3 self-start md:self-auto">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => swiper?.slidePrev()}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#cfe1c6] bg-white text-[#183109] shadow-[0_12px_28px_rgba(18,31,12,0.08)] transition hover:border-[#84dd58] hover:text-[#5aa432]"
                >
                  <FaArrowLeft />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => swiper?.slideNext()}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#cfe1c6] bg-white text-[#183109] shadow-[0_12px_28px_rgba(18,31,12,0.08)] transition hover:border-[#84dd58] hover:text-[#5aa432]"
                >
                  <FaArrowRight />
                </button>
              </div>
            ) : null}
          </div>

          <Swiper
            modules={[A11y, Autoplay, Pagination]}
            slidesPerView={1}
            speed={700}
            spaceBetween={24}
            allowTouchMove={hasMultipleSlides}
            watchOverflow
            autoHeight
            loop={hasMultipleSlides}
            autoplay={
              hasMultipleSlides
                ? {
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            pagination={
              hasMultipleSlides
                ? {
                    clickable: true,
                    el: `#${paginationId}`,
                  }
                : false
            }
            onSwiper={setSwiper}
            className="testimonials-slider mt-8 !overflow-visible"
          >
            {resolvedItems.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="!h-auto">
                <article
                  className={`h-full rounded-[2.2rem] border border-[#dfe7d8] bg-white text-primary shadow-[0_24px_60px_rgba(20,28,18,0.08)] ${
                    compact ? "p-6 md:p-7" : "p-6 md:p-8 lg:p-10"
                  }`}
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[1.4rem] border border-[#dbe5d4] bg-[#edf5e7] shadow-[0_10px_28px_rgba(20,28,18,0.08)] sm:h-28 sm:w-24">
                        <Image
                          src={testimonial.portrait ?? "/logo.png"}
                          alt={testimonial.portraitAlt ?? testimonial.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                          style={
                            testimonial.portraitPosition
                              ? { objectPosition: testimonial.portraitPosition }
                              : undefined
                          }
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="inline-flex rounded-full bg-[#eff8e7] px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#5c953f]">
                          Buyer rating
                        </p>
                        <h3 className="mt-3 max-w-2xl text-xl font-black leading-tight text-[#183109] md:text-[1.7rem]">
                          {testimonial.highlight}
                        </h3>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#16300d] px-4 py-2.5 text-[#95f06b] shadow-[0_14px_30px_rgba(21,43,10,0.18)]">
                      {Array.from({ length: testimonial.stars }).map((_, index) => (
                        <FaStar key={`${testimonial.id}-${index}`} className="text-sm sm:text-base" />
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 rounded-[1.7rem] border border-[#edf2e7] bg-[#f8fbf4] p-5 md:p-7">
                    <FaQuoteLeft className="text-lg text-[#84dd58]" />
                    <p className="mt-4 text-[1.1rem] leading-8 text-[#243026] md:text-[1.35rem] md:leading-9">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-5 border-t border-[#edf2e7] pt-6 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h4 className="text-2xl font-black text-[#183109]">{testimonial.name}</h4>
                      <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-[#72806f]">
                        {testimonial.location}
                      </p>
                    </div>

                    <div className="rounded-[1.3rem] border border-[#e4eadc] bg-[#f9fbf6] px-4 py-3">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#84dd58]">
                        Related product
                      </p>
                      <p className="mt-2 text-sm font-semibold text-[#183109]">{testimonial.product}</p>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {hasMultipleSlides ? (
            <div
              id={paginationId}
              className="testimonials-pagination mt-8 flex items-center justify-center gap-3"
              aria-label="Choose testimonial slide"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
