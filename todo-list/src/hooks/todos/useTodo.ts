import { useMutation, useQuery, useQueryClient } from "react-query";
import { addTodos, fetchTodos } from "../../api/todo";
import { Todo } from "../../types/todos/todos.type";

export function useTodos(){
    return useQuery('todos', fetchTodos);
}

export function useAddTodo(){
  const queryClient = useQueryClient();
  return useMutation((data: Todo) => addTodos(data.title, data.completed, data.id), {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    },
  });
};


