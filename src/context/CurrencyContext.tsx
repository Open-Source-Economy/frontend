import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { PreferredCurrency } from "src/utils/PreferredCurrency";
import { useAuth } from "src/views/auth/AuthContext";

interface CurrencyContextType {
  preferredCurrency: dto.Currency;
  setPreferredCurrency: (currency: dto.Currency) => void;
  showCurrencyModal: boolean;
  setShowCurrencyModal: (show: boolean) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider(props: { children: React.ReactNode }) {
  const auth = useAuth();
  const [preferredCurrency, setPreferredCurrency] = useState<dto.Currency>(PreferredCurrency.get(auth));
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  useEffect(() => {
    setPreferredCurrency(PreferredCurrency.get(auth));
  }, [auth]);

  const handleSetPreferredCurrency = (currency: dto.Currency) => {
    setPreferredCurrency(currency);
    PreferredCurrency.set(auth, currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        preferredCurrency,
        setPreferredCurrency: handleSetPreferredCurrency,
        showCurrencyModal,
        setShowCurrencyModal,
      }}
    >
      {props.children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
