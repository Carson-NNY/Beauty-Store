import { createHmac, timingSafeEqual } from "node:crypto";

export const adminSessionCookieName = "facial_admin_session";
export const adminLoginMaxFailures = 5;
export const adminLoginFailureWindowMs = 15 * 60 * 1000;
export const adminLoginLockDurationMs = 30 * 60 * 1000;

export type AdminLoginAttemptState = {
  failedAttempts: number;
  windowStartedAt: Date;
  lockedUntil: Date | null;
};

export type AdminLoginFailureResult =
  | {
      status: "invalid";
      remainingAttempts: number;
      nextState: AdminLoginAttemptState;
    }
  | {
      status: "locked";
      lockedUntil: Date;
      nextState: AdminLoginAttemptState;
    };

export function isAdminProtectionConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function createAdminSessionValue() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return "";

  return `admin.${signAdminSession(password)}`;
}

export function isValidAdminSession(value?: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  if (!value) return false;

  const expected = createAdminSessionValue();
  return safeEqual(value, expected);
}

export function verifyAdminPassword(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) return false;
  return safeEqual(password, configuredPassword);
}

export function createAdminLoginFingerprint(sourceIdentifier: string) {
  const secret = process.env.ADMIN_PASSWORD || "unconfigured-admin-password";

  return createHmac("sha256", secret)
    .update(`facial-admin-login:${sourceIdentifier}`)
    .digest("hex");
}

export function recordAdminLoginFailure(
  current: AdminLoginAttemptState | null,
  now: Date,
): AdminLoginFailureResult {
  if (current?.lockedUntil && current.lockedUntil.getTime() > now.getTime()) {
    return {
      status: "locked",
      lockedUntil: current.lockedUntil,
      nextState: current,
    };
  }

  const isWithinFailureWindow =
    current !== null &&
    now.getTime() - current.windowStartedAt.getTime() < adminLoginFailureWindowMs;
  const failedAttempts = isWithinFailureWindow ? current.failedAttempts + 1 : 1;
  const windowStartedAt = isWithinFailureWindow ? current.windowStartedAt : now;
  const lockedUntil =
    failedAttempts >= adminLoginMaxFailures
      ? new Date(now.getTime() + adminLoginLockDurationMs)
      : null;
  const nextState = {
    failedAttempts,
    windowStartedAt,
    lockedUntil,
  };

  if (lockedUntil) {
    return {
      status: "locked",
      lockedUntil,
      nextState,
    };
  }

  return {
    status: "invalid",
    remainingAttempts: adminLoginMaxFailures - failedAttempts,
    nextState,
  };
}

function signAdminSession(secret: string) {
  return createHmac("sha256", secret).update("facial-admin-session-v1").digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;

  return timingSafeEqual(leftBuffer, rightBuffer);
}
