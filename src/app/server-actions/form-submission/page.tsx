// Route: /server-actions/form-submission
// Server Component — imports the Client Component form below.
// Keeping this as a Server Component means the page shell is static;
// only the interactive form ships client JS.

import ContactForm from "./ContactForm";

export default function FormSubmissionPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">
          useActionState + useFormStatus
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Form Submission</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Server-side form validation with zero API route. The{" "}
          <code className="font-mono bg-gray-100 px-1 rounded">submitContactForm</code> Server
          Action runs on the server, validates input, and returns a typed result back to the client.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Live form */}
        <ContactForm />

        {/* Explanation panel */}
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">How useActionState works</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`"use client";
import { useActionState } from "react";
import { submitContactForm, contactInitialState } from "@/actions/contact";

// useActionState wires the action to the form and
// tracks its return value as component state
const [state, action, isPending] = useActionState(
  submitContactForm,   // Server Action
  contactInitialState, // initial state shape
);

// Attach to the form
<form action={action}>
  <input name="name" defaultValue={state.values.name} />
  {state.errors.name && <p>{state.errors.name}</p>}
  <SubmitButton /> {/* reads isPending via useFormStatus */}
</form>`}</pre>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">How useFormStatus works</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`"use client";
import { useFormStatus } from "react-dom";

// Must be a CHILD of the <form> — reads the parent form's state
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}`}</pre>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h2 className="font-semibold text-blue-900 mb-2">Key rules</h2>
            <ul className="space-y-1.5 text-sm text-blue-800">
              {[
                "Server Action receives FormData — access values with formData.get('name')",
                "Validation runs on the server — cannot be bypassed by client",
                "Return errors map + preserved values so inputs don't reset",
                "useFormStatus must be inside the <form>, not beside it",
                "isPending from useActionState = true while action is running",
              ].map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="text-blue-500 shrink-0">✓</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
