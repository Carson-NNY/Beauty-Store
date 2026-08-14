"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import LineSidebar from "@/components/customer/line-sidebar";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { ServiceCard } from "@/components/customer/service-card";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { useLanguage } from "@/components/i18n/language-provider";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { getCustomerServices, getServiceCategoryLabel } from "@/lib/i18n";
import { groupServicesByCategory } from "@/modules/services/domain/service-catalog";
import type { PublicService, ServiceCategory } from "@/modules/services/domain/service";

export function ServicesPageContent({
  services: publicServices,
  servicesUnavailable = false,
}: {
  services: PublicService[];
  servicesUnavailable?: boolean;
}) {
  const { language, t } = useLanguage();
  const services = useMemo(() => getCustomerServices(publicServices, language), [language, publicServices]);
  const sections = useMemo(() => groupServicesByCategory(services).filter((section) => section.services.length > 0), [services]);
  const [activeIndex, setActiveIndex] = useState(0);
  const categoryLabels = sections.map(({ category }) => getServiceCategoryLabel(category, language));

  useEffect(() => {
    const sectionElements = sections
      .map(({ category }) => document.getElementById(`service-${category}`))
      .filter((element): element is HTMLElement => Boolean(element));
    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visibleEntry) return;
        const index = sectionElements.indexOf(visibleEntry.target as HTMLElement);
        if (index >= 0) setActiveIndex(index);
      },
      { rootMargin: "-20% 0px -60%", threshold: [0, 0.15, 0.4] },
    );

    sectionElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  function openCategory(index: number) {
    const category = sections[index]?.category;
    if (!category) return;
    setActiveIndex(index);
    document.getElementById(`service-${category}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="bg-[#f4f1eb]">
      <section className="border-b border-foreground/10 bg-[#17130f] text-[#f8f1e8]">
        <ScrollReveal className="container grid gap-8 py-14 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end" y={20} durationMs={600}>
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b879]">{t.services.eyebrow}</p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-normal sm:text-6xl">{t.services.title}</h1>
            <p className="max-w-2xl text-base leading-8 text-[#c9bbaa]">{t.services.description}</p>
          </div>
          <PendingLinkButton href="/book" size="lg" className="w-fit rounded-full bg-[#f8f1e8] px-7 text-[#17130f] hover:bg-white">
            {t.common.bookNow}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </PendingLinkButton>
        </ScrollReveal>
      </section>

      {sections.length > 0 ? (
        <div className="container py-8 sm:py-14">
          <div className="sticky top-16 z-20 -mx-4 border-y border-foreground/10 bg-[#f4f1eb]/95 px-4 py-3 backdrop-blur lg:hidden">
            <p className="sr-only">{t.services.navigation}</p>
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categoryLabels.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => openCategory(index)}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className={`min-h-11 shrink-0 cursor-pointer rounded-full border px-4 text-sm font-medium transition-colors ${
                    activeIndex === index
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-foreground/15 bg-[#faf7f0] text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-12 pt-5 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 lg:pt-0">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent/80">{t.services.navigation}</p>
                <LineSidebar
                  items={categoryLabels}
                  activeIndex={activeIndex}
                  onItemClick={openCategory}
                  accentColor="#8b5e45"
                  textColor="#62584f"
                  markerColor="#b9ab9e"
                  markerLength={46}
                  maxShift={14}
                />
              </div>
            </aside>

            <div className="min-w-0 space-y-24">
              {sections.map(({ category, services: categoryServices }, sectionIndex) => (
                <section key={category} id={`service-${category}`} className="scroll-mt-36 lg:scroll-mt-28" aria-labelledby={`heading-${category}`}>
                  <ScrollReveal className="mb-9 border-b border-foreground/15 pb-6" y={18} durationMs={550}>
                    <p className="font-mono text-xs text-accent/80">{String(sectionIndex + 1).padStart(2, "0")}</p>
                    <div className="mt-3 grid gap-3 xl:grid-cols-[0.8fr_1fr] xl:items-end">
                      <h2 id={`heading-${category}`} className="font-serif text-3xl font-semibold tracking-normal sm:text-4xl">
                        {getServiceCategoryLabel(category, language)}
                      </h2>
                      <p className="max-w-2xl leading-7 text-muted-foreground xl:justify-self-end">
                        {getSectionDescription(category, t.services.sectionDescriptions)}
                      </p>
                    </div>
                    {category === "weight-management" ? (
                      <p className="mt-4 max-w-2xl rounded-lg border border-foreground/10 bg-white/45 px-4 py-3 text-sm leading-6 text-muted-foreground xl:ml-auto">
                        {t.services.weightManagementNotice}
                      </p>
                    ) : null}
                  </ScrollReveal>
                  <div className="grid gap-x-8 gap-y-14 xl:grid-cols-2">
                    {categoryServices.map((service, index) => (
                      <ScrollReveal key={service.id} delayMs={Math.min(index, 3) * 70} y={24} durationMs={650}>
                        <ServiceCard service={service} />
                      </ScrollReveal>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container py-14">
          <div className="rounded-lg border border-foreground/10 bg-[#fdfbf6] px-5 py-6 text-sm leading-7 text-muted-foreground">
            {servicesUnavailable ? "Services are temporarily unavailable. Please call the studio for current options." : "No services are available right now."}
          </div>
        </div>
      )}
      <MobileActionBar />
    </main>
  );
}

function getSectionDescription(
  category: ServiceCategory,
  descriptions: { facial: string; scalp: string; body: string; weightManagement: string; hairRemoval: string; package: string },
) {
  if (category === "hair-removal") return descriptions.hairRemoval;
  if (category === "weight-management") return descriptions.weightManagement;
  return descriptions[category];
}
