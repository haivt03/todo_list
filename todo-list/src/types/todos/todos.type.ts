export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoItem {
  todo: Todo;
  onComplete: (id: number) => void;
}
