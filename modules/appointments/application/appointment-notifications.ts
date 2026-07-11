import type { PublicService } from "@/modules/services/domain/service";
import { businessProfile } from "@/lib/mock-data/customer";
import { getEmailProvider } from "@/modules/notifications/infrastructure/email-provider";

type BookedAppointmentNotification = {
  appointmentId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  service: PublicService;
  preferredStartTime: Date;
  notes?: string;
};

export async function sendAppointmentSubmissionNotifications(input: BookedAppointmentNotification) {
  const provider = getEmailProvider();
  const ownerEmail = process.env.OWNER_EMAIL;
  const business = getBusinessContact();
  const dateTime = formatAppointmentDateTime(input.preferredStartTime);
  const adminAppointmentUrl = buildAdminAppointmentUrl(input.appointmentId);

  const sendOperations: Promise<void>[] = [];

  if (ownerEmail) {
    sendOperations.push(
      provider.sendEmail({
        to: ownerEmail,
        subject: `新的预约提交：${input.service.name} · ${dateTime}`,
        text: buildOwnerEmailText(input, dateTime),
        html: buildOwnerEmailHtml(input, dateTime, adminAppointmentUrl),
      }),
    );
  } else {
    console.warn("Owner booking email skipped because OWNER_EMAIL is not configured.", {
      appointmentId: input.appointmentId,
    });
  }

  if (input.customerEmail) {
    sendOperations.push(
      provider.sendEmail({
        to: input.customerEmail,
        subject: "Appointment information received / 已收到您的预约信息",
        text: buildCustomerEmailText(input, business, dateTime),
        html: buildCustomerEmailHtml(input, business, dateTime),
      }),
    );
  }

  const results = await Promise.allSettled(sendOperations);

  if (results.some((result) => result.status === "rejected")) {
    console.warn("Appointment email notification failed after submission was saved.", {
      appointmentId: input.appointmentId,
      ownerEmailConfigured: Boolean(ownerEmail),
      customerEmailProvided: Boolean(input.customerEmail),
    });
  }
}

function buildCustomerEmailText(input: BookedAppointmentNotification, business: BusinessContact, dateTime: string) {
  return [
    `Hi ${input.customerName},`,
    "",
    "Thank you for choosing us! We’re happy to let you know that we’ve received your appointment request.",
    "",
    `Service: ${input.service.name}`,
    `Appointment time: ${dateTime}`,
    `Address: ${business.address}`,
    `Phone: ${business.phone}`,
    "",
    "We’ll review your appointment information shortly and contact you if any adjustments are needed. We look forward to seeing you!",
    "",
    "Warmly,",
    business.name,
    "",
    "---",
    "",
    `您好 ${input.customerName}，`,
    "",
    "感谢您选择我们！我们已经收到您的预约信息啦。",
    "",
    `服务项目：${input.service.name}`,
    `预约时间：${dateTime}`,
    `地址：${business.address}`,
    `电话：${business.phone}`,
    "",
    "我们会尽快查看您的预约信息。如时间需要调整，我们会及时与您联系。期待与您见面！",
    "",
    "祝您生活愉快！",
    business.name,
  ].join("\n");
}

function buildOwnerEmailText(input: BookedAppointmentNotification, dateTime: string) {
  return [
    "新的预约提交",
    "",
    "顾客信息：",
    `- 姓名：${input.customerName}`,
    `- 电话：${input.customerPhone}`,
    `- 邮箱：${input.customerEmail || "未填写"}`,
    "",
    "预约信息：",
    `- 服务项目：${input.service.name}`,
    `- 预约时间：${dateTime}`,
    `- 备注：${input.notes || "无"}`,
    "",
    "请根据实际情况联系顾客确认或调整时间。",
  ].join("\n");
}

function buildOwnerEmailHtml(input: BookedAppointmentNotification, dateTime: string, adminAppointmentUrl: string) {
  const customerEmail = input.customerEmail || "";

  return emailShell([
    `<h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#1f3028;">新的预约提交</h1>`,
    `<h2 style="margin:20px 0 8px;font-size:16px;color:#352820;">顾客信息</h2>`,
    `<p style="margin:6px 0;"><strong>姓名：</strong>${escapeHtml(input.customerName)}</p>`,
    `<p style="margin:6px 0;"><strong>电话：</strong><a href="tel:${escapeAttribute(input.customerPhone)}" style="color:#1f5f4b;">${escapeHtml(input.customerPhone)}</a></p>`,
    `<p style="margin:6px 0;"><strong>邮箱：</strong>${
      customerEmail
        ? `<a href="mailto:${escapeAttribute(customerEmail)}" style="color:#1f5f4b;">${escapeHtml(customerEmail)}</a>`
        : "未填写"
    }</p>`,
    `<h2 style="margin:20px 0 8px;font-size:16px;color:#352820;">预约信息</h2>`,
    `<p style="margin:6px 0;"><strong>服务项目：</strong>${escapeHtml(input.service.name)}</p>`,
    `<p style="margin:6px 0;"><strong>预约时间：</strong>${escapeHtml(dateTime)}</p>`,
    `<p style="margin:6px 0;"><strong>备注：</strong>${escapeHtml(input.notes || "无").replace(/\n/g, "<br />")}</p>`,
    `<p style="margin:20px 0 0;">请根据实际情况联系顾客确认或调整时间。</p>`,
    `<p style="margin:18px 0 0;"><a href="${escapeAttribute(adminAppointmentUrl)}" style="display:inline-block;border-radius:8px;background:#1f5f4b;color:#ffffff;padding:11px 16px;text-decoration:none;">查看预约记录</a></p>`,
  ].join(""));
}

function buildCustomerEmailHtml(input: BookedAppointmentNotification, business: BusinessContact, dateTime: string) {
  return emailShell([
    `<p style="margin:0 0 12px;">Hi ${escapeHtml(input.customerName)},</p>`,
    `<p style="margin:0 0 14px;">Thank you for choosing us! We’re happy to let you know that we’ve received your appointment request.</p>`,
    `<p style="margin:6px 0;"><strong>Service:</strong> ${escapeHtml(input.service.name)}</p>`,
    `<p style="margin:6px 0;"><strong>Appointment time:</strong> ${escapeHtml(dateTime)}</p>`,
    `<p style="margin:6px 0;"><strong>Address:</strong> ${escapeHtml(business.address)}</p>`,
    `<p style="margin:6px 0;"><strong>Phone:</strong> ${escapeHtml(business.phone)}</p>`,
    `<p style="margin:14px 0;">We’ll review your appointment information shortly and contact you if any adjustments are needed. We look forward to seeing you!</p>`,
    `<p style="margin:0 0 22px;">Warmly,<br />${escapeHtml(business.name)}</p>`,
    `<hr style="border:none;border-top:1px solid #e5ded4;margin:22px 0;" />`,
    `<p style="margin:0 0 12px;">您好 ${escapeHtml(input.customerName)}，</p>`,
    `<p style="margin:0 0 14px;">感谢您选择我们！我们已经收到您的预约信息啦。</p>`,
    `<p style="margin:6px 0;"><strong>服务项目：</strong>${escapeHtml(input.service.name)}</p>`,
    `<p style="margin:6px 0;"><strong>预约时间：</strong>${escapeHtml(dateTime)}</p>`,
    `<p style="margin:6px 0;"><strong>地址：</strong>${escapeHtml(business.address)}</p>`,
    `<p style="margin:6px 0;"><strong>电话：</strong>${escapeHtml(business.phone)}</p>`,
    `<p style="margin:14px 0;">我们会尽快查看您的预约信息。如时间需要调整，我们会及时与您联系。期待与您见面！</p>`,
    `<p style="margin:0;">祝您生活愉快！<br />${escapeHtml(business.name)}</p>`,
  ].join(""));
}

type BusinessContact = {
  name: string;
  address: string;
  phone: string;
};

function getBusinessContact(): BusinessContact {
  return {
    name: process.env.BUSINESS_NAME || businessProfile.name,
    address: process.env.BUSINESS_ADDRESS || businessProfile.address,
    phone: process.env.BUSINESS_PHONE || businessProfile.phone,
  };
}

function formatAppointmentDateTime(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function buildAdminAppointmentUrl(appointmentId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  const path = `/admin/appointments/${appointmentId}`;

  return baseUrl ? `${baseUrl}${path}` : path;
}

function emailShell(content: string) {
  return [
    `<div style="margin:0;background:#f8f5ef;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#2f2721;">`,
    `<div style="max-width:560px;margin:0 auto;border:1px solid #e5ded4;border-radius:12px;background:#fffdf8;padding:22px;line-height:1.65;font-size:16px;">`,
    content,
    `</div>`,
    `</div>`,
  ].join("");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value: string) {
  return encodeURI(value.replace(/"/g, ""));
}
