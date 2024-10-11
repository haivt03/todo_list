import { useQuery } from "react-query";
import { useState } from "react";
import { addTodos, fetchTodosByUserId } from "../../api/todo";
import { Todo } from "../../types/todos/todos.type";

export function useTodos() {
  const userId = localStorage.getItem("userId");
  const queryResult = useQuery<Todo[], Error>(
    ["todos", userId],
    () => fetchTodosByUserId(Number(userId)),
    {
      enabled: !!userId,
      retry: 3,
      onError: (error) => {
        console.error("Error fetching todos:", error);
      },
    },
  );

  const { data: todos, error, isLoading, isError, isSuccess } = queryResult;
  return {
    todos,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch: queryResult.refetch,
  };
}

export function useAddTodo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleAddTodo = async (title: string, completed: boolean) => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("No userId found in localStorage");
      }

      const response = await addTodos(title, completed, Number(userId));
      setIsLoading(false);
      return response;
    } catch (err) {
      setIsLoading(false);
      setError("Failed to add todo");
    }
  };

  return { handleAddTodo, isLoading, error };
}
