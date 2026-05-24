// Route: /server-actions/data-mutations
// Server Component — reads todos from the in-memory store and renders them.
// After every mutation action, revalidatePath purges this page's cache
// so Next.js re-runs this component and returns fresh data automatically.

import { getTodos } from "@/lib/todo-store";
import { createTodoAction, toggleTodoAction, deleteTodoAction } from "@/actions/todos";
import TodoClient from "./TodoClient";

export default function DataMutationsPage() {
  // Runs on the server on every render after revalidatePath() is called
  const todos = getTodos();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-mono bg-green-100 text-green-800 px-2 py-1 rounded">
          revalidatePath + useOptimistic + useFormStatus
        </span>
        <h1 className="text-3xl font-bold mt-3 mb-2">Data Mutations</h1>
        <p className="text-gray-500 leading-relaxed max-w-2xl">
          Full Todo CRUD using Server Actions. After each mutation,{" "}
          <code className="font-mono bg-gray-100 px-1 rounded">revalidatePath()</code> tells
          Next.js to re-run this Server Component and return fresh data —
          no manual state sync required.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Interactive Todo list — Client Component handles UI */}
        <TodoClient
          initialTodos={todos}
          createAction={createTodoAction}
          toggleAction={toggleTodoAction}
          deleteAction={deleteTodoAction}
        />

        {/* Explanation */}
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">revalidatePath flow</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`// src/actions/todos.ts
"use server";
import { revalidatePath } from "next/cache";

export async function createTodoAction(formData: FormData) {
  const text = formData.get("text") as string;
  await db.todos.create({ text });          // mutate

  revalidatePath("/server-actions/data-mutations");
  // ↑ Next.js purges the page cache.
  //   On next render, the Server Component
  //   re-fetches and returns updated list.
}

export async function toggleTodoAction(id: string) {
  await db.todos.update(id, { completed: !current });
  revalidatePath("/server-actions/data-mutations");
}`}</pre>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-semibold mb-3">useOptimistic — instant UI</h2>
            <div className="bg-gray-900 text-gray-300 rounded-xl p-4 font-mono text-xs">
              <pre>{`"use client";
import { useOptimistic } from "react";

// Shows optimistic state while the server action runs.
// Reverts automatically if the action throws.
const [optimisticTodos, addOptimistic] = useOptimistic(
  todos,                         // real server state
  (state, newTodo: Todo) => [    // optimistic updater
    ...state,
    { ...newTodo, id: "temp" },
  ],
);

async function handleCreate(formData: FormData) {
  const text = formData.get("text") as string;
  addOptimistic({ text, completed: false }); // instant
  await createTodoAction(formData);           // real
}`}</pre>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <h2 className="font-semibold text-green-900 mb-2">What to observe</h2>
            <ul className="space-y-1.5 text-sm text-green-800">
              {[
                "Add a todo — it appears instantly (optimistic), then confirms from server",
                "Toggle / delete — instant UI update, server syncs in background",
                "Open Network tab — Server Actions appear as POST requests",
                "The page URL never changes — no navigation, pure mutation",
                "Refresh the page — changes persist (server store updated)",
              ].map((r) => (
                <li key={r} className="flex gap-2">
                  <span className="text-green-500 shrink-0">→</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
