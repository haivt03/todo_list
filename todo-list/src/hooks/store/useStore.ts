import { StoreState } from "@/types/store/store.type";
import { create } from "zustand";

export const useTodoStore = create<StoreState>((set) => ({
  todos: [],
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),
  setTodos: (todos) => set({ todos }),
  updateTodo: (updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id == updatedTodo.id ? updatedTodo : todo,
      ),
    })),
  removeTodo: (todoId) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id != todoId),
    })),
}));
