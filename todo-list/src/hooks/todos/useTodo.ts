import { useMutation, useQuery } from "react-query";
import { addTodos, fetchTodosByUserId } from "../../api/todo";
import { Todo } from "../../types/todos/todos.type";

export function useTodos() {
  const userId = localStorage.getItem("userId");
  const parsedUserId = userId ? Number(userId) : NaN;
  const queryResult = useQuery<Todo[], Error>(
    ["todos", parsedUserId],
    () => fetchTodosByUserId(parsedUserId as number),
    {
      enabled: !!parsedUserId,
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
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
  const mutation = useMutation<
    Todo,
    Error,
    { title: string; completed: boolean }
  >({
    mutationFn: async ({ title, completed }) => {
      const userId = localStorage.getItem("userId");
      const parsedUserId = userId ? Number(userId) : NaN;
      if (!parsedUserId) {
        throw new Error("No userId found in localStorage");
      }
      return addTodos(title, completed, parsedUserId);
    },
    onError: (error) => {
      console.error("Failed to add todo", error.message);
    },
  });

  const handleAddTodo = (title: string, completed: boolean) => {
    mutation.mutate({ title, completed });
  };

  return {
    handleAddTodo,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
}
