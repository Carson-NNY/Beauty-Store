"use client";

import Link from "next/link";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { ServiceCard } from "@/components/customer/service-card";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { getCustomerServices } from "@/lib/i18n";

export function ServicesPageContent() {
  const { language, t } = useLanguage();
  const services = getCustomerServices(language);

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
          <Button asChild size="lg" className="rounded-full px-7 lg:justify-self-end">
            <Link href="/book">{t.common.bookNow}</Link>
          </Button>
        </ScrollReveal>
        <div className="grid gap-14">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delayMs={Math.min(index, 4) * 90} y={28} durationMs={700}>
              <ServiceCard service={service} featured={index === 0} />
            </ScrollReveal>
          ))}
        </div>
      </div>
      <MobileActionBar />
    </main>
  );
}
