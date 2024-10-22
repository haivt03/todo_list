import { StoreState } from "@/types/store/store.type";
import { create } from "zustand";

export const useTodoStore = create<StoreState>((set) => ({
    todos: [],
    addTodo: (todo) =>
      set((state) => ({
        todos: [...state.todos, todo],
      })),
    setTodos: (todos) => set({ todos }),
  }));