import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todos App</h1>
        <nav className="space-x-4">
          <Link
            to="/todos"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Todos
          </Link>
          <Link
            to="/profile"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Profile
          </Link>
          <Link
            to="/login"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
