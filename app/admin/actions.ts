"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminSessionCookieName,
  createAdminSessionValue,
} from "@/modules/admin/auth";
import { authenticateAdmin } from "@/modules/admin/application/authenticate-admin";

export async function loginAdminAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const requestHeaders = await headers();
  const authentication = await authenticateAdmin(
    password,
    getClientAddress(requestHeaders),
  );

  if (authentication.status === "locked") {
    redirect(`/admin?loginError=locked&retryAfter=${authentication.lockedUntil.getTime()}`);
  }

  if (authentication.status === "invalid") {
    redirect("/admin?loginError=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(adminSessionCookieName, createAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });

  redirect("/admin");
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(adminSessionCookieName);
  redirect("/admin");
}

function getClientAddress(requestHeaders: Headers) {
  const forwardedAddress = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();

  return forwardedAddress || requestHeaders.get("x-real-ip")?.trim() || "local-or-unknown";
}
