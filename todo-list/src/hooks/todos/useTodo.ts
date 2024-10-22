import { useMutation, useQuery } from "react-query";
import { addTodos, fetchTodosByUserId } from "../../api/todo";
import { Todo, TodoResponse } from "../../types/todos/todos.type";
import { useTodoStore } from "../store/useStore";

export function useTodos() {
  const userId = localStorage.getItem("userId");
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

  const {
    data: todos,
    error,
    isLoading,
    isError,
    isSuccess,
  } = queryResult;

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
  const addTodoStore = useTodoStore((state) => state.addTodo);
  const mutation = useMutation<
    Todo,
    Error,
    { title: string; completed: boolean }
  >({
    mutationFn: async ({ title, completed }) => {
      const userId = localStorage.getItem("userId");
      const parsedUserId = userId ? Number(userId) : NaN;
      completed = false;
      if (!parsedUserId) {
        throw new Error("No userId found in localStorage");
      }
      const newTodo = await addTodos(title, completed, parsedUserId);
      addTodoStore(newTodo)
      return newTodo;
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
