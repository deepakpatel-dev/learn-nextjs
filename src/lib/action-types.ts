// action-types.ts
// Shared types and initial states for Server Actions.
//
// ⚠️  Keep this file FREE of "use server" — it exports plain objects and types,
//     not async functions.  "use server" files may only export async functions.

// ── Contact form ─────────────────────────────────────────────────────────────

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Record<string, string>;
  values: Record<string, string>; // preserve inputs on validation error
};

export const contactInitialState: ContactState = {
  status:  "idle",
  message: "",
  errors:  {},
  values:  {},
};

// ── Email / background-tasks form ────────────────────────────────────────────

export type EmailState = {
  status: "idle" | "sending" | "sent" | "error";
  message: string;
  sentTo: string;
  sentAt: string;
  simulatedSteps: string[];
};

export const emailInitialState: EmailState = {
  status:         "idle",
  message:        "",
  sentTo:         "",
  sentAt:         "",
  simulatedSteps: [],
};
