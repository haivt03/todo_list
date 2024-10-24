import { useMutation } from "react-query";
import { useTodoStore } from "../store/useStore";
import { deleteTodo } from "@/api/todo";

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
