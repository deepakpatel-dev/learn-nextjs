"use server";
// email.ts — Server Action for background tasks (email simulation)
//
// Server Actions are async — they can do anything a server can:
// send emails, queue jobs, write files, call third-party APIs, etc.
// The client just awaits the action and gets back a result.
//
// ✅ EmailState & emailInitialState live in src/lib/action-types.ts
// Rule: only async functions may be exported from a "use server" file.

import type { EmailState } from "@/lib/action-types";

export async function sendEmailAction(
  prevState: EmailState,
  formData: FormData,
): Promise<EmailState> {
  const to      = (formData.get("to")      as string | null) ?? "";
  const subject = (formData.get("subject") as string | null) ?? "";
  const body    = (formData.get("body")    as string | null) ?? "";

  if (!to.includes("@") || !subject || !body) {
    return {
      ...prevState,
      status:  "error",
      message: "Please fill in all fields with a valid email address.",
    };
  }

  // ── Simulate background task steps ──────────────────────────────────────
  // In a real app these would be:
  //   1. await emailProvider.validate(to)
  //   2. await emailProvider.render(template, { subject, body })
  //   3. await emailProvider.send({ to, subject, html })
  //   4. await db.emailLogs.create({ to, subject, sentAt })

  const steps: string[] = [];

  await new Promise((r) => setTimeout(r, 400));
  steps.push("✓ Recipient address validated");

  await new Promise((r) => setTimeout(r, 400));
  steps.push("✓ Email template compiled");

  await new Promise((r) => setTimeout(r, 500));
  steps.push("✓ Handed off to SMTP provider");

  await new Promise((r) => setTimeout(r, 300));
  steps.push("✓ Delivery receipt received");

  return {
    status:         "sent",
    message:        `Email successfully sent to ${to}.`,
    sentTo:         to,
    sentAt:         new Date().toISOString(),
    simulatedSteps: steps,
  };
}
