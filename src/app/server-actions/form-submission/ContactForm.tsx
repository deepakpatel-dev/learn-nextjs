"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/actions/contact";
import {
  contactInitialState,
  type ContactState,
} from "@/lib/action-types";

// ── Submit button — must be a child of <form> to use useFormStatus ──────────
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
    >
      {pending && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}

// ── Field with inline error ──────────────────────────────────────────────────
const Field = ({
  label, name, type = "text", placeholder, rows, value, error,
}: {
  label: string; name: string; type?: string;
  placeholder?: string; rows?: number;
  value?: string; error?: string;
}) => {
  const base =
    "w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 transition " +
    (error
      ? "border-red-300 focus:ring-red-300 bg-red-50"
      : "border-gray-300 focus:ring-blue-300");

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {rows ? (
        <textarea
          name={name} rows={rows} placeholder={placeholder}
          defaultValue={value} className={base}
        />
      ) : (
        <input
          type={type} name={name} placeholder={placeholder}
          defaultValue={value} className={base}
        />
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// ── Main form component ──────────────────────────────────────────────────────
export default function ContactForm() {
  // useActionState:
  //   - wires submitContactForm as the form's action
  //   - state = last return value of the action (starts as contactInitialState)
  //   - action = the bound action to pass to <form action={...}>
  //   - isPending = true while the action is running (alternative to useFormStatus)
  const [state, action] = useActionState<ContactState, FormData>(
    submitContactForm,
    contactInitialState,
  );

  return (
    <div>
      {/* Success screen */}
      {state.status === "success" ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">✓</div>
          <h2 className="text-xl font-bold text-green-800 mb-2">Message sent!</h2>
          <p className="text-green-700 text-sm mb-6">{state.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-green-700 underline underline-offset-2"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form action={action} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-lg mb-1">Contact Form</h2>

          {/* Global error */}
          {state.status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              {state.message}
            </div>
          )}

            <Field
              label="Name" name="name" placeholder="John Doe"
              value={state?.values?.name} error={state?.errors?.name}
            />
            <Field
              label="Email" name="email" type="email" placeholder="john@example.com"
              value={state?.values?.email} error={state?.errors?.email}
            />
            <Field
              label="Phone Number" name="phone" type="number" placeholder="+91 7415571236"
              value={state?.values?.phone} error={state?.errors?.phone}
            />

          <Field
            label="Subject" name="subject" placeholder="How can we help?"
            value={state?.values?.subject} error={state?.errors?.subject}
          />

          <Field
            label="Message" name="message" rows={4}
            placeholder="Write your message here (min 10 characters)…"
            value={state?.values?.message} error={state?.errors?.message}
          />

          <SubmitButton />

          <p className="text-xs text-center text-gray-400 font-mono">
            Validation runs on the server — open Network tab to see the action call
          </p>
        </form>
      )}
    </div>
  );
}
