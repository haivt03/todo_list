import { useAddTodo, useTodos } from "@/hooks/todos/useTodo";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TodoItem } from "./todoItem";
import { Todo } from "@/types/todos/todos.type";

export function TodoList() {
  const { todos, isLoading, isError } = useTodos();
  const { handleAddTodo, isLoading: isAdding } = useAddTodo();
  const [newTodo, setNewTodo] = useState("");

  const addNewTodo = () => {
    if (newTodo.trim()) {
      handleAddTodo(newTodo, false);
      setNewTodo("");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-500"></div>
        <p className="ml-4 text-gray-500">Loading todos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center">
        An error occurred while loading your todos. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4 flex space-x-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo..."
        />
        <Button onClick={addNewTodo} disabled={!newTodo.trim() || isAdding}>
          {isAdding ? "Adding..." : "Add Todo"}
        </Button>
      </div>

      <div className="space-y-2">
        {todos?.todos.length ? (
          todos.todos.map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <div className="text-gray-500 text-center">No todos available.</div>
        )}
      </div>
    </div>
  );
}
