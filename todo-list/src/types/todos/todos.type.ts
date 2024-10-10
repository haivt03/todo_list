export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

export interface TodoItem {
  todo: Todo;
  onComplete: (id: number) => void;
}
