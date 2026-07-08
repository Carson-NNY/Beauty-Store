import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { ContactPanel } from "@/components/customer/contact-panel";
import { EditorialHero } from "@/components/customer/editorial-hero";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { ServiceCard } from "@/components/customer/service-card";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { customerServices, faqs, trustHighlights } from "@/lib/mock-data/customer";

const previewServices = customerServices.slice(0, 3);

export default function HomePage() {
  return (
    <main>
      <EditorialHero />

      <section className="bg-[#f4f1eb] py-14 sm:py-20">
        <div className="container space-y-10">
          <ScrollReveal className="flex items-end justify-between gap-4" y={20} durationMs={600}>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">Popular services</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
                Start with what you need today
              </h2>
            </div>
            <Button asChild variant="outline" className="hidden rounded-full border-foreground/15 bg-transparent px-5 sm:inline-flex">
              <Link href="/services">All services</Link>
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
              <Link href="/services">All services</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="container grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {trustHighlights.map((highlight) => (
          <Card key={highlight}>
            <CardContent className="flex min-h-28 items-start gap-3 p-5">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="font-medium leading-6">{highlight}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="container grid gap-6 py-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">Questions</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-normal">Before you book</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            Most customers arrive from WeChat, Maps, Yelp, SMS, or a QR code. The goal is to make the next step obvious.
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
              <h2 className="mt-3 text-3xl font-semibold tracking-normal">Ready for a calm appointment?</h2>
              <p className="mt-2 text-primary-foreground/80">Choose a service and send a simple request in under a minute.</p>
            </div>
            <Button asChild size="lg" variant="secondary">
              <Link href="/book">Book Now</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      <MobileActionBar />
    </main>
  );
}
