import { Todo } from "../types/todos/todos.type";
import { safeFetch } from "./safeFetch";

export async function fetchTodosByUserId(userId: number): Promise<Todo[]> {
  const url = `${import.meta.env.VITE_API_URL}/todos/user/${userId}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Server error response", errorResponse);
      throw new Error(
        `Failed to fetch todos: ${response.status} ${response.statusText}`,
      );
    }
    const todos: Todo[] = await response.json();

    return todos;
  } catch (error) {
    console.error("Error while fetching todos:", error);
    throw new Error("An unexpected error occurred while fetching todos");
  }
}

export async function addTodos(
  title: string,
  completed: boolean,
  userID: number,
): Promise<Todo> {
  const url = `todos/add`;
  const option: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: title,
      completed: completed,
      userId: userID,
    }),
  };
  const todosResponse: Todo = await safeFetch<Todo>(url, option);
  return todosResponse;
}

export async function updateTodo(
  todoId: number,
  title: string,
  completed: boolean,
) {
  const url = `todos/${todoId}`;
  const option: RequestInit = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: title,
      completed: completed,
    }),
  };
  const todoUpdate: Todo = await safeFetch<Todo>(url, option);
  return todoUpdate;
}

export async function deleteTodo(todoId: number) {
  const url = `todos/${todoId}`;
  const option: RequestInit = {
    method: "DELETE",
  };

  try {
    await safeFetch<void>(url, option);
    alert(`Todo with id ${todoId} successfully deleted.`);
  } catch (error) {
    console.error("Error while deleting todo:", error);
    throw new Error("Failed to delete the todo: " + (error instanceof Error ? error.message : "Unknown error"));
  }
}

