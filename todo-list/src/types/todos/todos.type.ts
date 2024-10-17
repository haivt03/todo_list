export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodoResponse {
  todos: Todo[];
  total: number;
}

export interface TodoItemProps {
  todo: Todo;
}

