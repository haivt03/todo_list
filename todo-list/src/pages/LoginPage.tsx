import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/auth/useAuth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await loginMutation.mutateAsync({ username, password });
    navigate('/todos');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
