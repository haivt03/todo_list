import { useMutation } from "react-query";
import { useTodoStore } from "../store/useStore";
import { Todo } from "@/types/todos/todos.type";
import { updateTodo } from "@/api/todo";

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
