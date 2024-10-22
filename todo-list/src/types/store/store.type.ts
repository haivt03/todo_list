import { Todo } from "../todos/todos.type";

export interface StoreState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  setTodos: (todos: Todo[]) => void;
  updateTodo: (updatedTodo: Todo) => void;
  removeTodo: (todoId: number) => void;
}
