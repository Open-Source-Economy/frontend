import { UserRole } from "../../model";

export interface CreateLocalUserBody {
  name?: string;
  email: string;
  password: string;
  role: UserRole;
}
