import axios from "axios";
import { User } from "../model";
import { API_URL, handleError } from "./index";
import { ApiError } from "../ultils/error/ApiError";

export interface LoginInfo {
  email: string;
  password: string;
}

export interface RegisterInfo {
  email: string;
  password: string;
}

export function getAuthBackendAPI(): AuthBackendAPI {
  return new AuthBackendAPIImpl();
}

interface AuthBackendAPI {
  checkUserStatus(): Promise<User | ApiError>;

  login(loginInfo: LoginInfo): Promise<User | ApiError>;

  register(registerInfo: RegisterInfo): Promise<User | ApiError>;

  loginWithGitHub(success?: string, failure?: string): Promise<void>;

  deleteSession(): Promise<void | ApiError>;
}

class AuthBackendAPIImpl implements AuthBackendAPI {
  async checkUserStatus(): Promise<User | ApiError> {
    return await handleError(() => axios.get(`${API_URL}/auth/status`, { withCredentials: true }), "checkUserStatus");
  }

  async login(loginInfo: LoginInfo): Promise<User | ApiError> {
    return await handleError(() => axios.post(`${API_URL}/auth/login`, loginInfo, { withCredentials: true }), "login");
  }

  async register(registerInfo: RegisterInfo): Promise<User | ApiError> {
    return await handleError(() => axios.post(`${API_URL}/auth/register`, registerInfo, { withCredentials: true }), "register");
  }

  async loginWithGitHub(): Promise<void> {
    window.location.href = `${API_URL}/auth/github`;
  }

  async deleteSession(): Promise<void | ApiError> {
    return await handleError(() => axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true }), "deleteSession");
  }
}
