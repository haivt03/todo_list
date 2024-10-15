import { log } from "console";
import { LoginResponse, RegisterResponse } from "../types/auth/auth.type";
import { safeFetch } from "./safeFetch";

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const url = `user/login`;
  const option: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  };
console.log(username);
console.log(password);

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
  const url = `user/add`;
  const option: RequestInit = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      age: age,
      username: username,
      password: password,
    }),
  };

  const registerResponse: RegisterResponse = await safeFetch<RegisterResponse>(
    url,
    option,
  );
  return registerResponse;
}
