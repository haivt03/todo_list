import { useMutation } from "react-query";
import { AuthLogin, AuthLoginInput, AuthRegister, AuthRegisterInput } from "../../types/auth/auth.type";
import { login, register } from "../../api/auth";

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
  const registerUser = (data: AuthRegisterInput) =>{
    mutation.mutate(data);
  }
  return {registerUser, ...mutation};
}
