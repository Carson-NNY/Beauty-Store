"use client";

import Link from "next/link";
import { Home, Sparkles } from "lucide-react";
import { ContactPanel } from "@/components/customer/contact-panel";
import { EditorialHero } from "@/components/customer/editorial-hero";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { ServiceCard } from "@/components/customer/service-card";
import CircularGallery from "@/components/effects/circular-gallery";
import { ScrollFloat } from "@/components/effects/scroll-float";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { ScrollVelocity } from "@/components/effects/scroll-velocity";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCustomerServices, getFaqs, getWorkShowcaseItems } from "@/lib/i18n";

export default function HomePage() {
  const { language, t } = useLanguage();
  const services = getCustomerServices(language);
  const previewServices = services.slice(0, 3);
  const faqs = getFaqs(language);
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
            <Button asChild variant="outline" className="hidden rounded-full border-foreground/15 bg-transparent px-5 sm:inline-flex">
              <Link href="/services">{t.home.allServices}</Link>
            </Button>
          </ScrollReveal>
          <div className="grid gap-y-14 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12">
            {previewServices.map((service, index) => (
              <ScrollReveal key={service.id} delayMs={index * 100} y={28} durationMs={700}>
                <ServiceCard service={service} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delayMs={180} className="sm:hidden">
            <Button asChild variant="outline" className="h-11 w-full rounded-full border-foreground/15 bg-transparent">
              <Link href="/services">{t.home.allServices}</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#faf7f0] pb-14 sm:pb-20">
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
                <Button asChild className="rounded-full px-6">
                  <Link href="/book">{t.home.homeVisitCta}</Link>
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <ScrollVelocity items={workShowcaseItems} velocity={38} numCopies={5} />

      <section className="container grid gap-6 py-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">{t.home.questionsEyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal">{t.home.questionsTitle}</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            {t.home.questionsDescription}
          </p>
        </div>
        <div className="grid gap-3">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <CardContent className="p-5">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-8">
        <ContactPanel />
      </section>

      <section className="container pb-12 pt-4">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <Sparkles className="h-6 w-6" aria-hidden="true" />
              <h2 className="mt-3 text-3xl font-semibold tracking-normal">{t.home.finalTitle}</h2>
              <p className="mt-2 text-primary-foreground/80">{t.home.finalDescription}</p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href="/book">{t.common.bookNow}</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      <MobileActionBar />
    </main>
  );
}
