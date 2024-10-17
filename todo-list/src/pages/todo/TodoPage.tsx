import { TodoList } from "@/components/todos/todoList";

export function TodoPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Todo List</h1>
        <TodoList />
      </div>
    </div>
  );
}
