import Link from "next/link";
import { ContactPanel } from "@/components/customer/contact-panel";
import { MobileActionBar } from "@/components/customer/mobile-action-bar";
import { Button } from "@/components/ui/button";
import { businessProfile } from "@/lib/mock-data/customer";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="container space-y-8 py-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">Contact</p>
        <h1 className="text-4xl font-semibold tracking-normal">Call, message, or visit</h1>
        <p className="max-w-2xl leading-7 text-muted-foreground">
          {businessProfile.name} is a local appointment-based studio. Call ahead if you have questions about services or timing.
        </p>
      </div>
      <ContactPanel />
      <div className="grid gap-3 rounded-lg border bg-card p-5 text-sm text-muted-foreground sm:grid-cols-3">
        <p>
          <span className="block font-medium text-foreground">Address</span>
          {businessProfile.address}
        </p>
        <p>
          <span className="block font-medium text-foreground">Hours</span>
          {businessProfile.hoursSummary}
        </p>
        <p>
          <span className="block font-medium text-foreground">Phone</span>
          {businessProfile.phone}
        </p>
      </div>
      <Button asChild size="lg" className="w-full sm:w-auto">
        <Link href="/book">Book Now</Link>
      </Button>
      <MobileActionBar />
    </main>
  );
}
