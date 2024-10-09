import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/auth/useAuth';

function LoginPage(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await loginMutation.mutateAsync({ username, password });
    navigate('/todos');
  };

  return (
    <div >
      <h1>Login</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
