import { LoginResponse, RegisterResponse } from "../types/auth/auth.type";
import { safeFetch } from "./safeFetch";

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const url = `${import.meta.env.VITE_API_URL}/user/login`;
  const option: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  const loginResponse: LoginResponse = await safeFetch<LoginResponse>(
    url,
    option,
  );
  return loginResponse;
}

export async function register(
  firstName: string,
  lastName: string,
  age: number,
  username: string,
  password: string,
): Promise<RegisterResponse> {
  const url = `${import.meta.env.VITE_API_URL}/user/add`;
  const option: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstNames: firstName,
      lastNames: lastName,
      ages: age,
      usernames: username,
      passwords: password,
    }),
  };

  const registerResponse: RegisterResponse = await safeFetch<RegisterResponse>(
    url,
    option,
  );
  return registerResponse;
}
