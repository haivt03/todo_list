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
    mutationFn: async ({ title, completed }) => {
      const userId = localStorage.getItem("userId");
      const parsedUserId = userId ? Number(userId) : NaN;
      completed = false;
      if (!parsedUserId) {
        throw new Error("No userId found in localStorage");
      }
      const newTodo = await addTodos(title, completed, parsedUserId);
      addTodoStore(newTodo);
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

export function useUpdateTodo() {
  const updatedTodoStore = useTodoStore((state) => state.updateTodo);
  const mutation = useMutation<
    Todo,
    Error,
    { todoId: number; title: string; completed: boolean }
  >({
    mutationFn: async ({ todoId, title, completed }) => {
      const updatedTodo = await updateTodo(todoId, title, completed);
      updatedTodoStore(updatedTodo);
      return updatedTodo;
    },
    onError: (error) => {
      console.error("Failed to update todo:", error.message);
    },
  });
  const handleUpdateTodo = (
    todoId: number,
    title: string,
    completed: boolean,
  ) => {
    mutation.mutate({ todoId, title, completed });
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
      removeTodoStore(todoId);
    },
    onError: (error) => {
      console.error("Failed to delete todo:", error.message);
      alert("Failed to delete todo: " + error.message); // Optionally alert the user
    },
  });

  const handleDeleteTodo = (todoId: number) => {
    mutation.mutate(todoId);
  };

  return {
    handleDeleteTodo,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
}
