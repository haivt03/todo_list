import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../hooks/auth/useAuth";

const Register: React.FC = () => {
  const [firstNames, setFirstNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [ages, setAges] = useState<number>(0);
  const [usernames, setUsernames] = useState("");
  const [passwords, setPasswords] = useState("");
  const { registerUser, isLoading, isError, error } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser({ firstNames, lastNames, ages, usernames, passwords });
  };

  if (localStorage.getItem("userId")) {
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={firstNames}
            onChange={(e) => setFirstNames(e.target.value)}
            placeholder="First Name"
            className="p-2 border w-full mb-4"
          />
          <input
            type="text"
            value={lastNames}
            onChange={(e) => setLastNames(e.target.value)}
            placeholder="Last Name"
            className="p-2 border w-full mb-4"
          />
          <input
            type="number"
            value={ages}
            onChange={(e) => setAges(Number(e.target.value))}
            placeholder="Age"
            className="p-2 border w-full mb-4"
          />
          <input
            type="text"
            value={usernames}
            onChange={(e) => setUsernames(e.target.value)}
            placeholder="Username"
            className="p-2 border w-full mb-4"
          />
          <input
            type="password"
            value={passwords}
            onChange={(e) => setPasswords(e.target.value)}
            placeholder="Password"
            className="p-2 border w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isError && (
            <p className="text-red-500 mt-2">{(error as Error).message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
