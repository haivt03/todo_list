import { useQuery } from "react-query";
import { fetchTodosByUserId } from "../../api/todo";
import { Todo } from "../../types/todos/todos.type";
import { useAuthStore } from "../store/useAuthStore";

export function useTodos() {
  const userId = useAuthStore((state) => state.userId);
  const parsedUserId = userId ? Number(userId) : NaN;

  const queryResult = useQuery<Todo[], Error>(
    ["todos", parsedUserId],
    () => fetchTodosByUserId(parsedUserId as number),
    {
      enabled: !!parsedUserId,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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
