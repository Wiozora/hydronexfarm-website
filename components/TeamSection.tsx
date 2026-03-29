"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const teamMembers = [
  {
    name: "Ahsan Raza",
    role: "Hydroponics Systems Engineer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900",
  },
  {
    name: "Usman Tariq",
    role: "Project Sales Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900",
  },
  {
    name: "Sara Imran",
    role: "Operations Coordinator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900",
  },
  {
    name: "Hamza Ali",
    role: "Installation Specialist",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900",
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
                  alt={member.name}
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
