import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";

import { StoreBreadcrumbs, type BreadcrumbItem } from "@/components/store/StoreBreadcrumbs";
import { resolvePageHeroBackground } from "@/lib/page-hero";

export type PageHeroQuickAction = {
  label: string;
  href: string;
  icon?: IconType;
  variant?: "primary" | "secondary";
  external?: boolean;
};

type PageHeroProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  breadcrumbs?: BreadcrumbItem[];
  quickActions?: PageHeroQuickAction[];
  highlights?: string[];
  backgroundContext?: string;
  backgroundImage?: string;
};

export function PageHero({
  title,
  description,
  eyebrow,
  breadcrumbs = [],
  quickActions = [],
  highlights = [],
  backgroundContext,
  backgroundImage,
}: PageHeroProps) {
  const resolvedBackground = backgroundImage
    ? {
        image: backgroundImage,
        alt: `${title} page background`,
        objectPosition: "object-center",
      }
    : resolvePageHeroBackground({
        title,
        description,
        eyebrow,
        backgroundContext,
        breadcrumbs,
      });

  return (
    <section className="relative z-0 isolate overflow-hidden bg-[#071b0d] text-white">
      <div className="absolute inset-0">
        <Image
          src={resolvedBackground.image}
          alt={resolvedBackground.alt}
          fill
          priority
          sizes="100vw"
          className={`${resolvedBackground.objectPosition ?? "object-center"} object-cover`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,22,10,0.96)_0%,rgba(6,26,11,0.94)_34%,rgba(6,24,11,0.88)_64%,rgba(6,24,11,0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(134,245,86,0.16),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(134,245,86,0.08),transparent_22%)]" />
      </div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.08]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-[7rem] sm:px-6 sm:pb-10 sm:pt-[7.5rem] md:px-8 md:pb-12 md:pt-[8.25rem] lg:px-12 lg:pb-14 lg:pt-[8.75rem]">
        {breadcrumbs.length > 0 ? <StoreBreadcrumbs items={breadcrumbs} /> : null}

        <div
          className={`mt-5 grid gap-5 lg:mt-6 ${
            quickActions.length > 0 ? "lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-end" : ""
          }`}
        >
          <div className="max-w-4xl">
            {eyebrow ? (
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#86f556] sm:text-sm">
                {eyebrow}
              </p>
            ) : null}

            <h1 className="mt-3 max-w-[12ch] text-[clamp(2.65rem,6vw,4.4rem)] font-black leading-[0.92] tracking-[-0.05em] text-white">
              {title}
            </h1>

            {description ? (
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/82 sm:text-base md:text-[1.02rem]">
                {description}
              </p>
            ) : null}

            {highlights.length > 0 ? (
              <div className="mt-4 hidden flex-wrap gap-2.5 sm:flex">
                {highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-white/16 bg-white/8 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/88 backdrop-blur-sm"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            ) : null}

            {quickActions.length > 0 ? (
              <div className="mt-5 grid gap-2.5 lg:hidden">
                {quickActions.map((action) => {
                  const ActionIcon = action.icon;
                  const baseClasses =
                    action.variant === "secondary"
                      ? "border border-white/16 text-white hover:border-[#86f556] hover:text-[#86f556]"
                      : "bg-[#86f556] text-[#132117] hover:bg-[#73e543]";
                  const sharedClasses = `inline-flex w-full items-center justify-center gap-3 rounded-full px-4 py-3 text-sm font-bold transition ${baseClasses}`;

                  return action.external ? (
                    <a
                      key={`${action.label}-${action.href}-mobile`}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={sharedClasses}
                    >
                      {ActionIcon ? <ActionIcon /> : null}
                      <span>{action.label}</span>
                    </a>
                  ) : (
                    <Link
                      key={`${action.label}-${action.href}-mobile`}
                      href={action.href}
                      className={sharedClasses}
                    >
                      {ActionIcon ? <ActionIcon /> : null}
                      <span>{action.label}</span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>

          {quickActions.length > 0 ? (
            <aside className="hidden w-full max-w-xs justify-self-start rounded-[1.75rem] border border-white/10 bg-white/8 p-4 shadow-[0_22px_50px_rgba(8,18,12,0.22)] backdrop-blur-md lg:block lg:justify-self-end">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#86f556]">
                Quick actions
              </p>

              <div className="mt-4 space-y-2.5">
                {quickActions.map((action) => {
                  const ActionIcon = action.icon;
                  const baseClasses =
                    action.variant === "secondary"
                      ? "border border-white/16 text-white hover:border-[#86f556] hover:text-[#86f556]"
                      : "bg-[#86f556] text-[#132117] hover:bg-[#73e543]";
                  const sharedClasses = `inline-flex w-full items-center justify-center gap-3 rounded-full px-4 py-2.5 text-sm font-bold transition ${baseClasses}`;

                  return action.external ? (
                    <a
                      key={`${action.label}-${action.href}`}
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={sharedClasses}
                    >
                      {ActionIcon ? <ActionIcon /> : null}
                      <span>{action.label}</span>
                    </a>
                  ) : (
                    <Link
                      key={`${action.label}-${action.href}`}
                      href={action.href}
                      className={sharedClasses}
                    >
                      {ActionIcon ? <ActionIcon /> : null}
                      <span>{action.label}</span>
                    </Link>
                  );
                })}
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
