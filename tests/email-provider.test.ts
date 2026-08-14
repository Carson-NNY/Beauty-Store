import test from "node:test";
import assert from "node:assert/strict";
import { getEmailProvider } from "../modules/notifications/infrastructure/email-provider.ts";

const originalEnvironment = {
  EMAIL_PROVIDER: process.env.EMAIL_PROVIDER,
  BREVO_API_KEY: process.env.BREVO_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_REPLY_TO: process.env.EMAIL_REPLY_TO,
};

test.afterEach(() => {
  restoreEnvironment();
});

test("Brevo provider sends the expected HTTP API payload", async () => {
  process.env.EMAIL_PROVIDER = "brevo";
  process.env.BREVO_API_KEY = "test-api-key";
  process.env.EMAIL_FROM = "Business Name <sender@example.com>";
  process.env.EMAIL_REPLY_TO = "replies@example.com";

  let request: { url: string; init?: RequestInit } | undefined;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    request = { url: String(url), init };
    return new Response(null, { status: 201 });
  };

  try {
    await getEmailProvider().sendEmail({
      to: "customer@example.com",
      subject: "Appointment information received",
      text: "English\n\n中文",
      html: "<p>English</p><p>中文</p>",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(request?.url, "https://api.brevo.com/v3/smtp/email");
  assert.deepEqual(request?.init?.headers, {
    accept: "application/json",
    "content-type": "application/json",
    "api-key": "test-api-key",
  });
  assert.deepEqual(JSON.parse(String(request?.init?.body)), {
    sender: { name: "Business Name", email: "sender@example.com" },
    to: [{ email: "customer@example.com" }],
    replyTo: { email: "replies@example.com" },
    subject: "Appointment information received",
    textContent: "English\n\n中文",
    htmlContent: "<p>English</p><p>中文</p>",
  });
});

test("missing Brevo API key uses the console fallback", async () => {
  process.env.EMAIL_PROVIDER = "brevo";
  delete process.env.BREVO_API_KEY;
  process.env.EMAIL_FROM = "sender@example.com";

  const originalConsoleInfo = console.info;
  let logged = false;
  console.info = () => {
    logged = true;
  };

  try {
    await getEmailProvider().sendEmail({
      to: "owner@example.com",
      subject: "网站新预约",
      text: "网站新预约",
    });
  } finally {
    console.info = originalConsoleInfo;
  }

  assert.equal(logged, true);
});

test("Brevo API errors reject the email operation", async () => {
  process.env.EMAIL_PROVIDER = "brevo";
  process.env.BREVO_API_KEY = "test-api-key";
  process.env.EMAIL_FROM = "sender@example.com";
  delete process.env.EMAIL_REPLY_TO;

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(null, { status: 400 });

  try {
    await assert.rejects(
      getEmailProvider().sendEmail({
        to: "owner@example.com",
        subject: "网站新预约",
        text: "网站新预约",
      }),
      /status 400/,
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

function restoreEnvironment() {
  for (const [name, value] of Object.entries(originalEnvironment)) {
    if (value === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = value;
    }
  }
}
