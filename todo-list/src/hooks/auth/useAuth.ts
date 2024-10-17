import { useMutation } from "react-query";
import {
  AuthLogin,
  AuthLoginInput,
  AuthRegister,
  AuthRegisterInput,
} from "../../types/auth/auth.type";
import { login, register } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const mutation = useMutation<AuthLogin, Error, AuthLoginInput>({
    mutationFn: (data: AuthLoginInput) => login(data.username, data.password),
    onSuccess(dataSuccess: AuthLogin) {
      localStorage.setItem("userId", String(dataSuccess.id));
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });

  const loginUser = (data: AuthLoginInput) => {
    mutation.mutate(data);
  };
  return { loginUser, ...mutation };
}

export function useRegister() {
  const mutation = useMutation<AuthRegister, Error, AuthRegisterInput>({
    mutationFn: (data: AuthRegisterInput) =>
      register(
        data.firstName,
        data.lastName,
        data.age,
        data.username,
        data.password,
      ),
    onSuccess(data: AuthRegister) {
      localStorage.setItem("userId", String(data.id));
    },
    onError: (error: Error) => {
      console.error("Registration failed:", error.message);
    },
  });
  const registerUser = (data: AuthRegisterInput) => {
    mutation.mutate(data);
  };
  return { registerUser, ...mutation };
}

export function useLogout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return { logout };
}
