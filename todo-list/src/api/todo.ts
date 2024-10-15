import { Todo } from "../types/todos/todos.type";
import { safeFetch } from "./safeFetch";

export async function fetchTodosByUserId(userId: number): Promise<Todo[]> {
  const url = `/todos/user/${userId}`;
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
  const url = `/todos/add`;
  const option: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titles: title,
      completeds: completed,
      userId: userID,
    }),
  };
  const todosResponse: Todo = await safeFetch<Todo>(url, option);
  return todosResponse;
}
