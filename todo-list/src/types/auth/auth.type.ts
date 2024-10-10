export interface AuthLogin {
  username: string;
  password: string;
}

export interface AuthRegister {
  firstName: string;
  lastName: string;
  age: number;
  username: string;
  password: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  token: string;
}

export interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  age: number;
  token: string;
}