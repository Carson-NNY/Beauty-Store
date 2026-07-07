import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessProfile } from "@/lib/mock-data/customer";

const navItems = [
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-h-11 items-center gap-2 font-semibold tracking-[0.08em]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm text-primary-foreground">
            ML
          </span>
          <span>{businessProfile.name}</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <Button asChild variant="ghost">
            <a href={`tel:${businessProfile.phone}`}>Call</a>
          </Button>
        </nav>
        <Button asChild className="hidden sm:inline-flex">
          <Link href="/book">Book now</Link>
        </Button>
        <div className="flex items-center gap-2 sm:hidden">
          <Button asChild size="icon" variant="ghost" aria-label="Call studio">
            <a href={`tel:${businessProfile.phone}`}>
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild size="icon" variant="ghost" aria-label="Open menu">
            <Link href="/services">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
