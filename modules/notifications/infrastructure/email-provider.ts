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

class BrevoEmailProvider implements EmailProvider {
  private readonly apiKey: string;
  private readonly from: string;
  private readonly replyTo?: string;

  constructor(apiKey: string, from: string, replyTo?: string) {
    this.apiKey = apiKey;
    this.from = from;
    this.replyTo = replyTo;
  }

  async sendEmail(message: EmailMessage) {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": this.apiKey,
      },
      body: JSON.stringify({
        sender: parseEmailAddress(this.from),
        to: [parseEmailAddress(message.to)],
        ...(this.replyTo ? { replyTo: parseEmailAddress(this.replyTo) } : {}),
        subject: message.subject,
        textContent: message.text,
        ...(message.html ? { htmlContent: message.html } : {}),
      }),
    });

    if (!response.ok) {
      throw new Error(`Email provider failed with status ${response.status}`);
    }
  }
}

export function getEmailProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER?.trim().toLowerCase();
  const apiKey = process.env.BREVO_API_KEY?.trim();

  if (provider !== "brevo" || !apiKey) {
    return new ConsoleEmailProvider();
  }

  return new BrevoEmailProvider(apiKey, process.env.EMAIL_FROM || "", process.env.EMAIL_REPLY_TO?.trim() || undefined);
}

function parseEmailAddress(value: string) {
  const trimmed = value.trim();
  const namedAddress = trimmed.match(/^(.+?)\s*<([^<>]+)>$/);

  if (namedAddress) {
    return {
      name: namedAddress[1].trim().replace(/^(["'])(.*)\1$/, "$2"),
      email: namedAddress[2].trim(),
    };
  }

  return { email: trimmed };
}

function sanitizeConsoleEmailText(value: string) {
  return value
    .split("\n")
    .map((line) => (line.startsWith("Notes:") ? "Notes: [redacted for local logs]" : line))
    .join("\n");
}
