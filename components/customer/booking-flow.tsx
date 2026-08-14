"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, Loader2, MapPin, UserRound } from "lucide-react";
import { bookAppointmentAction } from "@/app/(public)/book/actions";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCustomerServices, getServiceCategoryLabel } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { groupServicesByCategory } from "@/modules/services/domain/service-catalog";
import type { PublicService, ServiceCategory } from "@/modules/services/domain/service";

type BookingStep = 1 | 2 | 3 | 4 | 5;
type VisitType = "in-store" | "home";

export function BookingFlow({
  initialServiceId,
  services,
  servicesUnavailable = false,
  startDateIso,
}: {
  initialServiceId?: string;
  services: PublicService[];
  servicesUnavailable?: boolean;
  startDateIso: string;
}) {
  const { language, t } = useLanguage();
  const customerServices = useMemo(() => getCustomerServices(services, language), [language, services]);
  const serviceGroups = useMemo(
    () => groupServicesByCategory(customerServices).filter(({ services: categoryServices }) => categoryServices.length > 0),
    [customerServices],
  );
  const localizedDates = useMemo(() => buildDateOptions(startDateIso, language), [language, startDateIso]);
  const availableTimes = useMemo(() => buildTimeOptions(language), [language]);
  const steps = t.booking.steps.map((label, index) => ({ id: (index + 1) as BookingStep, label }));
  const [step, setStep] = useState<BookingStep>(1);
  const [serviceId, setServiceId] = useState(initialServiceId ?? customerServices[0]?.id);
  const [openCategory, setOpenCategory] = useState<ServiceCategory | null>(
    () => customerServices.find((service) => service.id === initialServiceId)?.category ?? customerServices[0]?.category ?? null,
  );
  const [date, setDate] = useState(localizedDates[1]?.value);
  const [time, setTime] = useState(availableTimes[0]?.value);
  const [visitType, setVisitType] = useState<VisitType>("in-store");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [validationAttemptedStep, setValidationAttemptedStep] = useState<BookingStep | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationUrl, setConfirmationUrl] = useState<string | null>(null);

  const selectedService = useMemo(() => customerServices.find((service) => service.id === serviceId) ?? customerServices[0], [
    customerServices,
    serviceId,
  ]);
  const selectedDate = localizedDates.find((item) => item.value === date) ?? localizedDates[0];
  const selectedTime = availableTimes.find((item) => item.value === time) ?? availableTimes[0];
  const hasSelectedService = Boolean(selectedService);
  const phoneDigits = getPhoneDigits(phone);
  const isValidName = name.trim().length > 1;
  const hasPhoneValue = phone.trim().length > 0;
  const isValidPhone = phoneDigits.length === 10;
  const hasEmailValue = email.trim().length > 0;
  const isValidEmail = !hasEmailValue || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const hasRequiredContact = isValidName && isValidPhone && isValidEmail;
  const hasRequiredAddress = visitType === "in-store" || address.trim().length > 5;
  const canContinue = hasSelectedService && (step < 4 || (hasRequiredContact && hasRequiredAddress));
  const shouldShowStepErrors = validationAttemptedStep === step;
  const shouldShowNameError = shouldShowStepErrors && !isValidName;
  const shouldShowPhoneError = shouldShowStepErrors && !isValidPhone;
  const shouldShowEmailError = hasEmailValue && !isValidEmail;
  const shouldShowAddressError = shouldShowStepErrors && visitType === "home" && !hasRequiredAddress;

  function goNext() {
    if (step >= 5) return;

    if (!canContinue) {
      setValidationAttemptedStep(step);
      return;
    }

    setValidationAttemptedStep(null);
    setStep((current) => (current + 1) as BookingStep);
  }

  function goBack() {
    if (step > 1) {
      setStep((current) => (current - 1) as BookingStep);
    }
  }

  function openStep(nextStep: BookingStep) {
    if (nextStep === 5 && !canContinue) {
      setValidationAttemptedStep(step);
      return;
    }
    setValidationAttemptedStep(null);
    setStep(nextStep);
  }

  async function submitAppointment() {
    if (!selectedService || !canContinue || isSubmitting) {
      setValidationAttemptedStep(step);
      return;
    }

    setBookingError("");
    setIsSubmitting(true);

    try {
      const result = await bookAppointmentAction({
        serviceId: selectedService.id,
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        preferredStartTime: buildPreferredStartTimeIso(selectedDate.value, selectedTime.value),
        notes: buildAppointmentNotes({
          visitType,
          address,
          notes,
          homeVisitLabel: t.booking.homeVisit,
        }),
      });

      if (!result.ok || !result.appointment) {
        setBookingError(result.message || t.booking.failed);
        return;
      }

      const params = new URLSearchParams({
        service: result.appointment.service,
        preferredStartTime: result.appointment.preferredStartTime,
        name: result.appointment.customerName,
        emailSent: result.appointment.customerEmailProvided ? "1" : "0",
      });

      const nextUrl = `/book/confirmation?${params.toString()}`;
      setConfirmationUrl(nextUrl);
      setIsSubmitting(false);
      window.location.assign(nextUrl);
    } catch {
      setBookingError(t.booking.failed);
    } finally {
      setIsSubmitting(false);
    }
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
            {customerServices.length > 0 ? (
              <div className="grid gap-3">
                {serviceGroups.map(({ category, services: categoryServices }) => {
                  const isOpen = openCategory === category;
                  const selectedCategoryService = categoryServices.find((service) => service.id === serviceId);
                  const panelId = `booking-services-${category}`;

                  return (
                    <div
                      key={category}
                      className={cn(
                        "overflow-hidden rounded-lg border bg-background",
                        selectedCategoryService && "border-primary/70",
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenCategory((current) => (current === category ? null : category))}
                        className={cn(
                          "flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none",
                          isOpen && "bg-secondary/35",
                        )}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <span className="min-w-0">
                          <span className="block text-base font-semibold">
                            {getServiceCategoryLabel(category, language)}
                          </span>
                          {selectedCategoryService ? (
                            <span className="mt-1 flex items-center gap-1.5 text-sm text-primary">
                              <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                              <span className="truncate">{selectedCategoryService.name}</span>
                            </span>
                          ) : (
                            <span className="mt-1 block text-sm text-muted-foreground">
                              {language === "zh" ? `${categoryServices.length} 个项目` : `${categoryServices.length} services`}
                            </span>
                          )}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none",
                            isOpen && "rotate-180",
                          )}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen ? (
                        <div id={panelId} className="grid gap-2 border-t p-3" role="group" aria-label={getServiceCategoryLabel(category, language)}>
                          {categoryServices.map((service) => (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => setServiceId(service.id)}
                              className={cn(
                                "min-h-16 cursor-pointer rounded-md border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                                serviceId === service.id
                                  ? "border-primary bg-secondary/55"
                                  : "bg-card hover:bg-muted",
                              )}
                              aria-pressed={serviceId === service.id}
                            >
                              <span className="block text-base font-semibold">{service.name}</span>
                              <span className="mt-1 block text-sm text-muted-foreground">
                                {service.duration} · {service.price}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="rounded-md border bg-background p-4 text-sm leading-6 text-muted-foreground">
                {servicesUnavailable
                  ? "Services are temporarily unavailable. Please call the studio for current options."
                  : "No services are available right now."}
              </p>
            )}
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
                <RequiredLabel htmlFor="booking-name" label={t.booking.name} requiredText={t.booking.required} />
                <Input
                  id="booking-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  aria-invalid={shouldShowNameError}
                  aria-describedby="booking-name-help"
                  className={cn(shouldShowNameError && "border-destructive focus-visible:ring-destructive/25")}
                />
                <FieldMessage
                  id="booking-name-help"
                  tone={shouldShowNameError ? "error" : "muted"}
                  message={shouldShowNameError ? t.booking.nameRequired : t.booking.required}
                />
              </div>
              <div className="grid gap-2">
                <RequiredLabel htmlFor="booking-phone" label={t.booking.phone} requiredText={t.booking.required} />
                <Input
                  id="booking-phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={shouldShowPhoneError}
                  aria-describedby="booking-phone-help"
                  className={cn(shouldShowPhoneError && "border-destructive focus-visible:ring-destructive/25")}
                />
                <FieldMessage
                  id="booking-phone-help"
                  tone={shouldShowPhoneError ? "error" : "muted"}
                  message={
                    shouldShowPhoneError
                      ? hasPhoneValue
                        ? t.booking.phoneInvalid
                        : t.booking.phoneRequired
                      : t.booking.phoneHelper
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="booking-email">{t.booking.email}</Label>
                <Input
                  id="booking-email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={shouldShowEmailError}
                  aria-describedby="booking-email-help"
                  className={cn(shouldShowEmailError && "border-destructive focus-visible:ring-destructive/25")}
                />
                <FieldMessage
                  id="booking-email-help"
                  tone={shouldShowEmailError ? "error" : "muted"}
                  message={shouldShowEmailError ? t.booking.emailInvalid : t.booking.emailHelper}
                />
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
                  <RequiredLabel htmlFor="booking-address" label={t.booking.address} requiredText={t.booking.required} />
                  <Textarea
                    id="booking-address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    rows={3}
                    autoComplete="street-address"
                    placeholder={t.booking.addressPlaceholder}
                    aria-invalid={shouldShowAddressError}
                    aria-describedby="booking-address-help"
                    className={cn(shouldShowAddressError && "border-destructive focus-visible:ring-destructive/25")}
                  />
                  <FieldMessage
                    id="booking-address-help"
                    tone={shouldShowAddressError ? "error" : "muted"}
                    message={shouldShowAddressError ? t.booking.addressRequired : t.booking.addressRequired}
                  />
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
              <SummaryRow
                label={t.booking.service}
                value={
                  selectedService
                    ? `${selectedService.name} · ${selectedService.duration} · ${selectedService.price}`
                    : t.booking.notEntered
                }
              />
              <SummaryRow label={t.booking.visitType} value={visitType === "home" ? t.booking.homeVisit : t.booking.inStore} />
              {visitType === "home" ? <SummaryRow label={t.booking.address} value={address || t.booking.notEntered} /> : null}
              <SummaryRow label={t.booking.date} value={selectedDate.label} />
              <SummaryRow label={t.booking.time} value={selectedTime.label} />
              <SummaryRow label={t.booking.name} value={name || t.booking.notEntered} />
              <SummaryRow label={t.booking.phone} value={phone || t.booking.notEntered} />
              {email ? <SummaryRow label={t.booking.email} value={email} /> : null}
              {notes ? <SummaryRow label={t.booking.notes} value={notes} /> : null}
            </div>
            {bookingError ? (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm leading-6 text-destructive" role="alert">
                {bookingError}
              </p>
            ) : null}
          </section>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button type="button" variant="secondary" onClick={goBack} disabled={step === 1}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          {t.booking.back}
        </Button>
        {step < 5 ? (
          <Button type="button" onClick={goNext}>
            {t.booking.continue}
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : (
          selectedService ? (
            <Button
              type="button"
              onClick={confirmationUrl ? () => window.location.assign(confirmationUrl) : submitAppointment}
              disabled={!canContinue || isSubmitting}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
              {confirmationUrl ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
              {confirmationUrl ? t.booking.submitted : isSubmitting ? t.booking.submitting : t.booking.confirm}
            </Button>
          ) : (
            <Button type="button" disabled>
              {t.booking.confirm}
            </Button>
          )
        )}
      </div>
    </div>
  );
}

function RequiredLabel({
  htmlFor,
  label,
  requiredText,
}: {
  htmlFor: string;
  label: string;
  requiredText: string;
}) {
  return (
    <Label htmlFor={htmlFor} className="inline-flex items-center gap-2">
      <span>{label}</span>
      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
        {requiredText}
      </span>
    </Label>
  );
}

function FieldMessage({
  id,
  message,
  tone,
}: {
  id: string;
  message: string;
  tone: "muted" | "error";
}) {
  return (
    <p id={id} className={cn("text-sm leading-6", tone === "error" ? "text-destructive" : "text-muted-foreground")}>
      {message}
    </p>
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

  for (let minutes = 9 * 60; minutes <= 19 * 60; minutes += 30) {
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

function buildPreferredStartTimeIso(dateValue: string, timeValue: string) {
  const date = parseIsoDate(dateValue);
  const [hour = "0", minute = "0"] = timeValue.split(":");

  date.setHours(Number(hour), Number(minute), 0, 0);

  return date.toISOString();
}

function buildAppointmentNotes({
  visitType,
  address,
  notes,
  homeVisitLabel,
}: {
  visitType: VisitType;
  address: string;
  notes: string;
  homeVisitLabel: string;
}) {
  const lines = [];

  if (visitType === "home") {
    lines.push(`${homeVisitLabel}: ${address.trim()}`);
  }

  if (notes.trim()) {
    lines.push(notes.trim());
  }

  return lines.join("\n");
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-border/70 pb-3 last:border-0 last:pb-0">
      <dt className="font-medium text-muted-foreground">{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  );
}
