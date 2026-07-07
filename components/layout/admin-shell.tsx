import Link from "next/link";
import { CalendarDays, Home, Scissors, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const adminNav = [
  { href: "/admin", label: "Overview", icon: Home },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/admin/services", label: "Services", icon: Scissors },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-dvh bg-muted/40">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between gap-4">
          <Link href="/admin" className="font-semibold">
            Facial admin
          </Link>
          <Button asChild variant="secondary">
            <Link href="/">Public site</Link>
          </Button>
        </div>
      </header>
      <div className="container grid gap-6 py-6 md:grid-cols-[220px_1fr]">
        <nav aria-label="Admin navigation" className="grid gap-2 md:self-start">
          {adminNav.map((item) => (
            <Button key={item.href} asChild variant="ghost" className="justify-start bg-card md:bg-transparent">
              <Link href={item.href}>
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <main>{children}</main>
      </div>
    </div>
  );
}
