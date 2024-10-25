import { login } from "@/api/auth";
import { AuthLogin, AuthLoginInput } from "@/types/auth/auth.type";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export function useLogin() {
  const navigate = useNavigate();
  const setUserId = useAuthStore((state) => state.setUserId);

  const mutation = useMutation<AuthLogin, Error, AuthLoginInput>({
    mutationFn: (data: AuthLoginInput) => login(data.username, data.password),
    onSuccess(dataSuccess: AuthLogin) {
      setUserId(dataSuccess.id);
      toast.success("Successfully logged in!");
      navigate("/todos");
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
      toast.error("Wrong password!");
    },
  });

  const loginUser = (data: AuthLoginInput) => {
    mutation.mutate(data);
  };

  return { loginUser, ...mutation };
}

export function useLogout() {
  const navigate = useNavigate();
  const setUserId = useAuthStore((state) => state.setUserId);

  const logout = () => {
    setUserId(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return { logout };
}
