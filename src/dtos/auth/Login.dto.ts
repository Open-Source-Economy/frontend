import { User } from "../../model";

export interface LoginBodyParams {
  email: string;
  password: string;
}

export interface LoginQueryParams {}

export interface LoginResponse {
  user: User;
}
