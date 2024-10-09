import { useMutation } from "react-query";
import { AuthLogin, AuthRegister } from "../../types/auth/auth.type";
import { login, register } from "../../api/auth";

export function useLogin() {
  return useMutation((data: AuthLogin) => login(data.username, data.password), {
    onSuccess: (data) => {
      localStorage.setItem("userId", data.id);
    },
  });
}

export function useRegister() {
  return useMutation(
    (data: AuthRegister) =>
      register(
        data.firstName,
        data.lastName,
        data.age,
        data.username,
        data.password,
      ),
    {
      onSuccess: (data) => {
        localStorage.setItem("userId", data.id);
      },
    },
  );
}
