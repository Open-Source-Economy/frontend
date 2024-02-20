import { IdlAccounts } from "@coral-xyz/anchor";
import { Poc } from "../../poc";

export type Project = IdlAccounts<Poc>["project"];
