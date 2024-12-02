import { AuthInfo } from "src/dtos";

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginQuery {}

export interface LoginResponse extends AuthInfo {}
