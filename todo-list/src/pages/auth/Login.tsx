import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useAuth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, isLoading, isError, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser({ username, password });
    navigate("/todos");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="p-2 border w-full mb-4"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border w-full mb-4"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {isError && (
            <p className="text-red-500 mt-2">{(error as Error).message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
