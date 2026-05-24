"use client";
// Route: /server-actions/background-tasks
// Client Component — uses useActionState to track multi-step email simulation.

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendEmailAction } from "@/actions/email";
import { emailInitialState, type EmailState } from "@/lib/action-types";

function SendButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-orange-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
    >
      {pending && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
      {pending ? "Processing…" : "Send Email"}
    </button>
  );
}

export default function BackgroundTasksPage() {
  const [state, action] = useActionState<EmailState, FormData>(
    sendEmailAction,
    emailInitialState,
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded">
          async Server Action — multi-step background work
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Background Tasks</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Server Actions are plain async functions — they can run multiple sequential
          steps (validate → compile → send → log) before returning a result.
          The client waits with a loading state, then shows the outcome.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: email form + result */}
        <div className="space-y-4">
          <form action={action} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
            <h2 className="font-semibold text-lg">Send Email (Simulated)</h2>

            {state.status === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                {state.message}
              </div>
            )}

            {[
              { label: "To",      name: "to",      type: "email",    placeholder: "recipient@example.com" },
              { label: "Subject", name: "subject",  type: "text",     placeholder: "Hello from Next.js!" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input
                  name={name} type={type} placeholder={placeholder} required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
              <textarea
                name="body" rows={3} required
                placeholder="Write your email body here…"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition resize-none"
              />
            </div>

            <SendButton />
          </form>

          {/* Result */}
          {state.status === "sent" && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <p className="font-semibold text-green-800 mb-3">{state.message}</p>
              <div className="space-y-2">
                {state.simulatedSteps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-green-700">
                    <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
              <p className="text-xs text-green-600 font-mono mt-3">Sent at: {state.sentAt}</p>
            </div>
          )}
        </div>

        {/* Right: explanation */}
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">The Server Action</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`"use server";
export async function sendEmailAction(_, formData) {
  const to      = formData.get("to");
  const subject = formData.get("subject");
  const body    = formData.get("body");
  const steps   = [];

  // Step 1: validate
  await emailProvider.validate(to);
  steps.push("✓ Recipient validated");

  // Step 2: render template
  await emailProvider.compile(subject, body);
  steps.push("✓ Template compiled");

  // Step 3: send
  await emailProvider.send({ to, subject, body });
  steps.push("✓ Handed to SMTP");

  // Step 4: log
  await db.emailLogs.create({ to, sentAt: new Date() });
  steps.push("✓ Delivery logged");

  return { status: "sent", steps, sentAt: new Date() };
}`}</pre>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
            <h2 className="font-semibold text-orange-900 mb-2">Real-world use cases</h2>
            <ul className="space-y-1.5 text-sm text-orange-800">
              {[
                "Send transactional emails (Resend, SendGrid, Nodemailer)",
                "Queue background jobs (BullMQ, Inngest, Trigger.dev)",
                "Generate and upload PDFs to S3",
                "Sync data to third-party APIs (CRM, analytics)",
                "Process image uploads (resize, compress, store)",
                "Write audit logs after sensitive operations",
              ].map((u) => (
                <li key={u} className="flex gap-2">
                  <span className="text-orange-400 shrink-0">→</span>{u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
