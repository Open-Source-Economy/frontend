import { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { CheckIcon, CloseIcon } from "./Icons";
import { displayedCurrencies } from "../../../data";
import { Currency } from "src/model";

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (currency: Currency) => void;
  selectedCurrency?: Currency;
}

export function CurrencyModal(props: CurrencyModalProps) {
  return (
    <Transition show={props.isOpen} as={Fragment}>
      <Dialog onClose={props.onClose} className="relative z-50">
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
          <div className="fixed inset-0 flex items-center justify-center p-4  ">
            <DialogPanel className="mx-auto min-w-[361px] rounded-2xl  bg-[#0B1829] overflow-x-hidden shadow-xl">
              <div className="flex items-center justify-between mb-1 p-7">
                <DialogTitle className="text-xl font-medium text-white font-michroma">Choose a currency</DialogTitle>
                <button onClick={props.onClose} className=" text-white transition-colors group">
                  <CloseIcon />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto space-y-1 overflow-x-hidden scrollbar scrollbar-track-primaryBg scrollbar-thumb-[#2c4366] ">
                {Object.values(Currency).map(currencyKey => {
                  const currency = displayedCurrencies[currencyKey];
                  return (
                    <button
                      key={currency.code}
                      onClick={() => props.onSelect(currencyKey)}
                      className="w-full flex items-center justify-start gap-4 px-3 overflow-hidden py-2  duration-300 hover:bg-white/5  transition-colors group"
                    >
                      <div className="size-4 grid place-items-center ">{props.selectedCurrency === currencyKey && <CheckIcon />}</div>
                      <div className="flex flex-col items-start ">
                        <span className=" text-lg gradient-bg  bg-clip-text group-hover:text-transparent duration-200">{currency.name}</span>
                        <span className="text-gray-400 gradient-bg  bg-clip-text group-hover:text-transparent duration-200">
                          {currency.code} - {currency.symbol}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
