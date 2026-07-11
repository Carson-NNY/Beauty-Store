import { CalendarDays, Clock, Inbox, ListChecks } from "lucide-react";
import {
  AppointmentCard,
  EmptyAppointments,
} from "@/components/admin/appointment-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { getAdminDashboardOverview } from "@/modules/appointments/application/admin-appointment-queries";

export default async function AdminHomePage() {
  const overview = await getAdminDashboardOverview();
  const upcomingPreview = overview.upcomingPreferredTimes.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">店主管理</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">预约提交</h1>
          <p className="mt-2 text-muted-foreground">查看顾客提交的预约信息，并手动联系顾客确认安排。</p>
        </div>
        <PendingLinkButton href="/admin/appointments">全部预约</PendingLinkButton>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CalendarDays} label="今日提交" value={overview.stats.todaysSubmissionCount} />
        <StatCard icon={Clock} label="未来预约时间" value={overview.stats.upcomingPreferredCount} />
        <StatCard icon={Inbox} label="本月提交" value={overview.stats.submissionsThisMonth} />
        <StatCard icon={ListChecks} label="全部提交" value={overview.stats.totalSubmissions} />
      </div>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>今天提交</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overview.todaysSubmissions.length > 0 ? (
              overview.todaysSubmissions.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} compact />
              ))
            ) : (
              <EmptyAppointments message="今天还没有预约提交。" />
            )}
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader className="flex-row items-center justify-between gap-3">
            <CardTitle>未来预约时间</CardTitle>
            <PendingLinkButton href="/admin/appointments" variant="outline" size="sm">
              查看全部
            </PendingLinkButton>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingPreview.length > 0 ? (
              upcomingPreview.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} compact />
              ))
            ) : (
              <EmptyAppointments message="目前没有未来预约时间。" />
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: true }>;
  label: string;
  value: number;
}) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex items-center gap-4 p-5">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-semibold tracking-normal">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
