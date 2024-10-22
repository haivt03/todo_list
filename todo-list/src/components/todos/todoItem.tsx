import { useDeleteTodo, useUpdateTodo } from "@/hooks/todos/useTodo";
import { TodoItemProps } from "../../types/todos/todos.type";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { useTodoStore } from "@/hooks/store/useStore";

export function TodoItem({ todo }: TodoItemProps) {
  const [completed, setCompleted] = useState(todo.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.todo);
  const { handleUpdateTodo, isLoading: isUpdating } = useUpdateTodo();
  const { handleDeleteTodo, isLoading: isDeleting } = useDeleteTodo();
  const removeTodoStore = useTodoStore((state) => state.removeTodo);

  const handleToggle = () => {
    setCompleted(!completed);
    handleUpdateTodo(todo.id, title, !completed);
  };

  const handleDelete = () => {
    removeTodoStore(todo.id);
    handleDeleteTodo(todo.id);
  };

  const handleEditTitle = () => {
    setIsEditing(true);
  };

  const handleSaveTitle = () => {
    if (title.trim()) {
      handleUpdateTodo(todo.id, title, completed); 
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center p-2 hover:bg-gray-100 rounded transition-colors">
      <Checkbox
        checked={completed}
        onCheckedChange={handleToggle}
        disabled={isUpdating}
      />
      <div className="ml-2 flex-1">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSaveTitle(); // Save on Enter key
            }}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500"
            autoFocus
          />
        ) : (
          <h1
            className={`${
              completed ? "line-through text-gray-500" : "text-gray-800"
            } cursor-pointer`}
            onClick={handleEditTitle} // Click to edit the title
          >
            {title}
          </h1>
        )}
      </div>
      <button
        className="ml-auto text-red-500"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
