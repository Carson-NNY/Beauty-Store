import { z } from "zod";
import {
  calculateAppointmentEndTime,
  createAppointmentInputSchema,
  normalizePhone,
  type CreateAppointmentInput,
} from "@/modules/appointments/domain/appointment";
import {
  createAppointmentTransaction,
  createAppointmentSubmissionWithCustomer,
  findActiveServiceForBooking,
} from "@/modules/appointments/infrastructure/appointment-repository";
import { sendAppointmentSubmissionNotifications } from "@/modules/appointments/application/appointment-notifications";
import { serviceCategorySchema, type PublicService } from "@/modules/services/domain/service";

export type CreateAppointmentResult = {
  appointmentId: string;
  serviceName: string;
  preferredStartTime: Date;
  endTime: Date;
  customerName: string;
  customerEmail?: string;
  customerEmailProvided: boolean;
};

export class AppointmentBookingError extends Error {
  constructor(
    public readonly code: "invalid_input" | "service_not_found",
    message: string,
  ) {
    super(message);
    this.name = "AppointmentBookingError";
  }
}

export async function createAppointment(input: CreateAppointmentInput): Promise<CreateAppointmentResult> {
  const parsed = parseAppointmentInput(input);
  const customerPhone = normalizePhone(parsed.customerPhone);

  const { appointment, service } = await createAppointmentTransaction(async (tx) => {
    const service = await findActiveServiceForBooking(parsed.serviceId, tx);

    if (!service) {
      throw new AppointmentBookingError("service_not_found", "Choose an available service.");
    }

    const endTime = calculateAppointmentEndTime(parsed.preferredStartTime, service.durationMinutes);

    const appointment = await createAppointmentSubmissionWithCustomer(
      {
        service,
        customerName: parsed.customerName,
        customerPhone,
        customerEmail: parsed.customerEmail,
        preferredStartTime: parsed.preferredStartTime,
        endTime,
        notes: parsed.notes || undefined,
      },
      tx,
    );

    return { appointment, service };
  });

  const publicService: PublicService = {
    id: service.id,
    name: service.name,
    category: serviceCategorySchema.parse(service.category),
    description: service.description,
    durationMinutes: service.durationMinutes,
    priceCents: service.priceCents,
    imageUrl: service.imageUrl,
  };

  await sendAppointmentSubmissionNotifications({
    appointmentId: appointment.id,
    customerName: appointment.customerName,
    customerPhone: appointment.customerPhone,
    customerEmail: appointment.customerEmail ?? undefined,
    service: publicService,
    preferredStartTime: appointment.preferredStartTime,
    notes: appointment.notes ?? undefined,
  });

  return {
    appointmentId: appointment.id,
    serviceName: service.name,
    preferredStartTime: appointment.preferredStartTime,
    endTime: appointment.endTime,
    customerName: appointment.customerName,
    customerEmail: appointment.customerEmail ?? undefined,
    customerEmailProvided: Boolean(appointment.customerEmail),
  };
}

function parseAppointmentInput(input: CreateAppointmentInput) {
  try {
    return createAppointmentInputSchema.parse(input);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new AppointmentBookingError("invalid_input", error.issues[0]?.message ?? "Check your booking details.");
    }

    throw error;
  }
}
