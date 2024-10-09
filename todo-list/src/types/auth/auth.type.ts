export interface AuthLogin {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
}
export interface AuthRegister {
  firstNames: string;
  lastNames: string;
  ages: number;
  usernames: string;
  passwords: string;
}
