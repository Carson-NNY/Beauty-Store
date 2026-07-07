import Link from "next/link";
import { businessProfile } from "@/lib/mock-data/customer";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card pb-24 sm:pb-0">
      <div className="container grid gap-6 py-8 text-sm text-muted-foreground sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-semibold tracking-[0.08em] text-foreground">{businessProfile.name}</p>
          <p className="mt-2 max-w-sm leading-6">{businessProfile.intro}</p>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-foreground">Visit</p>
          <p>{businessProfile.address}</p>
          <p>{businessProfile.hoursSummary}</p>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-foreground">Quick links</p>
          <Link href="/services" className="block underline-offset-4 hover:underline">
            Services
          </Link>
          <Link href="/book" className="block underline-offset-4 hover:underline">
            Book appointment
          </Link>
          <Link href="/contact" className="block underline-offset-4 hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
