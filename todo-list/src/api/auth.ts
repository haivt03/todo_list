export async function login(username: string, password: string) {
    const response = await fetch("https://dummyjson.com/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    return response.json;
  }
  
  export async function register (firstName: string, lastName: string, age: number, username: string, password: string ){
      const response = await fetch('https://dummyjson.com/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstNames: firstName,
          lastNames: lastName,
          ages: age,
          usernames: username,
          passwords: password,
        }),
      });
    
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
    
      return response.json();
    };
    