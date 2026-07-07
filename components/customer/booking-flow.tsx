"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { availableTimes, bookingDates, customerServices } from "@/lib/mock-data/customer";
import { cn } from "@/lib/utils";

type BookingStep = 1 | 2 | 3 | 4 | 5;

const steps = [
  { id: 1, label: "Service" },
  { id: 2, label: "Date" },
  { id: 3, label: "Time" },
  { id: 4, label: "Info" },
  { id: 5, label: "Review" },
] as const;

export function BookingFlow({ initialServiceId }: { initialServiceId?: string }) {
  const [step, setStep] = useState<BookingStep>(1);
  const [serviceId, setServiceId] = useState(initialServiceId ?? customerServices[0]?.id);
  const [date, setDate] = useState(bookingDates[1]?.value);
  const [time, setTime] = useState(availableTimes[1]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const selectedService = useMemo(
    () => customerServices.find((service) => service.id === serviceId) ?? customerServices[0],
    [serviceId],
  );
  const selectedDate = bookingDates.find((item) => item.value === date) ?? bookingDates[0];
  const canContinue = step < 4 || (name.trim().length > 1 && phone.trim().length > 6);

  function goNext() {
    if (step < 5 && canContinue) {
      setStep((current) => (current + 1) as BookingStep);
    }
  }

  function goBack() {
    if (step > 1) {
      setStep((current) => (current - 1) as BookingStep);
    }
  }

  function confirmationHref() {
    const params = new URLSearchParams({
      service: selectedService.name,
      date: selectedDate.label,
      time,
      name: name.trim(),
      phone: phone.trim(),
      notes: notes.trim(),
    });
    return `/book/confirmation?${params.toString()}`;
  }

  return (
    <div className="space-y-5">
      <nav aria-label="Booking progress" className="grid grid-cols-5 gap-2">
        {steps.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setStep(item.id)}
            className={cn(
              "min-h-11 rounded-md border px-1 text-xs font-medium transition-colors",
              step === item.id ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground",
            )}
            aria-current={step === item.id ? "step" : undefined}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="rounded-lg border bg-card p-5 shadow-soft">
        {step === 1 ? (
          <section className="space-y-4" aria-labelledby="choose-service-heading">
            <StepHeading icon={CalendarDays} title="Choose a service" subtitle="Pick the treatment you want to request." />
            <div className="grid gap-3">
              {customerServices.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setServiceId(service.id)}
                  className={cn(
                    "rounded-md border p-4 text-left transition-colors",
                    serviceId === service.id ? "border-primary bg-secondary/55" : "bg-background hover:bg-muted",
                  )}
                >
                  <span className="block text-base font-semibold">{service.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {service.duration} · {service.price}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="space-y-4" aria-labelledby="choose-date-heading">
            <StepHeading icon={CalendarDays} title="Choose a date" subtitle="Mock dates are shown for layout only." />
            <div className="grid grid-cols-2 gap-3">
              {bookingDates.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setDate(item.value)}
                  className={cn(
                    "min-h-16 rounded-md border px-3 text-left font-medium",
                    date === item.value ? "border-primary bg-primary text-primary-foreground" : "bg-background",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {step === 3 ? (
          <section className="space-y-4" aria-labelledby="choose-time-heading">
            <StepHeading icon={Clock} title="Choose a time" subtitle="Available times are mock options for now." />
            <div className="grid grid-cols-2 gap-3">
              {availableTimes.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTime(item)}
                  className={cn(
                    "min-h-14 rounded-md border px-3 text-left font-medium",
                    time === item ? "border-primary bg-primary text-primary-foreground" : "bg-background",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="space-y-4" aria-labelledby="customer-info-heading">
            <StepHeading icon={UserRound} title="Your information" subtitle="No account needed. Name and phone are required." />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="booking-name">Name</Label>
                <Input id="booking-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="booking-phone">Phone</Label>
                <Input
                  id="booking-phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="booking-notes">Notes optional</Label>
                <Textarea
                  id="booking-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  placeholder="Anything we should know?"
                />
              </div>
            </div>
          </section>
        ) : null}

        {step === 5 ? (
          <section className="space-y-4" aria-labelledby="review-heading">
            <StepHeading icon={Check} title="Review request" subtitle="This does not create a real appointment yet." />
            <div className="space-y-3 rounded-md bg-muted p-4 text-sm">
              <SummaryRow label="Service" value={`${selectedService.name} · ${selectedService.duration} · ${selectedService.price}`} />
              <SummaryRow label="Date" value={selectedDate.label} />
              <SummaryRow label="Time" value={time} />
              <SummaryRow label="Name" value={name || "Not entered"} />
              <SummaryRow label="Phone" value={phone || "Not entered"} />
              {notes ? <SummaryRow label="Notes" value={notes} /> : null}
            </div>
          </section>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="secondary" onClick={goBack} disabled={step === 1}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>
        {step < 5 ? (
          <Button type="button" onClick={goNext} disabled={!canContinue}>
            Continue
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button asChild>
            <a href={confirmationHref()}>Confirm request</a>
          </Button>
        )}
      </div>
    </div>
  );
}

function StepHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: true }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <h2 className="text-2xl font-semibold tracking-normal">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-border/70 pb-3 last:border-0 last:pb-0">
      <dt className="font-medium text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}
