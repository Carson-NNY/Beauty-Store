import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
  calculateAppointmentEndTime,
  createAppointmentInputSchema,
  normalizePhone,
  type CreateAppointmentInput,
} from "@/modules/appointments/domain/appointment";
import { sendAppointmentSubmissionNotifications } from "@/modules/appointments/application/appointment-notifications";
import {
  createAppointmentTransaction,
  createAppointmentSubmissionWithCustomer,
  findActiveServiceForBooking,
} from "@/modules/appointments/infrastructure/appointment-repository";
import { defaultServices } from "@/modules/services/domain/default-services";
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

  try {
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
  } catch (error) {
    if (!isDatabaseConnectionError(error)) {
      throw error;
    }

    return createEmailOnlyAppointment(parsed, customerPhone);
  }
}

async function createEmailOnlyAppointment(
  parsed: ReturnType<typeof parseAppointmentInput>,
  customerPhone: string,
): Promise<CreateAppointmentResult> {
  const service = defaultServices.find((candidate) => candidate.id === parsed.serviceId);

  if (!service) {
    throw new AppointmentBookingError("service_not_found", "Choose an available service.");
  }

  const appointmentId = `email-${randomUUID()}`;
  const endTime = calculateAppointmentEndTime(parsed.preferredStartTime, service.durationMinutes);

  await sendAppointmentSubmissionNotifications({
    appointmentId,
    customerName: parsed.customerName,
    customerPhone,
    customerEmail: parsed.customerEmail,
    service,
    preferredStartTime: parsed.preferredStartTime,
    notes: parsed.notes || undefined,
  });

  return {
    appointmentId,
    serviceName: service.name,
    preferredStartTime: parsed.preferredStartTime,
    endTime,
    customerName: parsed.customerName,
    customerEmail: parsed.customerEmail,
    customerEmailProvided: Boolean(parsed.customerEmail),
  };
}

function isDatabaseConnectionError(error: unknown) {
  if (!(error instanceof Error)) return false;

  if (error.name === "PrismaClientInitializationError") return true;

  const code = "code" in error ? error.code : undefined;
  return typeof code === "string" && ["P1000", "P1001", "P1002", "P1003", "P1011", "P1017"].includes(code);
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
