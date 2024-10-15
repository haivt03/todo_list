import { useMutation } from "react-query";
import { AuthLogin, AuthLoginInput, AuthRegister } from "../../types/auth/auth.type";
import { login, register } from "../../api/auth";

export function useLogin() {
  const mutation = useMutation<AuthLogin, Error, AuthLoginInput>({
    mutationFn: (data: AuthLoginInput) => login(data.username, data.password),
    onSuccess(data: AuthLogin) {
      localStorage.setItem("userId", String(data.id));
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });

  const loginUser = (data: AuthLogin) => {
    mutation.mutate(data);
  };
  return { loginUser, ...mutation };
}

export function useRegister() {
  const mutation = useMutation({
    mutationFn: (data: AuthRegister) =>
      register(
        data.firstNames,
        data.lastNames,
        data.ages,
        data.usernames,
        data.passwords,
      ),
      onSuccess(data: AuthRegister) {
         localStorage.setItem("userId", String(data.id)) 
      },
      onError: (error: Error) => {
        console.error("Registration failed:", error.message);
      },
  });
  const registerUser = (data: AuthRegister) =>{
    mutation.mutate(data);
  }
  return {registerUser, ...mutation};
}
