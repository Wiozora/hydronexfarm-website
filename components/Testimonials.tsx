"use client";

import { FaStar } from "react-icons/fa";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { testimonials } from "@/data/testimonials";

import "swiper/css";
import "swiper/css/pagination";

export function Testimonials() {
  const hasSampleContent = testimonials.some((testimonial) => testimonial.isSample);

  return (
    <section id="testimonials" className="bg-[#deefd9] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label inline-flex border-l-0 border-none pl-0 text-green-dark">
            Testimonials
          </p>
          <h2 className="text-3xl font-black text-primary md:text-4xl">
            Buyer feedback snapshots
          </h2>
          <p className="mt-6 text-base leading-8 text-text-muted md:text-lg">
            This section is ready for client feedback, use-case reviews, and delivery success notes as real buyer comments are collected.
          </p>
          {hasSampleContent ? (
            <div className="mt-5 inline-flex rounded-full border border-[#b7cf8b] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#5c953f]">
              Sample review content for now
            </div>
          ) : null}
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            loop
            className="pb-14"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={`${testimonial.name}-${testimonial.product}`}>
                <div className="rounded-[2rem] border border-primary/8 bg-white p-8 text-center text-primary shadow-sm md:p-12">
                  <p className="text-6xl text-green/25">&ldquo;</p>
                  <div className="mt-3 flex justify-center gap-1">
                    {Array.from({ length: testimonial.stars }).map((_, index) => (
                      <FaStar key={`${testimonial.name}-${index}`} className="text-green-dark" />
                    ))}
                  </div>
                  <p className="mt-8 text-xl leading-9 text-text-dark md:text-2xl">
                    {testimonial.text}
                  </p>
                  <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-green-dark/80">
                    {testimonial.product}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{testimonial.name}</h3>
                  <p className="mt-2 text-text-muted">{testimonial.location}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
