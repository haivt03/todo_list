import { useMutation, useQuery } from "react-query";
import {
  addTodos,
  deleteTodo,
  fetchTodosByUserId,
  updateTodo,
} from "../../api/todo";
import { Todo } from "../../types/todos/todos.type";
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
  const addTodoStore = useTodoStore((state) => state.addTodo);

  const mutation = useMutation<
    Todo,
    Error,
    { title: string; completed: boolean }
  >({
    mutationFn: async ({ title }) => {
      const userId = localStorage.getItem("userId");
      const parsedUserId = userId ? Number(userId) : NaN;

      if (!parsedUserId) {
        throw new Error("No userId found in localStorage");
      }

      const newTodo = await addTodos(title, parsedUserId);
      return newTodo;
    },
    onSuccess: (newTodo) => {
      addTodoStore(newTodo);
    },
    onError: (error) => {
      console.error("Failed to add todo", error.message);
    },
  });

  const handleAddTodo = async (title: string, completed: boolean) => {
    await mutation.mutateAsync({ title, completed });
  };

  return {
    handleAddTodo,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
}

export function useUpdateTodo() {
  const updateTodoStore = useTodoStore((state) => state.updateTodo);

  const mutation = useMutation<
    Todo,
    Error,
    { todoId: number; title: string; completed: boolean }
  >({
    mutationFn: async ({ todoId, title, completed }) => {
      const updatedTodo = await updateTodo(todoId, title, completed);
      return updatedTodo;
    },
    onSuccess(updatedTodo) {
      updateTodoStore(updatedTodo);
    },
    onError: (error) => {
      console.error("Failed to update todo:", error.message);
    },
  });
  const handleUpdateTodo = async (
    todoId: number,
    title: string,
    completed: boolean,
  ) => {
    await mutation.mutateAsync({ todoId, title, completed });
  };

  return {
    handleUpdateTodo,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
}

export function useDeleteTodo() {
  const removeTodoStore = useTodoStore((state) => state.removeTodo);

  const mutation = useMutation<void, Error, number>({
    mutationFn: async (todoId) => {
      await deleteTodo(todoId);
    },
    onSuccess: (_, todoId) => {
      removeTodoStore(todoId);
    },
    onError: (error) => {
      console.error("Failed to delete todo:", error.message);
      alert("Failed to delete todo: " + error.message);
    },
  });

  const handleDeleteTodo = async (todoId: number) => {
    await mutation.mutateAsync(todoId);
  };

  return {
    handleDeleteTodo,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
}
