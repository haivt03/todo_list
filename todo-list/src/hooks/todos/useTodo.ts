import { useQuery } from "react-query";
import { useState } from "react";
import { addTodos, fetchTodosByUser } from "../../api/todo";

export function useTodos() {
  return useQuery("todos", fetchTodosByUser);
}

export function useAddTodo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleAddTodo = async (title: string, completed: boolean) => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('No userId found in localStorage');
      }

      const response = await addTodos(title, completed, Number(userId));
      setIsLoading(false);
      return response;
    } catch (err) {
      setIsLoading(false);
      setError('Failed to add todo');
    }
  };

  return { handleAddTodo, isLoading, error };
}
