import * as dto from "@open-source-economy/api-types";

/**
 * Rate interface used throughout Step 5
 */
export interface Rate {
  amount: number;
  currency: dto.Currency;
}
