'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  delay?: number;
}

export function StatCard({ icon: Icon, value, label, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white/95 backdrop-blur-md border border-white/20 p-6 rounded-[2rem] flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:border-[var(--color-primary-green)]/50 shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-green)]/10 flex items-center justify-center shrink-0">
        <Icon className="w-7 h-7 text-[var(--color-primary-green)]" />
      </div>
      <div className="text-center sm:text-left">
        <div className="stat-number text-3xl mb-1">{value}</div>
        <div className="text-sm text-gray-600 font-bold tracking-wide uppercase">{label}</div>
      </div>
    </motion.div>
  );
}
