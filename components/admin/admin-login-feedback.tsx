"use client";

import { useSearchParams } from "next/navigation";

export function AdminLoginFeedback() {
  const searchParams = useSearchParams();
  const loginError = searchParams.get("loginError");

  if (!loginError) {
    return null;
  }

  const message =
    loginError === "locked"
      ? getLockedMessage(searchParams.get("retryAfter"))
      : "密码不正确。连续输错 5 次将锁定 30 分钟。";

  return (
    <p
      id="admin-login-feedback"
      role="alert"
      className="rounded-md border border-destructive/35 bg-destructive/10 px-3 py-2 text-sm leading-6 text-destructive"
    >
      {message}
    </p>
  );
}

function getLockedMessage(retryAfterValue: string | null) {
  const retryAfter = Number(retryAfterValue);
  const remainingMinutes = Number.isFinite(retryAfter)
    ? Math.max(1, Math.ceil((retryAfter - Date.now()) / 60_000))
    : 30;

  return `密码错误次数过多。请等待 ${remainingMinutes} 分钟后再试。`;
}
