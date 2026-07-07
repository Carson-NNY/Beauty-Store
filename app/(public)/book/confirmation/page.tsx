import Link from "next/link";
import { CalendarPlus, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { businessProfile } from "@/lib/mock-data/customer";

export const metadata = {
  title: "Appointment Confirmation",
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const readParam = (key: string, fallback: string) => {
    const value = params[key];
    return typeof value === "string" && value.trim() ? value : fallback;
  };

  const service = readParam("service", "Signature Glow Facial");
  const date = readParam("date", "Wed, Jul 8");
  const time = readParam("time", "11:30 AM");

  return (
    <main className="container max-w-2xl space-y-6 py-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.1em] text-accent">Request received</p>
        <h1 className="text-4xl font-semibold tracking-normal">Appointment summary</h1>
        <p className="leading-7 text-muted-foreground">
          This confirmation page is a UI placeholder. Real confirmation rules and notifications are intentionally not implemented.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{service}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 rounded-md bg-muted p-4 text-sm">
            <SummaryRow label="Date" value={date} />
            <SummaryRow label="Time" value={time} />
            <SummaryRow label="Address" value={businessProfile.address} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button asChild>
              <a href={`tel:${businessProfile.phone}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call studio
              </a>
            </Button>
            <Button variant="secondary" disabled>
              <CalendarPlus className="h-4 w-4" aria-hidden="true" />
              Add to calendar
            </Button>
          </div>
          <div className="rounded-md border border-dashed p-4">
            <p className="flex gap-2 text-sm leading-6 text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>Map and directions integration will be added after the real address is finalized.</span>
            </p>
          </div>
        </CardContent>
      </Card>
      <Button asChild variant="outline" className="w-full">
        <Link href="/book">Book another appointment</Link>
      </Button>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  );
}
