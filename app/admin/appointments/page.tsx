import { AppointmentCard, AppointmentTable, EmptyAppointments } from "@/components/admin/appointment-display";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PendingSubmitButton } from "@/components/ui/pending-submit-button";
import { listAppointments } from "@/modules/appointments/application/admin-appointment-queries";

export const metadata = {
  title: "预约记录",
};

export default async function AdminAppointmentsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = (await searchParams) ?? {};
  const query = readParam(params, "q");
  const dateFrom = readParam(params, "dateFrom");
  const dateTo = readParam(params, "dateTo");
  const sort = readParam(params, "sort");
  const appointments = await listAppointments({ query, dateFrom, dateTo, sort });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">全部预约</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-normal">预约记录</h1>
        <p className="mt-2 text-muted-foreground">查看顾客提交的信息。可按姓名、电话、日期筛选。</p>
      </div>

      <div className="grid gap-3 rounded-lg border bg-card p-4">
        <form className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto]" action="/admin/appointments">
          <div className="grid gap-2">
            <Label htmlFor="q">搜索姓名或电话</Label>
            <Input id="q" name="q" type="search" defaultValue={query} placeholder="例如：王女士 / 5550188" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dateFrom">开始日期</Label>
            <Input id="dateFrom" name="dateFrom" type="date" defaultValue={dateFrom} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dateTo">结束日期</Label>
            <Input id="dateTo" name="dateTo" type="date" defaultValue={dateTo} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sort">排序</Label>
            <select
              id="sort"
              name="sort"
              defaultValue={sort || "createdAt_desc"}
              className="flex min-h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-base shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30 md:text-sm"
            >
              <option value="createdAt_desc">最新提交优先</option>
              <option value="preferredStartTime_asc">预约时间由近到远</option>
            </select>
          </div>
          <PendingSubmitButton className="self-end" pendingLabel="筛选中">
            筛选
          </PendingSubmitButton>
        </form>
      </div>

      {appointments.length > 0 ? (
        <>
          <AppointmentTable appointments={appointments} />
          <div className="grid gap-3 md:hidden">
            {appointments.map((appointment) => <AppointmentCard key={appointment.id} appointment={appointment} />)}
          </div>
        </>
      ) : (
        <EmptyAppointments message="没有找到符合条件的预约提交。" />
      )}
    </div>
  );
}

function readParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return typeof value === "string" ? value : undefined;
}
