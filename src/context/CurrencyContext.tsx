import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { Currency } from "@open-source-economy/api-types";
import { PreferredCurrency } from "../ultils/PreferredCurrency";
import { useAuth } from "../views/pages/authenticate/AuthContext";

interface CurrencyContextType {
  preferredCurrency: Currency;
  setPreferredCurrency: (currency: Currency) => void;
  showCurrencyModal: boolean;
  setShowCurrencyModal: (show: boolean) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [preferredCurrency, setPreferredCurrency] = useState<Currency>(PreferredCurrency.get(auth));
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  useEffect(() => {
    setPreferredCurrency(PreferredCurrency.get(auth));
  }, [auth]);

  const handleSetPreferredCurrency = (currency: Currency) => {
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
      {children}
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
