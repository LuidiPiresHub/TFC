export interface ILogin {
  email: string,
  password: string,
}

export interface IResponse {
  type: string | null,
  message: string,
}

export interface IToken {
  id: number;
  email: string;
  username: string;
  role: string;
  passwor: string;
}
