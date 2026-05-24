// todo-store.ts — Module-level in-memory store
//
// In a real app this would be a database (Postgres, MongoDB, etc.).
// For this demo, a module-level array persists within the Node.js process.
// It resets on every `next dev` restart — that is expected for a demo.

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

// Seed data — available immediately without any action
const store: Todo[] = [
  { id: "1", text: "Learn Next.js Server Actions",     completed: true,  createdAt: new Date().toISOString() },
  { id: "2", text: "Build a full-stack app with RSC",  completed: false, createdAt: new Date().toISOString() },
  { id: "3", text: "Explore useOptimistic hook",       completed: false, createdAt: new Date().toISOString() },
];

export function getTodos(): Todo[] {
  return [...store]; // always return a copy
}

export function addTodo(text: string): Todo {
  const todo: Todo = {
    id: crypto.randomUUID(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  store.push(todo);
  return { ...todo };
}

export function toggleTodo(id: string): Todo | null {
  const todo = store.find((t) => t.id === id);
  if (!todo) return null;
  todo.completed = !todo.completed;
  return { ...todo };
}

export function deleteTodo(id: string): boolean {
  const idx = store.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  store.splice(idx, 1);
  return true;
}
