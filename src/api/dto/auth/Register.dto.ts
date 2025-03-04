import { AuthInfo } from "./AuthInfo.dto";

export interface RegisterBody {
  name: string | null;
  email: string;
  password: string;
}

export interface RegisterQuery {
  companyToken?: string;
  repositoryToken?: string;
}

export interface RegisterResponse extends AuthInfo {}
