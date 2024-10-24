import { register } from "@/api/auth";
import { AuthRegister, AuthRegisterInput } from "@/types/auth/auth.type";
import { useMutation } from "react-query";

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
