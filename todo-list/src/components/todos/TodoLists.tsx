import { useEffect, useState } from "react";
import { useAddTodo, useTodos } from "../../hooks/todos/useTodo";
import { TodoItems } from "./TodoItems";
import { Todo } from "../../types/todos/todos.type";

export function TodoLists() {
  const { data, isLoading, isError } = useTodos();
  const {
    handleAddTodo,
    isLoading: addingTodo,
    error: addTodoError,
  } = useAddTodo();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (data?.todos) {
      setTodos(data.todos);
    }
  }, [data]);
  
  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-500">Error fetching data</div>;
  }

  const handleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
  };

  const handleAdd = async () => {
    if (newTodo.trim()) {
      try {
        const addedTodo = await handleAddTodo(newTodo, completed);
        setTodos((prevTodos) => [...prevTodos, addedTodo]);
        setNewTodo("");
        setCompleted(false);
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Todo List</h1>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItems key={todo.id} todo={todo} onComplete={handleComplete} />
        ))}
      </ul>
      <div className="mt-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-0"
            />
            <span className="text-gray-600">Complete</span>
          </label>
        </div>
        <button
          onClick={handleAdd}
          disabled={addingTodo}
          className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
        >
          {addingTodo ? "Adding..." : "Add"}
        </button>
        {addTodoError && (
          <div className="text-red-500 mt-2">{addTodoError}</div>
        )}
      </div>
    </div>
  );
}
