import { TodoItemProps } from "../../types/todos/todos.type";
import { Checkbox } from "../ui/checkbox";

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <div className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors">
      <Checkbox checked={todo.completed} />
      <h1
        className={`ml-2 ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}
      >
        {todo.todo}
      </h1>
    </div>
  );
}
