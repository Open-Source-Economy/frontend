import { User } from "../../model";
import { AuthInfo } from "./AuthInfo.dto";

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginQuery {}

export interface LoginResponse extends AuthInfo {}
