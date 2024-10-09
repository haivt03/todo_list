import { TodoItem } from "../../types/todos/todos.type";

export function TodoItems({ todo, onComplete }: TodoItem) {
  const handleChangeCompleted = () => {
    onComplete(todo.id);
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleChangeCompleted}
      />
      <span>{todo.title}</span>
    </li>
  );
}
