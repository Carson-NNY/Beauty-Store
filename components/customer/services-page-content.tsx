"use client";

import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { ServiceCard } from "@/components/customer/service-card";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { useLanguage } from "@/components/i18n/language-provider";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { getCustomerServices } from "@/lib/i18n";
import type { PublicService } from "@/modules/services/domain/service";

export function ServicesPageContent({
  services: publicServices,
  servicesUnavailable = false,
}: {
  services: PublicService[];
  servicesUnavailable?: boolean;
}) {
  const { language, t } = useLanguage();
  const services = getCustomerServices(publicServices, language);

  return (
    <main className="bg-[#f4f1eb]">
      <div className="container space-y-12 py-10 sm:py-16">
        <ScrollReveal className="grid gap-5 lg:grid-cols-[0.9fr_0.55fr] lg:items-end" y={20} durationMs={600}>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">{t.services.eyebrow}</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              {t.services.title}
            </h1>
            <p className="max-w-2xl leading-7 text-muted-foreground">{t.services.description}</p>
          </div>
          <PendingLinkButton href="/book" size="lg" className="rounded-full px-7 lg:justify-self-end">
            {t.common.bookNow}
          </PendingLinkButton>
        </ScrollReveal>
        {services.length > 0 ? (
          <div className="grid gap-14">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} delayMs={Math.min(index, 4) * 90} y={28} durationMs={700}>
                <ServiceCard service={service} featured={index === 0} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-foreground/10 bg-[#fdfbf6] px-5 py-6 text-sm leading-7 text-muted-foreground">
            {servicesUnavailable
              ? "Services are temporarily unavailable. Please call the studio for current options."
              : "No services are available right now."}
          </div>
        )}
      </div>
      <MobileActionBar />
    </main>
  );
}
