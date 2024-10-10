import { Todo } from "../types/todos/todos.type";

export async function fetchTodosByUser() {
  const userId = localStorage.getItem("userId"); 
  if (!userId) {
    throw new Error("No user logged in");
  }

  const response = await fetch(`https://dummyjson.com/todos/user/${userId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}

export async function addTodos(
  title: string,
  completed: boolean,
  userID: number,
): Promise<Todo> {
  const response = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      titles: title,
      completeds: completed,
      userId: userID,
    }),
  });
  const data: Todo = await response.json();
  return data;
}
