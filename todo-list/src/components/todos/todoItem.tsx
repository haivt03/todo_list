import { TodoItemProps } from "../../types/todos/todos.type";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";

export function TodoItem({ todo }: TodoItemProps) {
  const [completed, setCompleted] = useState(todo.completed);

  const handleToggle = () => {
    setCompleted(!completed);
  };

  return (
    <div className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors">
      <Checkbox checked={completed} onCheckedChange={handleToggle} />
      <h1
        className={`ml-2 ${completed ? "line-through text-gray-500" : "text-gray-800"}`}
      >
        {todo.todo}
      </h1>
    </div>
  );
}
