"use client";

import { Home } from "lucide-react";
import { EditorialHero } from "@/components/customer/editorial-hero";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { ServiceCard } from "@/components/customer/service-card";
import CircularGallery from "@/components/effects/circular-gallery";
import { ScrollFloat } from "@/components/effects/scroll-float";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { ScrollVelocity } from "@/components/effects/scroll-velocity";
import { useLanguage } from "@/components/i18n/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { getCustomerServices, getWorkShowcaseItems } from "@/lib/i18n";
import type { PublicService } from "@/modules/services/domain/service";

export function HomePageContent({
  featuredServices,
  servicesUnavailable = false,
}: {
  featuredServices: PublicService[];
  servicesUnavailable?: boolean;
}) {
  const { language, t } = useLanguage();
  const previewServices = getCustomerServices(featuredServices, language);
  const workShowcaseItems = getWorkShowcaseItems(language);

  return (
    <main>
      <EditorialHero />

      <section className="overflow-hidden bg-[#090806] py-14 text-[#f8f1e8] sm:py-20">
        <div className="container space-y-8">
          <ScrollReveal className="grid gap-4 lg:grid-cols-[0.82fr_1fr] lg:items-end" y={20} durationMs={600}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#d8b879]">{t.home.workEyebrow}</p>
              <ScrollFloat
                containerClassName="mt-3 font-serif text-4xl font-semibold leading-tight tracking-normal sm:text-5xl"
                textClassName="leading-tight"
                animationDuration={1}
                stagger={0.03}
              >
                {t.home.workTitle}
              </ScrollFloat>
            </div>
            <p className="max-w-2xl text-base leading-8 text-[#c9bbaa] lg:justify-self-end">
              {t.home.workDescription}
            </p>
          </ScrollReveal>
        </div>
        <div className="relative mt-8 h-[420px] sm:h-[560px]">
          <CircularGallery
            items={workShowcaseItems}
            bend={1}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.05}
            font='600 30px Georgia, "Times New Roman", serif'
            scrollSpeed={2}
          />
        </div>
      </section>

      <section className="bg-[#faf7f0] py-14 sm:py-20">
        <div className="container space-y-10">
          <ScrollReveal className="flex items-end justify-between gap-4" y={20} durationMs={600}>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">{t.home.servicesEyebrow}</p>
              <ScrollFloat
                containerClassName="mt-3 font-serif text-4xl font-semibold leading-tight tracking-normal sm:text-5xl"
                textClassName="leading-tight"
                animationDuration={1}
                stagger={0.03}
              >
                {t.home.servicesTitle}
              </ScrollFloat>
            </div>
            <PendingLinkButton href="/services" variant="outline" className="hidden rounded-full border-foreground/15 bg-transparent px-5 sm:inline-flex">
              {t.home.allServices}
            </PendingLinkButton>
          </ScrollReveal>
          {previewServices.length > 0 ? (
            <div className="grid gap-y-14 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12">
              {previewServices.map((service, index) => (
                <ScrollReveal key={service.id} delayMs={index * 100} y={28} durationMs={700}>
                  <ServiceCard service={service} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ServiceLoadFallback servicesUnavailable={servicesUnavailable} />
          )}
          <ScrollReveal delayMs={180} className="sm:hidden">
            <PendingLinkButton href="/services" variant="outline" className="h-11 w-full rounded-full border-foreground/15 bg-transparent">
              {t.home.allServices}
            </PendingLinkButton>
          </ScrollReveal>
        </div>
      </section>

      <ScrollVelocity items={workShowcaseItems} velocity={38} numCopies={5} />

      <section className="bg-[#faf7f0] py-14 sm:py-20">
        <div className="container">
          <ScrollReveal y={24} durationMs={650}>
            <Card className="overflow-hidden border-primary/10 bg-[#fdfbf6] shadow-none">
              <CardContent className="grid gap-5 p-6 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <Home className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">{t.home.homeVisitEyebrow}</p>
                  <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight tracking-normal">{t.home.homeVisitTitle}</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{t.home.homeVisitDescription}</p>
                </div>
                <PendingLinkButton href="/book" className="rounded-full px-6">
                  {t.home.homeVisitCta}
                </PendingLinkButton>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
      <MobileActionBar />
    </main>
  );
}

function ServiceLoadFallback({ servicesUnavailable }: { servicesUnavailable: boolean }) {
  return (
    <div className="rounded-lg border border-foreground/10 bg-[#fdfbf6] px-5 py-6 text-sm leading-7 text-muted-foreground">
      {servicesUnavailable
        ? "Services are temporarily unavailable. Please call the studio for current options."
        : "No services are available right now."}
    </div>
  );
}
