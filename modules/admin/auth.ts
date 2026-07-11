import { createHmac, timingSafeEqual } from "node:crypto";

export const adminSessionCookieName = "facial_admin_session";

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

function signAdminSession(secret: string) {
  return createHmac("sha256", secret).update("facial-admin-session-v1").digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;

  return timingSafeEqual(leftBuffer, rightBuffer);
}
