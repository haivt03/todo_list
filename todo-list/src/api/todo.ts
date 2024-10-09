export async function fetchTodos(){
    const response = await fetch('https://dummyjson.com/todos');
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
  