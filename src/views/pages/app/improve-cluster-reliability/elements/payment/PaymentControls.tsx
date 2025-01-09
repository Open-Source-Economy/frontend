import React, { useEffect, useState } from "react";
import { Button } from "src/components";
import { DonationSelector } from "./DonationSelector";
import { Currency, PriceType, ProductType, RepositoryId } from "src/model";
import { Price } from "src/dtos";
import { PaymentHeader } from "./PaymentHeader";
import { usePrices } from "../../../../../hooks";

interface PaymentControlsProps {
  repositoryId: RepositoryId;
  preferredCurrency: Currency;
}

export function PaymentControls(props: PaymentControlsProps) {
  const { prices, error, reloadPrices } = usePrices(props.repositoryId);
  const [priceType, setPriceType] = useState<PriceType>(PriceType.RECURRING);

  const [selectedAmount, setSelectedAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");

  useEffect(() => {
    reloadPrices();
  }, []);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);
    if (value) {
      setSelectedAmount(parseInt(value, 10));
    }
  };
  const isValidAmount = () => {
    if (customAmount) {
      const parsedAmount = parseFloat(customAmount);
      return !isNaN(parsedAmount) && parsedAmount > 0;
    }
    return selectedAmount > 0;
  };

  // Handle predefined amount selection
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Clear custom amount when predefined amount is selected
  };

  // Handle donation type change
  const handleDonationTypeChange = (type: PriceType) => {
    setPriceType(type);
    setSelectedAmount(0); // Reset amount when switching donation type
    setCustomAmount(""); // Reset custom amount when switching donation type
  };

  return (
    <>
      {/*TODO*/}
      {error && <div className="text-red-500">{error.message}</div>}
      <div className="my-6 2xl:my-7 3xl:my-10">
        <PaymentHeader donationType={priceType} handleDonationTypeChange={handleDonationTypeChange} />
      </div>

      <div className="grid grid-cols-2 !gap-4 3xl:!gap-5">
        {prices &&
          prices[priceType][props.preferredCurrency][ProductType.donation].map((price: Price, index) => (
            <button
              key={index}
              onClick={() => handleAmountSelect(price.totalAmount)}
              className={`${
                selectedAmount === price.totalAmount
                  ? "bg-gradient-custom"
                  : "bg-[#16263B] hover:!border-primary-user border-2 duration-300 ease-linear transition-all !border-transparent"
              } transition-colors font-montserrat text-white !p-3 3xl:!p-4 rounded-[13px]`}
              aria-pressed={selectedAmount === price.totalAmount}
            >
              <h5 className="text-base sm:text-lg 3xl:text-xl !leading-[110%] !mb-1 font-bold">
                ${price.totalAmount}
                {priceType === PriceType.RECURRING ? "/mo" : ""}
              </h5>
              <h6 className="text-xs sm:text-sm 3xl:text-base !leading-[125%]">{price.label}</h6>
            </button>
          ))}

        <button
          className={`${customAmount ? "border-[#D8D8D8] border" : ""} w-full h-full bg-[#16263B] border-[#D8D8D8] border rounded-xl flex items-center px-6`}
        >
          <span className="text-white text-base sm:text-lg 3xl:text-xl font-medium">$</span>
          <input
            type="text"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Other/mo"
            className="bg-transparent text-white text-base sm:text-lg 3xl:text-xl placeholder:text-sm sm:placeholder:text-lg w-full focus:outline-none ml-2 placeholder-gray-400"
            aria-label="Custom donation amount"
          />
        </button>
      </div>
      <DonationSelector />

      <Button
        disabled={!isValidAmount()}
        audience="USER"
        level="PRIMARY"
        className="w-full !font-bold !font-montserrat lg:!text-xl 3xl:!text-2xl 3xl:!h-[70px] !capitalize overflow-hidden cursor-pointer mt-4"
        size="LARGE"
      >
        {isValidAmount() ? `Donate $${selectedAmount.toLocaleString()} ${priceType === PriceType.RECURRING ? "Monthly" : ""}` : "Select an amount to donate"}
      </Button>
    </>
  );
}
