"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { storeCategories } from "@/data/store-catalog";
import { getCategoryPath, getCategoryProductCount } from "@/lib/store";

export function ShopCategories() {
  return (
    <section id="categories" className="bg-white py-14 sm:py-16 md:py-22 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#84dd58]">
              Shop by category
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-[#183109] sm:text-4xl md:text-5xl">
              Product categories built for faster shortlisting
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#6f7988] sm:text-base sm:leading-8">
            Each category leads into products, variants, and structured order or quote steps instead of acting like a one-way brochure section.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2">
          {storeCategories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group relative isolate min-h-[18rem] overflow-hidden rounded-[1.7rem] bg-[#17310d] shadow-[0_24px_60px_rgba(18,28,18,0.12)] sm:min-h-[20rem] sm:rounded-[2rem]"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,16,0.18)_0%,rgba(12,20,16,0.42)_46%,rgba(12,20,16,0.85)_100%)]" />

              <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6 md:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex w-fit rounded-full bg-[#86f556] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#132117]">
                    {category.tag}
                  </span>
                  <span className="inline-flex rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white">
                    {getCategoryProductCount(category.slug)} products
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-black text-white sm:text-3xl">{category.name}</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white/80 sm:leading-7 md:text-base">
                  {category.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-white/16 bg-black/14 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/78"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                <Link
                  href={getCategoryPath(category)}
                  className="mt-6 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#86f556]"
                >
                  Explore category
                  <FaArrowRight className="transition group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
