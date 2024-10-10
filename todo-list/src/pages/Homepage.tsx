import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the ToDo App</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-md">
        This is a simple ToDo application where you can manage your tasks effectively.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Register
        </Link>
        <Link
          to="/todos"
          className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
        >
          Go to ToDo List
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
