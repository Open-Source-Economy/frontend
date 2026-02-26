import type {
  Currency,
  SetPreferredCurrencyBody,
  SetPreferredCurrencyParams,
  SetPreferredCurrencyQuery,
} from "@open-source-economy/api-types";
import type { AuthContextState } from "../views/auth/AuthContext";
import { backendAPI } from "../services";
import { currencyCookie } from "../cookies";

export const PreferredCurrency = {
  get(auth: AuthContextState): Currency {
    if (auth.authInfo?.user.preferredCurrency) {
      return auth.authInfo.user.preferredCurrency;
    }
    return currencyCookie.get();
  },

  set(auth: AuthContextState, currency: Currency): void {
    if (auth.authInfo) {
      const params: SetPreferredCurrencyParams = {
        currency: currency,
      };
      const body: SetPreferredCurrencyBody = {};
      const query: SetPreferredCurrencyQuery = {};

      backendAPI.setUserPreferredCurrency(params, body, query).then(() => {
        window.location.reload();
      });
    } else {
      currencyCookie.set(currency);
      window.location.reload();
    }
  },
};
