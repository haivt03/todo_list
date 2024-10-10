export async function fetchTodosByUser() {
  const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage
  if (!userId) {
    throw new Error('No user logged in');
  }

  const response = await fetch(`https://dummyjson.com/todos/user/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return response.json();
}

  
export async function addTodos(title: string, completed: boolean, userID: number){
    const response = await fetch('https://dummyjson.com/todos/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        titles: title,
        completeds: completed,
        userId: userID
    }),
    });
    return response.json();
  };
  