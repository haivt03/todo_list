export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodoResponse {
  todos: Todo[];
}

export interface TodoItemProps {
  todo: Todo;
}

