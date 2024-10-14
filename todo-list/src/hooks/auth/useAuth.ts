import { useMutation } from "react-query";
import { AuthLogin, AuthRegister } from "../../types/auth/auth.type";
import { login, register } from "../../api/auth";

<<<<<<< Updated upstream
export function useLogin() {
  const mutation = useMutation({
    mutationFn: (data: AuthLogin) => login(data.username, data.password),
    onSuccess(data: AuthLogin) {
      localStorage.setItem("userId", String(data.id));
    },
  });

  const loginUser = (data: AuthLogin) => {
    mutation.mutate(data);
  };
  return { loginUser, ...mutation };
}
=======
>>>>>>> Stashed changes

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
  });
  const registerUser = (data: AuthRegister) =>{
    mutation.mutate(data);
  }
  return {registerUser, ...mutation};
}
