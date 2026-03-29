"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaLeaf } from "react-icons/fa";

const posts = [
  {
    title: "Hydroponics setup cost in Pakistan - what affects the budget?",
    date: "March 15, 2026",
    readTime: "5 min read",
    category: "Guide",
    excerpt: "A practical overview of frame size, lighting, nutrient flow, and support factors that shape total setup pricing.",
  },
  {
    title: "Which crops grow best in vertical plantation systems?",
    date: "February 22, 2026",
    readTime: "4 min read",
    category: "Growing",
    excerpt: "Leafy greens, herbs, and short-cycle crops usually perform best when the system layout and light coverage are balanced correctly.",
  },
  {
    title: "Why aluminum profiles matter in hydroponics structures",
    date: "January 10, 2026",
    readTime: "6 min read",
    category: "Components",
    excerpt: "Imported structural accessories improve alignment, strength, and long-term serviceability in commercial and residential frames.",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Latest Insights
          </span>
          <h2 className="mt-5 text-4xl font-black text-text-dark md:text-5xl">
            Hydroponics guides, product updates, and practical buying notes
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-[2rem] bg-bg-light p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-52 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-green/35 to-white text-primary">
                <FaLeaf className="text-6xl" />
              </div>

              <div className="mt-6">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {post.category}
                </span>
                <p className="mt-4 text-sm text-text-muted">
                  {post.date} • {post.readTime}
                </p>
                <h3 className="mt-4 text-2xl font-bold leading-tight text-text-dark">
                  {post.title}
                </h3>
                <p className="mt-4 leading-7 text-text-muted">{post.excerpt}</p>
                <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read More
                  <FaArrowRight />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
