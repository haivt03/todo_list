import { useMutation, UseMutationResult } from "react-query";
import { AuthLogin, AuthRegister, LoginResponse, RegisterResponse } from "../../types/auth/auth.type";
import { login, register } from "../../api/auth";

// Define the type for the login mutation
export function useLogin(): UseMutationResult<LoginResponse, Error, AuthLogin> {
  return useMutation<LoginResponse, Error, AuthLogin>(
    (data) => login(data.username, data.password),
    {
      onSuccess: (data) => {
        localStorage.setItem("userId", String(data.id)); // Ensure you store a string in localStorage
      },
    }
  );
}

// Define the type for the register mutation
export function useRegister(): UseMutationResult<RegisterResponse, Error, AuthRegister> {
  return useMutation<RegisterResponse, Error, AuthRegister>(
    (data) =>
      register(
        data.firstName,
        data.lastName,
        data.age,
        data.username,
        data.password
      ),
    {
      onSuccess: (data) => {
        localStorage.setItem("userId", String(data.id)); // Ensure you store a string in localStorage
      },
    }
  );
}
