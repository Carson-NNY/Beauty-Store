import { CalendarDays, Clock, Mail, Phone, UserRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { cn } from "@/lib/utils";
import type { AdminAppointment } from "@/modules/appointments/application/admin-appointment-queries";

export function AppointmentCard({ appointment, compact = false }: { appointment: AdminAppointment; compact?: boolean }) {
  return (
    <Card className="shadow-none">
      <CardContent className={cn("space-y-4 p-4 sm:p-5", compact && "space-y-3")}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold tracking-normal">{appointment.customerName}</h3>
            </div>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              <span className="font-medium text-foreground">服务项目：</span>
              {appointment.service.name}
            </p>
          </div>
          <PendingLinkButton href={`/admin/appointments/${appointment.id}`} variant="outline" size="sm">
            查看详情
          </PendingLinkButton>
        </div>

        <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <InfoLine icon={CalendarDays} value={formatAppointmentDate(appointment.preferredStartTime)} />
          <InfoLine icon={Clock} value={formatAppointmentTime(appointment.preferredStartTime)} />
          <ContactLine icon={Phone} href={`tel:${appointment.customerPhone}`} value={appointment.customerPhone} />
          {appointment.customerEmail ? (
            <ContactLine icon={Mail} href={`mailto:${appointment.customerEmail}`} value={appointment.customerEmail} />
          ) : null}
        </div>

        {!compact ? (
          <div className="space-y-2 border-t pt-3 text-sm leading-6 text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">提交时间：</span>
              {formatFullAppointmentDateTime(appointment.createdAt)}
            </p>
            {appointment.notes ? (
              <p className="line-clamp-3">
                <span className="font-medium text-foreground">备注：</span>
                {appointment.notes}
              </p>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

export function AppointmentTable({ appointments }: { appointments: AdminAppointment[] }) {
  return (
    <div className="hidden overflow-hidden rounded-lg border bg-card md:block">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/60 text-xs font-semibold text-muted-foreground">
          <tr>
            <Th>顾客姓名</Th>
            <Th>电话</Th>
            <Th>邮箱</Th>
            <Th>服务项目</Th>
            <Th>预约时间</Th>
            <Th>备注</Th>
            <Th>提交时间</Th>
            <Th>详情</Th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="align-top">
              <Td className="font-semibold text-foreground">{appointment.customerName}</Td>
              <Td>
                <a href={`tel:${appointment.customerPhone}`} className="font-medium text-primary underline-offset-4 hover:underline">
                  {appointment.customerPhone}
                </a>
              </Td>
              <Td>
                {appointment.customerEmail ? (
                  <a href={`mailto:${appointment.customerEmail}`} className="text-primary underline-offset-4 hover:underline">
                    {appointment.customerEmail}
                  </a>
                ) : (
                  <span className="text-muted-foreground">未填写</span>
                )}
              </Td>
              <Td>{appointment.service.name}</Td>
              <Td>{formatFullAppointmentDateTime(appointment.preferredStartTime)}</Td>
              <Td className="max-w-64">
                <span className="line-clamp-3 text-muted-foreground">{appointment.notes || "无"}</span>
              </Td>
              <Td>{formatFullAppointmentDateTime(appointment.createdAt)}</Td>
              <Td>
                <PendingLinkButton href={`/admin/appointments/${appointment.id}`} variant="outline" size="sm">
                  查看
                </PendingLinkButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EmptyAppointments({ message }: { message: string }) {
  return (
    <div className="rounded-lg border bg-card px-5 py-8 text-center text-sm leading-6 text-muted-foreground">
      {message}
    </div>
  );
}

function InfoLine({
  icon: Icon,
  value,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: true }>;
  value: string;
}) {
  return (
    <p className="flex min-w-0 items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      <span className="truncate">{value}</span>
    </p>
  );
}

function ContactLine({
  icon: Icon,
  href,
  value,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: true }>;
  href: string;
  value: string;
}) {
  return (
    <p className="flex min-w-0 items-center gap-2">
      <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
      <a href={href} className="truncate font-medium text-primary underline-offset-4 hover:underline">
        {value}
      </a>
    </p>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3">{children}</th>;
}

function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn("px-4 py-4 leading-6", className)}>{children}</td>;
}

export function formatAppointmentDate(value: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(value);
}

export function formatAppointmentTime(value: Date) {
  const formatter = new Intl.DateTimeFormat("zh-CN", {
    hour: "numeric",
    minute: "2-digit",
  });

  return formatter.format(value);
}

export function formatFullAppointmentDateTime(value: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

export function DetailRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="grid gap-1 border-b border-border/70 py-3 last:border-0">
      <dt className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <UserRound className="h-4 w-4 text-primary" aria-hidden />
        {label}
      </dt>
      <dd className="text-base font-semibold leading-7 text-foreground">{value || "未填写"}</dd>
    </div>
  );
}
