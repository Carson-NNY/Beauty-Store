import test from "node:test";
import assert from "node:assert/strict";
import {
  adminLoginLockDurationMs,
  recordAdminLoginFailure,
  type AdminLoginAttemptState,
} from "../modules/admin/auth.ts";

test("five admin password failures within the window lock login for thirty minutes", () => {
  const now = new Date("2026-07-26T06:00:00.000Z");
  let state: AdminLoginAttemptState | null = null;

  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const result = recordAdminLoginFailure(state, new Date(now.getTime() + attempt * 1000));
    state = result.nextState;

    if (attempt < 5) {
      assert.equal(result.status, "invalid");
    } else {
      assert.equal(result.status, "locked");
      assert.equal(
        result.lockedUntil.getTime(),
        now.getTime() + 5000 + adminLoginLockDurationMs,
      );
    }
  }
});

test("admin password failure count resets outside the fifteen-minute window", () => {
  const firstAttempt = new Date("2026-07-26T06:00:00.000Z");
  const staleState: AdminLoginAttemptState = {
    failedAttempts: 4,
    windowStartedAt: firstAttempt,
    lockedUntil: null,
  };
  const result = recordAdminLoginFailure(
    staleState,
    new Date("2026-07-26T06:16:00.000Z"),
  );

  assert.equal(result.status, "invalid");
  assert.equal(result.nextState.failedAttempts, 1);
});
