import { TodoItem } from "../../types/todos/todos.type";

export function TodoItems({ todo, onComplete }: TodoItem) {
  const handleChangeCompleted = () => {
    onComplete(todo.id);
  };

  return (
    <li className="flex items-center space-x-4 p-2 border-b border-gray-200">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleChangeCompleted}
        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-0"
      />
      <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
        {todo.title}
      </span>
    </li>
  );
}
