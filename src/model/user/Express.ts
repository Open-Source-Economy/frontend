import { UserId, UserRole } from "./User";
import { LocalUser } from "./LocalUser";
import { ThirdPartyUser } from "./ThirdPartyUser";
import { Currency } from "../stripe";

declare global {
  namespace Express {
    interface User {
      id: UserId;
      name: string | null;
      data: LocalUser | ThirdPartyUser;
      role: UserRole;
      preferredCurrency?: Currency;
      email(): string | null;
    }
  }
}
