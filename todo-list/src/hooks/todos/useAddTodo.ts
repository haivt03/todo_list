import { useMutation } from "react-query";
import { useTodoStore } from "../store/useStore";
import { Todo } from "@/types/todos/todos.type";
import { addTodos } from "@/api/todo";

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
