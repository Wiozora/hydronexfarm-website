"use client";

import { motion } from "framer-motion";
import { FaBolt, FaFlask, FaSeedling, FaTools, FaWrench } from "react-icons/fa";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const serviceCards = [
  {
    id: "hydroponics",
    icon: FaSeedling,
    title: "Hydroponics Systems",
    copy: "Professional vertical plantation systems for homes, rooftops, restaurants, and farms.",
    image: "/images/marketing/hydroponics-aisle-hero.webp",
  },
  {
    id: "frame-accessories",
    icon: FaTools,
    title: "Frame Accessories",
    copy: "Imported aluminum accessories and structural profiles for clean, durable installations.",
    image: "/images/marketing/industrial-fabrication-workshop.webp",
  },
  {
    id: "battery-boxes",
    icon: FaBolt,
    title: "Battery Boxes",
    copy: "Reliable enclosure solutions and wall brackets built for backup power systems.",
    image: "/images/marketing/electrical-installation-work.webp",
  },
  {
    id: "nutrient-solutions",
    icon: FaFlask,
    title: "Nutrient Solutions",
    copy: "Balanced A, B, bloom, and finishing formulas for every hydroponic growth stage.",
    image: "/images/marketing/hydroponics-greenhouse-rows.webp",
  },
  {
    id: "wall-brackets",
    icon: FaWrench,
    title: "Wall Mount Brackets",
    copy: "Heavy-duty 7U and 8U mounting brackets made for secure energy storage installations.",
    image: "/images/marketing/technical-site-support.webp",
  },
];

export function ServicesOverview() {
  return (
    <section id="products" className="relative overflow-hidden bg-[#f7f8f1] py-20 md:py-24 lg:py-28">
      <div className="absolute right-[10%] top-36 hidden h-3.5 w-3.5 rounded-full bg-[#7ef04d] lg:block" />

      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-[#8be857]">
            <FaBolt className="text-sm" />
            Our Services
          </p>

          <h2 className="mt-5 text-4xl font-black leading-none text-[#183109] md:text-6xl lg:text-[4.25rem]">
            <span className="mr-1 inline-flex items-center bg-[#3164d1] px-3 py-2 text-white md:px-4">
              Best
            </span>
            Offer For Renewable Energy
          </h2>
        </div>

        <div className="mt-16">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop
            speed={800}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".services-overview-pagination",
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 28,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="services-overview-slider"
          >
            {serviceCards.map((card, index) => (
              <SwiperSlide key={card.id} className="pb-2">
                <motion.article
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="group relative aspect-[405/487] w-full overflow-hidden rounded-[2rem] shadow-[0_26px_70px_rgba(20,28,18,0.08)]"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url("${card.image}")` }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,23,17,0.10)_0%,rgba(14,23,17,0.04)_38%,rgba(14,23,17,0.50)_100%)]" />

                  <div className="relative flex h-full flex-col p-5 lg:p-6">
                    <div className="flex justify-end">
                      <div className="flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-[1.45rem] bg-[#87ef58] text-[1.9rem] text-white shadow-[0_12px_30px_rgba(135,239,88,0.34)]">
                        <card.icon />
                      </div>
                    </div>

                    <div className="mt-auto w-[calc(100%-2.8rem)] rounded-[1.75rem] bg-white px-5 py-4 shadow-[0_18px_45px_rgba(17,25,16,0.12)] transition duration-300 group-hover:-translate-y-1 md:w-[calc(100%-3.2rem)]">
                      <h3 className="text-[1.55rem] font-black leading-tight text-[#20360f]">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-6 text-[#707c8f]">
                        {card.copy}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="services-overview-pagination mt-12 flex items-center justify-center gap-3"
            aria-label="Choose service slide"
          />
        </div>
      </div>
    </section>
  );
}
