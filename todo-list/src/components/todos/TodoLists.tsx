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

  if (isLoading) {
    return <div>Loading......</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  useEffect(() => {
    if (data?.todos) {
      setTodos(data.todos);
    }
  }, [data]);

  const handleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
  };

  const handleAdd = async () => {
    if (newTodo.trim()) {
      const addedTodo = await handleAddTodo(newTodo, completed);
      setTodos((prevTodos) => [...prevTodos, addedTodo]);
      setNewTodo("");
      setCompleted(false);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <TodoItems key={todo.id} todo={todo} onComplete={handleComplete} />
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          <span>Complete</span>
        </label>
        <button onClick={handleAdd} disabled={addingTodo}>
          {addingTodo ? "Adding..." : "Add"}
        </button>
        {addTodoError && <div>{addTodoError}</div>}
      </div>
    </div>
  );
}
