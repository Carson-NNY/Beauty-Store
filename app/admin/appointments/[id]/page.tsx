import { notFound } from "next/navigation";
import {
  DetailRow,
  formatAppointmentTime,
  formatFullAppointmentDateTime,
} from "@/components/admin/appointment-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PendingLinkButton } from "@/components/ui/pending-link-button";
import { getAppointmentDetail } from "@/modules/appointments/application/admin-appointment-queries";

export const metadata = {
  title: "预约详情",
};

export default async function AdminAppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointment = await getAppointmentDetail(id);

  if (!appointment) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <PendingLinkButton href="/admin/appointments" variant="link" className="h-auto px-0">
            返回全部预约
          </PendingLinkButton>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-normal">预约详情</h1>
          </div>
        </div>
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>客户信息</CardTitle>
        </CardHeader>
        <CardContent>
          <dl>
            <DetailRow label="姓名" value={appointment.customerName} />
            <DetailRow label="电话" value={appointment.customerPhone} />
            <DetailRow label="邮箱" value={appointment.customerEmail} />
            <DetailRow label="提交时间" value={formatFullAppointmentDateTime(appointment.createdAt)} />
          </dl>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>服务项目</CardTitle>
        </CardHeader>
        <CardContent>
          <dl>
            <DetailRow label="服务" value={appointment.service.name} />
            <DetailRow label="预约日期时间" value={formatFullAppointmentDateTime(appointment.preferredStartTime)} />
            <DetailRow label="预约时间" value={formatAppointmentTime(appointment.preferredStartTime)} />
            <DetailRow label="备注" value={appointment.notes} />
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
