import { UserId, UserRole } from "./User";
import { LocalUser, ThirdPartyUser } from "src/model";

declare global {
  namespace Express {
    interface User {
      id: UserId;
      data: LocalUser | ThirdPartyUser;
      role: UserRole;
      email(): string | null;
    }
  }
}
