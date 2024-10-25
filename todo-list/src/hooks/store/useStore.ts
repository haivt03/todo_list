import { create } from 'zustand';
import { Todo } from "@/types/todos/todos.type";
import { persist, createJSONStorage } from 'zustand/middleware'

type StoreState = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  setTodos: (todos: Todo[]) => void;
  updateTodo: (updatedTodo: Todo) => void;
  removeTodo: (todoId: number) => void;
};

export const useTodoStore = create<StoreState>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (todo) => set((state) => ({
        todos: [...state.todos, todo],
      })),
      setTodos: (todos) => set({ todos }),
      updateTodo: (updatedTodo) => set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo,
        ),
      })),
      removeTodo: (todoId) => set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== todoId),
      })),
    }),
    {
      name: 'todo-storage', 
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
