"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const teamMembers = [
  {
    name: "Ahsan Raza",
    role: "Hydroponics Systems Engineer",
    image: "/images/team/team-ahsan-raza.webp",
    alt: "Ahsan Raza, Hydroponics Systems Engineer at I CAN ENERGIES",
  },
  {
    name: "Usman Tariq",
    role: "Project Sales Manager",
    image: "/images/team/team-usman-tariq.webp",
    alt: "Usman Tariq, Project Sales Manager at I CAN ENERGIES",
  },
  {
    name: "Sara Imran",
    role: "Operations Coordinator",
    image: "/images/team/team-sara-imran.webp",
    alt: "Sara Imran, Operations Coordinator at I CAN ENERGIES",
  },
  {
    name: "Hamza Ali",
    role: "Installation Specialist",
    image: "/images/team/team-hamza-ali.webp",
    alt: "Hamza Ali, Installation Specialist at I CAN ENERGIES",
  },
];

const socialIcons = [FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn];

export function TeamSection() {
  return (
    <section id="team" className="bg-bg-light py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label inline-flex border-l-0 border-none pl-0">Our Team</p>
          <h2 className="text-4xl font-black text-text-dark md:text-5xl">
            Meet The Renewable Experts
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="overflow-hidden rounded-[1.6rem] border border-black/6 bg-[#eef2e8] shadow-sm"
            >
              <div className="relative h-[285px]">
                <Image
                  src={member.image}
                  alt={member.alt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-[2rem] font-black leading-tight text-text-dark">
                  {member.name}
                </h3>
                <p className="mt-3 text-[1.15rem] text-text-muted">{member.role}</p>

                <div className="mt-8 border-t border-black/8 pt-7">
                  <div className="flex items-center gap-3">
                    {socialIcons.map((Icon, iconIndex) => (
                      <a
                        key={iconIndex}
                        href="#"
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-text-dark transition hover:bg-green hover:text-primary"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="mt-7 inline-flex items-center gap-4 text-[1.05rem] font-semibold text-text-dark"
                  >
                    <span>More Details</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">
                      <FaArrowRight />
                    </span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
