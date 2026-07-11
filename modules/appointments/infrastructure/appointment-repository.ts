import type { Prisma, Service } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import type { AppointmentStatus } from "@/modules/appointments/domain/appointment";

type AppointmentTransaction = Prisma.TransactionClient;

export type AppointmentRecord = {
  id: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  preferredStartTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  notes: string | null;
};

export type AppointmentSummaryRecord = AppointmentRecord & {
  service: {
    id: string;
    name: string;
    durationMinutes: number;
    priceCents: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type AppointmentListFilters = {
  query?: string;
  dateFrom?: Date;
  dateTo?: Date;
  sort?: "createdAt_desc" | "preferredStartTime_asc";
};

export async function findActiveServiceForBooking(serviceId: string, tx: AppointmentTransaction = prisma) {
  return tx.service.findFirst({
    where: { id: serviceId, isActive: true },
  });
}

export async function createAppointmentSubmissionWithCustomer(
  input: {
    service: Service;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    preferredStartTime: Date;
    endTime: Date;
    notes?: string;
  },
  tx: AppointmentTransaction = prisma,
): Promise<AppointmentRecord> {
  const customer = await tx.customer.upsert({
    where: { phone: input.customerPhone },
    update: {
      name: input.customerName,
      email: input.customerEmail ?? null,
    },
    create: {
      name: input.customerName,
      phone: input.customerPhone,
      email: input.customerEmail ?? null,
    },
  });

  const appointment = await tx.appointment.create({
    data: {
      customerId: customer.id,
      serviceId: input.service.id,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail ?? null,
      preferredStartTime: input.preferredStartTime,
      endTime: input.endTime,
      status: "submitted",
      notes: input.notes || null,
    },
  });

  return appointment as AppointmentRecord;
}

export async function createAppointmentTransaction<T>(callback: (tx: AppointmentTransaction) => Promise<T>) {
  return prisma.$transaction(callback);
}

const appointmentInclude = {
  service: {
    select: {
      id: true,
      name: true,
      durationMinutes: true,
      priceCents: true,
    },
  },
} satisfies Prisma.AppointmentInclude;

export async function findAppointments(filters: AppointmentListFilters = {}): Promise<AppointmentSummaryRecord[]> {
  return prisma.appointment.findMany({
    where: buildAppointmentWhere(filters),
    include: appointmentInclude,
    orderBy: buildAppointmentOrderBy(filters.sort),
  }) as Promise<AppointmentSummaryRecord[]>;
}

export async function findAppointmentById(id: string): Promise<AppointmentSummaryRecord | null> {
  return prisma.appointment.findUnique({
    where: { id },
    include: appointmentInclude,
  }) as Promise<AppointmentSummaryRecord | null>;
}

export async function countAppointments(filters: AppointmentListFilters = {}) {
  return prisma.appointment.count({
    where: buildAppointmentWhere(filters),
  });
}

function buildAppointmentWhere(filters: AppointmentListFilters): Prisma.AppointmentWhereInput {
  const query = filters.query?.trim();

  return {
    OR: query
      ? [
          { customerName: { contains: query, mode: "insensitive" } },
          { customerPhone: { contains: query } },
        ]
      : undefined,
    preferredStartTime:
      filters.dateFrom || filters.dateTo
        ? {
            gte: filters.dateFrom,
            lte: filters.dateTo,
          }
        : undefined,
  };
}

function buildAppointmentOrderBy(sort: AppointmentListFilters["sort"]): Prisma.AppointmentOrderByWithRelationInput {
  if (sort === "preferredStartTime_asc") {
    return { preferredStartTime: "asc" };
  }

  return { createdAt: "desc" };
}
