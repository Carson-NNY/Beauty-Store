import { prisma } from "@/lib/db/prisma";
import {
  recordAdminLoginFailure,
  type AdminLoginAttemptState,
  type AdminLoginFailureResult,
} from "@/modules/admin/auth";

export async function findActiveAdminLoginLock(fingerprint: string, now: Date) {
  const attempt = await prisma.adminLoginAttempt.findUnique({
    where: { fingerprint },
    select: { lockedUntil: true },
  });

  return attempt?.lockedUntil && attempt.lockedUntil.getTime() > now.getTime()
    ? attempt.lockedUntil
    : null;
}

export async function saveAdminLoginFailure(
  fingerprint: string,
  now: Date,
): Promise<AdminLoginFailureResult> {
  return prisma.$transaction(async (tx) => {
    const current = await tx.adminLoginAttempt.findUnique({
      where: { fingerprint },
      select: {
        failedAttempts: true,
        windowStartedAt: true,
        lockedUntil: true,
      },
    });
    const result = recordAdminLoginFailure(current satisfies AdminLoginAttemptState | null, now);

    await tx.adminLoginAttempt.upsert({
      where: { fingerprint },
      create: {
        fingerprint,
        ...result.nextState,
      },
      update: result.nextState,
    });

    return result;
  });
}

export async function clearAdminLoginFailures(fingerprint: string) {
  await prisma.adminLoginAttempt.deleteMany({
    where: { fingerprint },
  });
}
