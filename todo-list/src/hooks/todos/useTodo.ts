import { useMutation, useQuery, useQueryClient, UseQueryResult } from "react-query";
import { addTodos, fetchTodosByUser } from "../../api/todo";
import { Todo } from "../../types/todos/todos.type";

export function useTodos(enabled: boolean): UseQueryResult<Todo[], Error> {
  return useQuery<Todo[], Error>(
    "todos", 
    fetchTodosByUser, 
    {
      retry: 2, 
      enabled, 
    }
  );
}
export function useAddTodo() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({title, completed}:{title: string, completed: boolean}):Promise<Todo> => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("No userId found in localStorage");
      }
      return await addTodos(title, completed, Number(userId));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
  return {
    addTodo: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
}
