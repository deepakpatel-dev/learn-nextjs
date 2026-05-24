"use server";
// todos.ts — Server Actions for Todo CRUD
//
// revalidatePath() tells Next.js to purge the cached page so the Server
// Component re-runs and returns fresh data — no manual state management needed.

import { revalidatePath } from "next/cache";
import { addTodo, toggleTodo, deleteTodo } from "@/lib/todo-store";

const PATH = "/server-actions/data-mutations";

// ── Create ────────────────────────────────────────────────────────────────
export async function createTodoAction(formData: FormData): Promise<void> {
  const text = (formData.get("text") as string | null)?.trim();
  if (!text) return;

  // Simulate DB latency
  await new Promise((r) => setTimeout(r, 300));
  addTodo(text);

  // Purge cached page → Server Component re-fetches → fresh list rendered
  revalidatePath(PATH);
}

// ── Toggle ────────────────────────────────────────────────────────────────
// Called with an id bound to the action: toggleTodoAction.bind(null, id)
export async function toggleTodoAction(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 150));
  toggleTodo(id);
  revalidatePath(PATH);
}

// ── Delete ────────────────────────────────────────────────────────────────
export async function deleteTodoAction(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 150));
  deleteTodo(id);
  revalidatePath(PATH);
}
