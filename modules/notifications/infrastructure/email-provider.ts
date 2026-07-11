import type { EmailMessage, EmailProvider } from "@/modules/notifications/domain/email";

class ConsoleEmailProvider implements EmailProvider {
  async sendEmail(message: EmailMessage) {
    console.info("Email notification", {
      to: message.to,
      subject: message.subject,
      text: sanitizeConsoleEmailText(message.text),
    });
  }
}

class ResendEmailProvider implements EmailProvider {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
  ) {}

  async sendEmail(message: EmailMessage) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: this.from,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
      }),
    });

    if (!response.ok) {
      throw new Error(`Email provider failed with status ${response.status}`);
    }
  }
}

export function getEmailProvider(): EmailProvider {
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return new ConsoleEmailProvider();
  }

  return new ResendEmailProvider(apiKey, from);
}

function sanitizeConsoleEmailText(value: string) {
  return value
    .split("\n")
    .map((line) => (line.startsWith("Notes:") ? "Notes: [redacted for local logs]" : line))
    .join("\n");
}
