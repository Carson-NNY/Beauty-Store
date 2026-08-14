import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateAppointmentEndTime,
  createAppointmentInputSchema,
  normalizePhone,
} from "../modules/appointments/domain/appointment.ts";

test("appointment submission accepts a preferred start time", () => {
  const parsed = createAppointmentInputSchema.parse({
    serviceId: "service_123",
    customerName: "Liu",
    customerPhone: "9293911865",
    customerEmail: "",
    preferredStartTime: "2026-07-20T18:30:00.000Z",
    notes: "Prefer a quiet room.",
  });

  assert.equal(parsed.preferredStartTime.toISOString(), "2026-07-20T18:30:00.000Z");
  assert.equal(parsed.customerEmail, undefined);
});

test("phone numbers are normalized for customer reuse", () => {
  assert.equal(normalizePhone("9293911865"), "9293911865");
});

test("service duration still determines the internal legacy end time", () => {
  const preferredStartTime = new Date("2026-07-10T17:00:00.000Z");
  const endTime = calculateAppointmentEndTime(preferredStartTime, 75);

  assert.equal(endTime.toISOString(), "2026-07-10T18:15:00.000Z");
});

test("overlapping preferred times are intentionally allowed by the domain model", () => {
  const first = createAppointmentInputSchema.parse({
    serviceId: "service_123",
    customerName: "Liu",
    customerPhone: "9293911865",
    preferredStartTime: "2026-07-20T18:30:00.000Z",
  });
  const second = createAppointmentInputSchema.parse({
    serviceId: "service_123",
    customerName: "Chen",
    customerPhone: "9293911866",
    preferredStartTime: "2026-07-20T18:30:00.000Z",
  });

  assert.equal(first.preferredStartTime.getTime(), second.preferredStartTime.getTime());
});
