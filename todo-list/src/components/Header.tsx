import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/auth/useAuth";

function Header() {
  const { logout } = useLogout();
  return (
    <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-black p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          Todos App
        </h1>
        <nav className="space-x-8">
          <Link
            to="/todos"
            className="text-lg text-gray-300 hover:text-white transition-all duration-300 hover:underline"
          >
            Todos
          </Link>
          <Link
            to="/profile"
            className="text-lg text-gray-300 hover:text-white transition-all duration-300 hover:underline"
          >
            Profile
          </Link>
          <Button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 transition-colors duration-300 text-white py-2 px-5 rounded-full shadow-md"
          >
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
