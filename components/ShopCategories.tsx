"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { storeCategories } from "@/data/store-catalog";
import { getCategoryPath } from "@/lib/store";

export function ShopCategories() {
  return (
    <section id="categories" className="bg-white py-14 sm:py-16 md:py-22 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
          {storeCategories.map((category, index) => (
            <motion.article
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
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={95}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,16,0.18)_0%,rgba(12,20,16,0.42)_46%,rgba(12,20,16,0.85)_100%)]" />
              <Link
                href={getCategoryPath(category)}
                className="absolute right-5 top-5 z-20 inline-flex w-fit rounded-full bg-[#86f556] px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#132117] shadow-[0_12px_28px_rgba(132,221,88,0.28)] transition duration-300 hover:scale-[1.02] hover:bg-[#97ff6f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5ffc0] sm:right-6 sm:top-6"
              >
                {category.tag}
              </Link>

              <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6 md:p-7">
                <h3 className="text-2xl font-black text-white sm:text-3xl">{category.name}</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white/80 sm:leading-7 md:text-base">
                  {category.description}
                </p>
                <Link
                  href={getCategoryPath(category)}
                  className="mt-6 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-[#86f556]"
                >
                  Browse category
                  <FaArrowRight className="transition group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
