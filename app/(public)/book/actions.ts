"use server";

import { createAppointment, AppointmentBookingError } from "@/modules/appointments/application/create-appointment";

export type BookingActionState = {
  ok: boolean;
  message?: string;
  appointment?: {
    id: string;
    service: string;
    preferredStartTime: string;
    customerName: string;
    customerEmailProvided: boolean;
  };
};

export async function bookAppointmentAction(input: {
  serviceId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  preferredStartTime: string;
  notes?: string;
}): Promise<BookingActionState> {
  try {
    const appointment = await createAppointment(input);

    return {
      ok: true,
      appointment: {
        id: appointment.appointmentId,
        service: appointment.serviceName,
        preferredStartTime: appointment.preferredStartTime.toISOString(),
        customerName: appointment.customerName,
        customerEmailProvided: appointment.customerEmailProvided,
      },
    };
  } catch (error) {
    if (error instanceof AppointmentBookingError) {
      return {
        ok: false,
        message: error.message,
      };
    }

    console.warn("Appointment booking failed.", {
      errorName: error instanceof Error ? error.name : "UnknownError",
      errorMessage: error instanceof Error ? error.message : "Unknown booking failure",
    });

    return {
      ok: false,
      message: "We could not submit that appointment right now. Please try again or call the studio.",
    };
  }
}
