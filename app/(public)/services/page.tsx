import Link from "next/link";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { ServiceCard } from "@/components/customer/service-card";
import { Button } from "@/components/ui/button";
import { customerServices } from "@/lib/mock-data/customer";

export const metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <main className="container space-y-8 py-8">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_0.55fr] lg:items-end">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">Services</p>
          <h1 className="text-4xl font-semibold tracking-normal">Facials, massage, and body care</h1>
          <p className="max-w-2xl leading-7 text-muted-foreground">
            Mock service details for now. Real descriptions, durations, pricing, and availability can be edited later.
          </p>
        </div>
        <Button asChild size="lg" className="lg:justify-self-end">
          <Link href="/book">Book Now</Link>
        </Button>
      </div>
      <div className="grid gap-5">
        {customerServices.map((service, index) => (
          <ServiceCard key={service.id} service={service} featured={index === 0} />
        ))}
      </div>
      <MobileActionBar />
    </main>
  );
}
