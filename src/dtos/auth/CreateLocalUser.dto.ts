import { UserRole } from "../../model";

export interface CreateLocalUserBodyParams {
  name?: string;
  email: string;
  password: string;
  role: UserRole;
}
