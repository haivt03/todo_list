export interface AuthLogin {
  id: number
  username: string;
  password: string;
}

export interface AuthLoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  firstNames: string;
  lastNames: string;
  ages: number;
  usernames: string;
  passwords: string;
}

export interface AuthRegister {
  id: number;
  firstNames: string;
  lastNames: string;
  ages: number;
  usernames: string;
  passwords: string;
}

export interface AuthRegisterInput {
  firstName: string;
  lastName: string;
  age: number;
  username: string;
  password: string;
}
