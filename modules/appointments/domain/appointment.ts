import { z } from "zod";

export const appointmentStatusSchema = z.enum(["submitted", "booked", "cancelled", "completed"]);

export const createAppointmentInputSchema = z.object({
  serviceId: z.string().min(1, "Choose a service"),
  customerName: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
  customerPhone: z.string().trim().min(7, "Enter a phone number").max(24, "Phone number is too long"),
  customerEmail: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  preferredStartTime: z.coerce.date(),
  notes: z.string().trim().max(500, "Notes must be 500 characters or fewer").optional().or(z.literal("")),
});

export type AppointmentStatus = z.infer<typeof appointmentStatusSchema>;
export type CreateAppointmentInput = {
  serviceId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  preferredStartTime: string | Date;
  notes?: string;
};
export type ValidCreateAppointmentInput = z.output<typeof createAppointmentInputSchema>;

export function calculateAppointmentEndTime(startTime: Date, durationMinutes: number) {
  return new Date(startTime.getTime() + durationMinutes * 60_000);
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 10 ? digits : value.trim();
}
