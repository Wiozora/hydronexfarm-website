import { FaArrowRight, FaEnvelope } from "react-icons/fa";

import { PageHero } from "@/components/PageHero";
import { PolicyDocument } from "@/components/PolicyDocument";
import type { PolicyDocument as PolicyDocumentData } from "@/data/policies";

type LegalPageSectionsProps = {
  document: PolicyDocumentData;
  breadcrumbLabel: string;
  backgroundContext: string;
};

export function LegalPageSections({
  document,
  breadcrumbLabel,
  backgroundContext,
}: LegalPageSectionsProps) {
  return (
    <>
      <PageHero
        eyebrow={document.eyebrow}
        title={document.title}
        description={document.description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: breadcrumbLabel }]}
        backgroundContext={backgroundContext}
        quickActions={[
          {
            label: "Request Quote",
            href: "/contact",
            icon: FaEnvelope,
          },
          {
            label: "View Details",
            href: "/shop",
            icon: FaArrowRight,
            variant: "secondary",
          },
        ]}
      />
      <PolicyDocument document={document} />
    </>
  );
}
