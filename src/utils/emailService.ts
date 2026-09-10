export const DEFAULT_CONTACT_EMAIL = "bryantapel619@gmail.com";

export interface EmailPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface SendEmailResult {
  success: boolean;
  message: string;
  status: "sent" | "activation_pending" | "fallback";
  mailtoUrl: string;
}

export function buildMailtoUrl(payload: EmailPayload): string {
  const subject = payload.subject?.trim()
    ? payload.subject
    : `Portfolio Inquiry from ${payload.name || "Visitor"}`;

  const body = `Name: ${payload.name}
Email: ${payload.email}

Message:
${payload.message}

---
Sent via Bryan Tapel Portfolio (bryantapel.dev)`;

  return `mailto:${DEFAULT_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function sendContactEmail(
  payload: EmailPayload,
): Promise<SendEmailResult> {
  const mailtoUrl = buildMailtoUrl(payload);

  try {
    const response = await fetch(
      `https://formsubmit.co/ajax/${DEFAULT_CONTACT_EMAIL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          _replyto: payload.email,
          _subject: payload.subject?.trim()
            ? payload.subject
            : `Portfolio Message from ${payload.name}`,
          message: payload.message,
          _template: "table",
        }),
      },
    );

    const data = await response.json().catch(() => null);

    if (response.ok && data?.success === "true") {
      return {
        success: true,
        message: `Your message was delivered successfully to ${DEFAULT_CONTACT_EMAIL}.`,
        status: "sent",
        mailtoUrl,
      };
    }

    // FormSubmit initial activation required
    if (
      data?.message &&
      (data.message.includes("Activation") ||
        data.message.includes("activated"))
    ) {
      return {
        success: true,
        message: `Submission registered! An activation email was sent to ${DEFAULT_CONTACT_EMAIL} for webhook routing.`,
        status: "activation_pending",
        mailtoUrl,
      };
    }

    return {
      success: true,
      message: `Message prepared for ${DEFAULT_CONTACT_EMAIL}. You can also dispatch via your mail client below.`,
      status: "fallback",
      mailtoUrl,
    };
  } catch (err) {
    console.warn("FormSubmit endpoint error, using mailto fallback:", err);
    return {
      success: false,
      message: `Direct delivery service unavailable. Please send directly to ${DEFAULT_CONTACT_EMAIL} via your email app.`,
      status: "fallback",
      mailtoUrl,
    };
  }
}
