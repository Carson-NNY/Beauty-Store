import {
  createAdminLoginFingerprint,
  verifyAdminPassword,
} from "@/modules/admin/auth";
import {
  clearAdminLoginFailures,
  findActiveAdminLoginLock,
  saveAdminLoginFailure,
} from "@/modules/admin/infrastructure/admin-login-attempt-repository";

export type AdminAuthenticationResult =
  | { status: "authenticated" }
  | { status: "invalid"; remainingAttempts: number }
  | { status: "locked"; lockedUntil: Date };

export async function authenticateAdmin(
  password: string,
  sourceIdentifier: string,
  now = new Date(),
): Promise<AdminAuthenticationResult> {
  const fingerprint = createAdminLoginFingerprint(sourceIdentifier);
  const activeLock = await findActiveAdminLoginLock(fingerprint, now);

  if (activeLock) {
    return { status: "locked", lockedUntil: activeLock };
  }

  if (verifyAdminPassword(password)) {
    await clearAdminLoginFailures(fingerprint);
    return { status: "authenticated" };
  }

  const failure = await saveAdminLoginFailure(fingerprint, now);

  return failure.status === "locked"
    ? { status: "locked", lockedUntil: failure.lockedUntil }
    : { status: "invalid", remainingAttempts: failure.remainingAttempts };
}
