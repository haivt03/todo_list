import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/auth/useAuth";

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await registerMutation.mutateAsync({
      firstName,
      lastName,
      age,
      username,
      password,
    });
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder="Age"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
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
          className="w-full bg-green-500 text-white py-3 rounded-md font-semibold hover:bg-green-600 transition-colors"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
