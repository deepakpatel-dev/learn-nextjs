"use client";

import { useOptimistic, useRef } from "react";
import { useFormStatus } from "react-dom";
import type { Todo } from "@/lib/todo-store";

// ── Add button with pending state ─────────────────────────────────────────
function AddButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-green-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2 shrink-0"
    >
      {pending && (
        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {pending ? "Adding…" : "Add"}
    </button>
  );
}

type Props = {
  initialTodos: Todo[];
  createAction: (formData: FormData) => Promise<void>;
  toggleAction:  (id: string) => Promise<void>;
  deleteAction:  (id: string) => Promise<void>;
};

export default function TodoClient({
  initialTodos,
  createAction,
  toggleAction,
  deleteAction,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  // useOptimistic: shows tentative state immediately; reverts on error
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    initialTodos,
    (state: Todo[], newTodo: Todo) => [...state, newTodo],
  );

  async function handleCreate(formData: FormData) {
    const text = (formData.get("text") as string)?.trim();
    if (!text) return;

    // Show optimistic item immediately — before server responds
    addOptimisticTodo({
      id:        "optimistic-" + Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    formRef.current?.reset();
    await createAction(formData); // revalidatePath → Server Component re-renders
  }

  return (
    <div>
      {/* Add form */}
      <form
        ref={formRef}
        action={handleCreate}
        className="flex gap-2 mb-5"
      >
        <input
          name="text"
          placeholder="Add a new todo…"
          required
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 transition"
        />
        <AddButton />
      </form>

      {/* Todo list */}
      <div className="space-y-2">
        {optimisticTodos.map((todo) => {
          const isOptimistic = todo.id.startsWith("optimistic-");
          // Bind id to the action so it doesn't need a form
          const boundToggle = toggleAction.bind(null, todo.id);
          const boundDelete = deleteAction.bind(null, todo.id);

          return (
            <div
              key={todo.id}
              className={`flex items-center gap-3 bg-white border rounded-xl px-4 py-3 transition-all ${
                isOptimistic
                  ? "border-green-200 opacity-60"
                  : todo.completed
                  ? "border-gray-200 opacity-75"
                  : "border-gray-200"
              }`}
            >
              {/* Toggle form */}
              <form action={boundToggle}>
                <button
                  type="submit"
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                    todo.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 hover:border-green-400"
                  }`}
                >
                  {todo.completed && <span className="text-xs">✓</span>}
                </button>
              </form>

              {/* Text */}
              <span
                className={`flex-1 text-sm ${
                  todo.completed ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {todo.text}
                {isOptimistic && (
                  <span className="ml-2 text-xs text-green-500 font-mono">(saving…)</span>
                )}
              </span>

              {/* Delete form */}
              {!isOptimistic && (
                <form action={boundDelete}>
                  <button
                    type="submit"
                    className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                    title="Delete"
                  >
                    ×
                  </button>
                </form>
              )}
            </div>
          );
        })}

        {optimisticTodos.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-8">No todos yet — add one above.</p>
        )}
      </div>

      <p className="text-xs text-gray-400 font-mono mt-4 text-center">
        {optimisticTodos.filter((t) => t.completed).length} / {optimisticTodos.length} completed
      </p>
    </div>
  );
}
