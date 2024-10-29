import { User } from "../../model";

export interface StatusBodyParams {}

export interface StatusQueryParams {}

export interface StatusResponse {
  user: User | null;
}
