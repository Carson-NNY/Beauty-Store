"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";
import { EditorialHero } from "@/components/customer/editorial-hero";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import CircularGallery from "@/components/effects/circular-gallery";
import { ScrollFloat } from "@/components/effects/scroll-float";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { ScrollVelocity } from "@/components/effects/scroll-velocity";
import { useLanguage } from "@/components/i18n/language-provider";
import { Card, CardContent } from "@/components/ui/card";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { getCustomerServices, getServiceCategoryLabel, getWorkShowcaseItems } from "@/lib/i18n";
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
          <ScrollReveal y={20} durationMs={600}>
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
              <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{t.home.servicesDescription}</p>
            </div>
            <PendingLinkButton href="/services" variant="outline" className="hidden rounded-full border-foreground/15 bg-transparent px-5 sm:inline-flex">
              {t.home.allServices}
            </PendingLinkButton>
          </ScrollReveal>
          {previewServices.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
              {previewServices.map((service, index) => (
                <ScrollReveal
                  key={service.id}
                  delayMs={index * 80}
                  y={24}
                  durationMs={650}
                  className={previewServices.length === 6 ? "lg:col-span-4" : index < 2 ? "lg:col-span-6" : "lg:col-span-4"}
                >
                  <Link
                    href={`/services#service-${service.category}`}
                    aria-label={`${getServiceCategoryLabel(service.category, language)} — ${t.home.allServices}`}
                    className="group relative block min-h-80 touch-manipulation cursor-pointer overflow-hidden rounded-[1.25rem] bg-stone-900 text-white sm:min-h-96"
                  >
                    <Image
                      src={service.imageUrl}
                      alt={getServiceCategoryLabel(service.category, language)}
                      width={900}
                      height={720}
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 ease-out group-hover:scale-[1.025] group-hover:opacity-85 motion-reduce:transition-none"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-7">
                      <span>
                        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-[#e2c88f]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="block font-serif text-3xl font-semibold leading-tight">
                          {getServiceCategoryLabel(service.category, language)}
                        </span>
                      </span>
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/35 bg-black/20 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none">
                        <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
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
