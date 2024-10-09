import { Link } from 'react-router-dom';

function Homepage (){
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the ToDo App</h1>
      <p className="mb-6 text-center">
        This is a simple ToDo application where you can manage your tasks effectively.
      </p>
      <div className="flex flex-col space-y-2">
        <Link to="/login" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Login
        </Link>
        <Link to="/register" className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
          Register
        </Link>
        <Link to="/todos" className="bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition">
          Go to ToDo List
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
