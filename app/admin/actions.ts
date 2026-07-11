"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminSessionCookieName,
  createAdminSessionValue,
  verifyAdminPassword,
} from "@/modules/admin/auth";

export async function loginAdminAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
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
