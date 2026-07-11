import {
  countAppointments,
  findAppointmentById,
  findAppointments,
  type AppointmentSummaryRecord,
} from "@/modules/appointments/infrastructure/appointment-repository";

export type AppointmentListInput = {
  query?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: string;
};

export async function listAppointments(input: AppointmentListInput = {}) {
  return findAppointments(parseAppointmentFilters(input));
}

export async function getAppointmentDetail(id: string) {
  if (!id.trim()) return null;
  return findAppointmentById(id);
}

export async function getAdminDashboardOverview(now = new Date()) {
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

  const [todaysSubmissions, upcomingPreferredTimes, submissionsThisMonth, totalSubmissions] = await Promise.all([
    findAppointments({ dateFrom: todayStart, dateTo: todayEnd }),
    findAppointments({ dateFrom: now, sort: "preferredStartTime_asc" }),
    countAppointments({ dateFrom: monthStart, dateTo: monthEnd }),
    countAppointments(),
  ]);

  return {
    todaysSubmissions,
    upcomingPreferredTimes,
    stats: {
      todaysSubmissionCount: todaysSubmissions.length,
      upcomingPreferredCount: upcomingPreferredTimes.length,
      submissionsThisMonth,
      totalSubmissions,
    },
  };
}

export type AdminAppointment = AppointmentSummaryRecord;

function parseAppointmentFilters(input: AppointmentListInput) {
  return {
    query: parseQuery(input.query),
    dateFrom: parseDate(input.dateFrom, "start"),
    dateTo: parseDate(input.dateTo, "end"),
    sort: parseSort(input.sort),
  };
}

function parseQuery(value: string | undefined) {
  const query = value?.trim();
  return query ? query.slice(0, 80) : undefined;
}

function parseSort(value: string | undefined): "createdAt_desc" | "preferredStartTime_asc" {
  return value === "preferredStartTime_asc" ? "preferredStartTime_asc" : "createdAt_desc";
}

function parseDate(value: string | undefined, boundary: "start" | "end") {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;

  return boundary === "start"
    ? new Date(year, month - 1, day, 0, 0, 0, 0)
    : new Date(year, month - 1, day, 23, 59, 59, 999);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
}

function endOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}
