"use client";

import { Fragment, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { Check, X } from "lucide-react";

interface Currency {
  name: string;
  code: string;
  symbol: string;
}

const currencies: Currency[] = [
  { name: "United States Dollar", code: "USD", symbol: "US$" },
  { name: "Euro", code: "EUR", symbol: "€" },
  { name: "British Pound", code: "GBP", symbol: "£" },
  { name: "Australian Dollar", code: "AUD", symbol: "A$" },
  { name: "Canadian Dollar", code: "CAD", symbol: "CA$" },
  { name: "Israeli Shekel", code: "ILS", symbol: "₪" },
  { name: "Japanese Yen", code: "JPY", symbol: "¥" },
  { name: "Swiss Franc", code: "CHF", symbol: "CHF" },
  { name: "Chinese Yuan", code: "CNY", symbol: "¥" },
  { name: "Indian Rupee", code: "INR", symbol: "₹" },
  { name: "Brazilian Real", code: "BRL", symbol: "R$" },
  { name: "South African Rand", code: "ZAR", symbol: "R" },
  { name: "Mexican Peso", code: "MXN", symbol: "MX$" },
  { name: "Singapore Dollar", code: "SGD", symbol: "S$" },
  { name: "New Zealand Dollar", code: "NZD", symbol: "NZ$" },
];

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (currency: Currency) => void;
  selectedCurrency?: Currency;
}

export default function CurrencyModal({ isOpen, onClose, onSelect, selectedCurrency }: CurrencyModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/10 backdrop-blur-sm" />
        </TransitionChild>

        {/* Modal */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 flex items-center justify-center p-4 overflow-hidden ">
            <DialogPanel className="mx-auto min-w-[361px] rounded-2xl bg-[#0B1829] shadow-xl">
              <div className="flex items-center justify-between mb-1 p-7">
                <DialogTitle className="text-xl font-medium text-white font-michroma">Choose a currency</DialogTitle>
                <button onClick={onClose} className=" text-white transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto space-y-1 overflow-x-hidden scrollbar scrollbar-track-primaryBg scrollbar-thumb-[#2c4366] ">
                {currencies.map(currency => (
                  <button
                    key={currency.code}
                    onClick={() => onSelect(currency)}
                    className="w-full flex items-center justify-start gap-4 px-3 py-2 hover:bg-white/5  transition-colors group"
                  >
                    <div className="size-4 grid place-items-center">{selectedCurrency?.code === currency.code && <Check className=" text-white size-5" />}</div>
                    <div className="flex flex-col items-start ">
                      <span className="text-white text-lg">{currency.name}</span>
                      <span className="text-gray-400">
                        {currency.code} - {currency.symbol}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
