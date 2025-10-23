import type { Currency, SetUserPreferredCurrencyBody, SetUserPreferredCurrencyParams, SetUserPreferredCurrencyQuery } from "@open-source-economy/api-types";
import type { AuthContextState } from "../views/v1/pages/authenticate/AuthContext";
import { getBackendAPI } from "../services";
import { currencyCookie } from "../cookies";

export const PreferredCurrency = {
  backendAPI: getBackendAPI(),

  get(auth: AuthContextState): Currency {
    if (auth.authInfo?.user?.preferredCurrency) {
      return auth.authInfo.user.preferredCurrency;
    }
    return currencyCookie.get();
  },

  set(auth: AuthContextState, currency: Currency): void {
    if (auth.authInfo?.user) {
      const params: SetUserPreferredCurrencyParams = {
        currency: currency,
      };
      const body: SetUserPreferredCurrencyBody = {};
      const query: SetUserPreferredCurrencyQuery = {};

      this.backendAPI.setUserPreferredCurrency(params, body, query).then(() => {
        window.location.reload();
      });
    } else {
      currencyCookie.set(currency);
      window.location.reload();
    }
  },
};
