import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
<<<<<<< Updated upstream
=======
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { TodoLists } from "./components/todos/TodoLists";
import UserProfile from "./pages/UserProfile";
>>>>>>> Stashed changes
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
<<<<<<< Updated upstream
=======
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/todos" element={<TodoLists />} />
          <Route path="/profile" element={<UserProfile />} />
>>>>>>> Stashed changes
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
