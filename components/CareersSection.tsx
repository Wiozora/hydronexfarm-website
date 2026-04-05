"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const team = [
  {
    name: "Ahmad Raza",
    role: "CEO & Founder",
    img: "/images/team/team-ahsan-raza.webp",
    alt: "Ahmad Raza, CEO and Founder portrait",
  },
  {
    name: "Sara Khan",
    role: "Head Engineer",
    img: "/images/team/team-sara-imran.webp",
    alt: "Sara Khan, Head Engineer portrait",
  },
  {
    name: "Hassan Ali",
    role: "Solar Consultant",
    img: "/images/team/team-hamza-ali.webp",
    alt: "Hassan Ali, Solar Consultant portrait",
  },
  {
    name: "Fatima Malik",
    role: "Project Manager",
    img: "/images/team/team-usman-tariq.webp",
    alt: "Fatima Malik, Project Manager portrait",
  },
];

export function CareersSection() {
  return (
    <section id="team" className="bg-white section-padding">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Our Team
          </span>
          <h2 className="section-title centered mt-5">
            Meet the solar experts behind every project
          </h2>
          <p className="mt-8 text-lg leading-8 text-text-light">
            Our team brings design, engineering, project management, and client support together so every installation is planned and delivered with care.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group overflow-hidden rounded-[2rem] bg-white shadow-md"
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                <Image
                  src={member.img}
                  alt={member.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative px-6 pb-8 pt-6 text-center">
                <h3 className="text-2xl font-bold text-secondary">{member.name}</h3>
                <p className="mt-2 text-text-light">{member.role}</p>

                <div className="mt-6 flex translate-y-10 items-center justify-center gap-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {[FaLinkedinIn, FaTwitter, FaFacebookF].map((Icon, iconIndex) => (
                    <a
                      key={`${member.name}-${iconIndex}`}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white transition hover:bg-primary"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
