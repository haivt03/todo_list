export interface AuthLogin {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
}
export interface AuthRegister {
  firstName: string;
  lastName: string;
  age: number;
  username: string;
  password: string;
}
