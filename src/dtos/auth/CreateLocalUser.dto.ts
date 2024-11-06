import { UserRole } from "src/model";

export interface CreateLocalUserBody {
  name?: string;
  email: string;
  password: string;
  role: UserRole;
}
