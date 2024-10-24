import { login } from "@/api/auth";
import { AuthLogin, AuthLoginInput } from "@/types/auth/auth.type";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();
    const mutation = useMutation<AuthLogin, Error, AuthLoginInput>({
      mutationFn: (data: AuthLoginInput) => login(data.username, data.password),
      onSuccess(dataSuccess: AuthLogin) {
        localStorage.setItem("userId", String(dataSuccess.id));
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
    const logout = () => {
      localStorage.removeItem("userId");
      navigate("/login");
    };
  
    return { logout };
  }