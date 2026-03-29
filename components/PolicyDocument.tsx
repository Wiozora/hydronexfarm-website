import type { PolicyDocument as PolicyDocumentType } from "@/data/policies";

export function PolicyDocument({ document }: { document: PolicyDocumentType }) {
  return (
    <section className="bg-[#f7f8f1] py-14 sm:py-16 md:py-22 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <div className="rounded-[2rem] border border-[#e6ebde] bg-white p-6 shadow-[0_22px_55px_rgba(16,23,18,0.06)] sm:p-8 md:p-10">
          <div className="inline-flex rounded-full bg-[#eff8e7] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#5c953f]">
            {document.updatedLabel}
          </div>
          <p className="mt-5 text-base leading-8 text-[#6f7988]">{document.description}</p>

          <div className="mt-8 space-y-8">
            {document.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-black text-[#183109]">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-[#6f7988] sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[#183109] sm:text-base">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#86f556]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
