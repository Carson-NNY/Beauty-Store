import Link from "next/link";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { ServiceCard } from "@/components/customer/service-card";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Button } from "@/components/ui/button";
import { customerServices } from "@/lib/mock-data/customer";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#f4f1eb]">
      <div className="container space-y-12 py-10 sm:py-16">
        <ScrollReveal className="grid gap-5 lg:grid-cols-[0.9fr_0.55fr] lg:items-end" y={20} durationMs={600}>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">Services</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Facials, massage, and body care
            </h1>
            <p className="max-w-2xl leading-7 text-muted-foreground">
              Mock service details for now. Real descriptions, durations, pricing, and availability can be edited later.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-full px-7 lg:justify-self-end">
            <Link href="/book">Book Now</Link>
          </Button>
        </ScrollReveal>
        <div className="grid gap-14">
          {customerServices.map((service, index) => (
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
