import * as dto from "@open-source-economy/api-types";
import type { AuthContextState } from "src/types/auth";
import { stripeService } from "src/services";
import { currencyCookie } from "src/cookies";

export const PreferredCurrency = {
  get(auth: AuthContextState): dto.Currency {
    if (auth.authInfo?.user.preferredCurrency) {
      return auth.authInfo.user.preferredCurrency;
    }
    return currencyCookie.get();
  },

  set(auth: AuthContextState, currency: dto.Currency): void {
    if (auth.authInfo) {
      const params: dto.SetPreferredCurrencyParams = {
        currency: currency,
      };
      const body: dto.SetPreferredCurrencyBody = {};
      const query: dto.SetPreferredCurrencyQuery = {};

      stripeService.setUserPreferredCurrency(params, body, query).then(() => {
        window.location.reload();
      });
    } else {
      currencyCookie.set(currency);
      window.location.reload();
    }
  },
};
