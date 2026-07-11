export type EmailMessage = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

export type EmailProvider = {
  sendEmail(message: EmailMessage): Promise<void>;
};
