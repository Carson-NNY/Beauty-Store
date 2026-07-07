import { z } from "zod";

export const appointmentInterestSchema = z.object({
  name: z.string().min(2, "Enter your name").max(80, "Name is too long"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a phone number").max(24, "Phone number is too long"),
  notes: z.string().max(500, "Notes must be 500 characters or fewer").optional().or(z.literal("")),
});

export type AppointmentInterestInput = z.infer<typeof appointmentInterestSchema>;
