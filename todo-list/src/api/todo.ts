import { Todo } from "../types/todos/todos.type";
import { safeFetch } from "./safeFetch";

export async function fetchTodosByUserId(userId: number): Promise<Todo[]> {
  const url = `todos/user/${userId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch todo");
  }
  const todo: Todo[] = await response.json();
  return todo;
}

export async function addTodos(
  title: string,
  completed: boolean,
  userID: number,
): Promise<Todo> {
  const url = `todos/add`
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
