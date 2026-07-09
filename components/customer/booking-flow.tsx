"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock, MapPin, UserRound } from "lucide-react";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCustomerServices } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type BookingStep = 1 | 2 | 3 | 4 | 5;
type VisitType = "in-store" | "home";

export function BookingFlow({
  initialServiceId,
  startDateIso,
}: {
  initialServiceId?: string;
  startDateIso: string;
}) {
  const { language, t } = useLanguage();
  const customerServices = useMemo(() => getCustomerServices(language), [language]);
  const localizedDates = useMemo(() => buildDateOptions(startDateIso, language), [language, startDateIso]);
  const availableTimes = useMemo(() => buildTimeOptions(language), [language]);
  const steps = t.booking.steps.map((label, index) => ({ id: (index + 1) as BookingStep, label }));
  const [step, setStep] = useState<BookingStep>(1);
  const [serviceId, setServiceId] = useState(initialServiceId ?? customerServices[0]?.id);
  const [date, setDate] = useState(localizedDates[1]?.value);
  const [time, setTime] = useState(availableTimes[0]?.value);
  const [visitType, setVisitType] = useState<VisitType>("in-store");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const selectedService = useMemo(
    () => customerServices.find((service) => service.id === serviceId) ?? customerServices[0],
    [customerServices, serviceId],
  );
  const selectedDate = localizedDates.find((item) => item.value === date) ?? localizedDates[0];
  const selectedTime = availableTimes.find((item) => item.value === time) ?? availableTimes[0];
  const phoneDigits = getPhoneDigits(phone);
  const hasPhoneValue = phone.trim().length > 0;
  const isValidPhone = phoneDigits.length === 10;
  const hasRequiredContact = name.trim().length > 1 && isValidPhone;
  const hasRequiredAddress = visitType === "in-store" || address.trim().length > 5;
  const canContinue = step < 4 || (hasRequiredContact && hasRequiredAddress);

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

  function openStep(nextStep: BookingStep) {
    if (nextStep === 5 && !canContinue) return;
    setStep(nextStep);
  }

  function confirmationHref() {
    const params = new URLSearchParams({
      service: selectedService.name,
      date: selectedDate.label,
      time: selectedTime.label,
      visitType: visitType === "home" ? t.booking.homeVisit : t.booking.inStore,
      address: visitType === "home" ? address.trim() : "",
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
            onClick={() => openStep(item.id)}
            className={cn(
              "min-h-11 rounded-md border px-1 text-xs font-medium transition-colors",
              step === item.id ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground",
              item.id === 5 && !canContinue && "cursor-not-allowed opacity-55",
            )}
            aria-current={step === item.id ? "step" : undefined}
            disabled={item.id === 5 && !canContinue}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="rounded-lg border bg-card p-5 shadow-soft">
        {step === 1 ? (
          <section className="space-y-4" aria-labelledby="choose-service-heading">
            <StepHeading icon={CalendarDays} title={t.booking.chooseService} subtitle={t.booking.chooseServiceSubtitle} />
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
            <StepHeading icon={CalendarDays} title={t.booking.chooseDate} subtitle={t.booking.chooseDateSubtitle} />
            <div className="grid grid-cols-2 gap-3">
              {localizedDates.map((item) => (
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
            <StepHeading icon={Clock} title={t.booking.chooseTime} subtitle={t.booking.chooseTimeSubtitle} />
            <div className="grid grid-cols-2 gap-3">
              {availableTimes.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setTime(item.value)}
                  className={cn(
                    "min-h-14 rounded-md border px-3 text-left font-medium",
                    time === item.value ? "border-primary bg-primary text-primary-foreground" : "bg-background",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {step === 4 ? (
          <section className="space-y-4" aria-labelledby="customer-info-heading">
            <StepHeading icon={UserRound} title={t.booking.infoTitle} subtitle={t.booking.infoSubtitle} />
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="booking-name">{t.booking.name}</Label>
                <Input id="booking-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="booking-phone">{t.booking.phone}</Label>
                <Input
                  id="booking-phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={hasPhoneValue && !isValidPhone}
                  aria-describedby="booking-phone-help"
                />
                <p
                  id="booking-phone-help"
                  className={cn(
                    "text-sm leading-6",
                    hasPhoneValue && !isValidPhone ? "text-destructive" : "text-muted-foreground",
                  )}
                >
                  {hasPhoneValue && !isValidPhone ? t.booking.phoneInvalid : t.booking.phoneHelper}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>{t.booking.visitType}</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <VisitTypeButton
                    active={visitType === "in-store"}
                    title={t.booking.inStore}
                    description={t.booking.inStoreDescription}
                    onClick={() => setVisitType("in-store")}
                  />
                  <VisitTypeButton
                    active={visitType === "home"}
                    title={t.booking.homeVisit}
                    description={t.booking.homeVisitDescription}
                    onClick={() => setVisitType("home")}
                  />
                </div>
              </div>
              {visitType === "home" ? (
                <div className="grid gap-2 rounded-lg border border-primary/20 bg-secondary/35 p-3">
                  <Label htmlFor="booking-address">{t.booking.address}</Label>
                  <Textarea
                    id="booking-address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    rows={3}
                    autoComplete="street-address"
                    placeholder={t.booking.addressPlaceholder}
                  />
                  {address.trim().length <= 5 ? (
                    <p className="text-sm leading-6 text-muted-foreground">{t.booking.addressRequired}</p>
                  ) : null}
                </div>
              ) : null}
              <div className="grid gap-2">
                <Label htmlFor="booking-notes">{t.booking.notes}</Label>
                <Textarea
                  id="booking-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={3}
                  placeholder={t.booking.notesPlaceholder}
                />
              </div>
            </div>
          </section>
        ) : null}

        {step === 5 ? (
          <section className="space-y-4" aria-labelledby="review-heading">
            <StepHeading icon={Check} title={t.booking.reviewTitle} subtitle={t.booking.reviewSubtitle} />
            <div className="space-y-3 rounded-md bg-muted p-4 text-sm">
              <SummaryRow label={t.booking.service} value={`${selectedService.name} · ${selectedService.duration} · ${selectedService.price}`} />
              <SummaryRow label={t.booking.visitType} value={visitType === "home" ? t.booking.homeVisit : t.booking.inStore} />
              {visitType === "home" ? <SummaryRow label={t.booking.address} value={address || t.booking.notEntered} /> : null}
              <SummaryRow label={t.booking.date} value={selectedDate.label} />
              <SummaryRow label={t.booking.time} value={selectedTime.label} />
              <SummaryRow label={t.booking.name} value={name || t.booking.notEntered} />
              <SummaryRow label={t.booking.phone} value={phone || t.booking.notEntered} />
              {notes ? <SummaryRow label={t.booking.notes} value={notes} /> : null}
            </div>
          </section>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="secondary" onClick={goBack} disabled={step === 1}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          {t.booking.back}
        </Button>
        {step < 5 ? (
          <Button type="button" onClick={goNext} disabled={!canContinue}>
            {t.booking.continue}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button asChild>
            <a href={confirmationHref()}>{t.booking.confirm}</a>
          </Button>
        )}
      </div>
    </div>
  );
}

function VisitTypeButton({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-24 rounded-md border p-4 text-left transition-colors",
        active ? "border-primary bg-secondary/55" : "bg-background hover:bg-muted",
      )}
      aria-pressed={active}
    >
      <span className="flex items-center gap-2 font-semibold">
        <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
        {title}
      </span>
      <span className="mt-2 block text-sm leading-6 text-muted-foreground">{description}</span>
    </button>
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

function buildDateOptions(startDateIso: string, language: "zh" | "en") {
  const startDate = parseIsoDate(startDateIso);

  return Array.from({ length: 14 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      value: formatDateIso(date),
      label: formatDateLabel(date, language),
    };
  });
}

function buildTimeOptions(language: "zh" | "en") {
  const options = [];

  for (let minutes = 9 * 60; minutes <= 20 * 60; minutes += 30) {
    options.push({
      value: formatTimeValue(minutes),
      label: formatTimeLabel(minutes, language),
    });
  }

  return options;
}

function parseIsoDate(value: string) {
  const [year = "2026", month = "1", day = "1"] = value.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function formatDateIso(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDateLabel(date: Date, language: "zh" | "en") {
  if (language === "zh") {
    const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()];
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekday}`;
  }

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatTimeValue(minutes: number) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function formatTimeLabel(minutes: number, language: "zh" | "en") {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const displayHour = hour % 12 || 12;
  const paddedMinute = String(minute).padStart(2, "0");

  if (language === "zh") {
    return `${hour < 12 ? "上午" : "下午"} ${displayHour}:${paddedMinute}`;
  }

  return `${displayHour}:${paddedMinute} ${hour < 12 ? "AM" : "PM"}`;
}

function getPhoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-border/70 pb-3 last:border-0 last:pb-0">
      <dt className="font-medium text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}
