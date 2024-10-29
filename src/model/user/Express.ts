import { UserId, UserRole } from "./User";
import { LocalUser } from "./LocalUser";
import { ThirdPartyUser } from "./ThirdPartyUser";

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
