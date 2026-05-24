"use server";
// contact.ts — Server Action for form submission
//
// "use server" at the top makes EVERY export in this file a Server Action.
// Rule: only async functions may be exported from a "use server" file.
// Types (erased at runtime) are allowed; plain objects are NOT.
//
// ✅ ContactState & contactInitialState live in src/lib/action-types.ts
// Used with: useActionState(submitContactForm, contactInitialState)

import type { ContactState } from "@/lib/action-types";

export async function submitContactForm(
  prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Read raw form values
  const name    = (formData.get("name")    as string | null) ?? "";
  const email   = (formData.get("email")   as string | null) ?? "";
  const phone   = (formData.get("phone")   as string | null) ?? "";
  const subject = (formData.get("subject") as string | null) ?? "";
  const message = (formData.get("message") as string | null) ?? "";

  const values = { name, email, subject, message };

  // ── Server-side validation ────────────────────────────────────────────────
  const errors: Record<string, string> = {};
  if (!name.trim())                             errors.name    = "Name is required.";
  if (!email.trim() || !email.includes("@"))    errors.email   = "A valid email is required.";
  if (!phone.trim())                            errors.phone   = "Phone number is required.";
  if (!subject.trim())                          errors.subject = "Subject is required.";
  if (!message.trim() || message.length < 10)   errors.message = "Message must be at least 10 characters.";

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the errors below.", errors, values };
  }

  // ── Simulate async work (DB write / email send) ───────────────────────────
  // In a real app: await db.messages.create({ name, email, subject, message })
  await new Promise((r) => setTimeout(r, 900));

  return {
    status:  "success",
    message: `Thanks ${name}! Your message has been received. We'll reply to ${email} soon.`,
    errors:  {},
    values:  {},
  };
}
