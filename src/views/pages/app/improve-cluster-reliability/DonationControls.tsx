import React from "react";
import { Button } from "src/components";
import DonationSelector from "./DonationSelector";
import { HeartIcon, PointingArrow } from "src/Utils/Icons";

interface DonationControlsProps {
  selectedAmount: number;
  setSelectedAmount: React.Dispatch<React.SetStateAction<number>>;
  customAmount: string;
  setCustomAmount: React.Dispatch<React.SetStateAction<string>>;
  donationType: "once" | "monthly";
  setDonationType: React.Dispatch<React.SetStateAction<"once" | "monthly">>;
}

const DonationControls: React.FC<DonationControlsProps> = ({
  selectedAmount,
  setSelectedAmount,
  customAmount,
  setCustomAmount,
  donationType,
  setDonationType,
}) => {
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
  const amountsOnce = [
    { value: 25, label: "For individual" },
    { value: 50, label: "For small companies" },
    { value: 100, label: "For small companies" },
    { value: 250, label: "For small companies" },
    { value: 1000, label: "For small companies" },
  ];
  const amountsMonthly = [
    { value: 20, label: "For individual" },
    { value: 200, label: "For small companies" },
    { value: 500, label: "For medium companies" },
    { value: 1000, label: "For big companies" },
    { value: 2000, label: "AMAZING!!!" },
  ];
  const amounts = donationType === "once" ? amountsOnce : amountsMonthly;
  // Handle predefined amount selection
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Clear custom amount when predefined amount is selected
  };

  // Handle donation type change
  const handleDonationTypeChange = (type: "once" | "monthly") => {
    setDonationType(type);
    setSelectedAmount(0); // Reset amount when switching donation type
    setCustomAmount(""); // Reset custom amount when switching donation type
  };

  return (
    <>
      <div className="my-6 2xl:my-7 3xl:my-10">
        <div className="relative">
          <div className="flex !flex-wrap sm:!flex-nowrap !gap-5 xl:!gap-2 max-w-[97%] sm:max-w-full">
            <Button
              onClick={() => handleDonationTypeChange("once")}
              parentClassName="w-full"
              className={`!w-full !font-montserrat !font-medium !capitalize !text-base 2xl:!text-lg 1600:!text-xl 3xl:!h-[70px] 3xl:!text-2xl hover:!text-white   ${
                donationType === "once" ? "after:hover:!opacity-0 !border-none !text-white  pointer-events-none" : "!text-primary-user"
              }`}
              audience={donationType === "once" ? "ALL" : "USER"}
              level={donationType === "once" ? "PRIMARY" : "SECONDARY"}
              size="LARGE"
            >
              Give Once
            </Button>

            <Button
              onClick={() => handleDonationTypeChange("monthly")}
              parentClassName="w-full"
              className={`!w-full !font-montserrat !font-medium !capitalize !text-base hover:!text-white 2xl:!text-lg 1600:!text-xl 3xl:!h-[70px] 3xl:!text-2xl  ${
                donationType === "monthly" ? "after:hover:!opacity-0 !border-none !text-white pointer-events-none" : "!text-primary-user"
              }`}
              audience={donationType === "monthly" ? "ALL" : "USER"}
              level={donationType === "monthly" ? "PRIMARY" : "SECONDARY"}
              size="LARGE"
              icon={<HeartIcon />}
            >
              Give Monthly
            </Button>
          </div>
          {donationType === "once" && (
            <span className="absolute -right-5 sm:-right-8 2xl:-right-10 3xl:-right-11 top-[90%] sm:top-[40%] xl:top-1/2">
              <PointingArrow />
            </span>
          )}
        </div>

        <div className="flex rounded-[15px] py-3 !px-4 sm:!px-[19px] bg-[#3E2946] w-full sm:max-w-full mt-3 3xl:!mt-6">
          <h1 className="text-sm sm:text-base 1600:text-lg 3xl:text-xl lg:max-w-[90%] 3xl:max-w-[97%] w-full text-primary-user font-montserrat">
            Giving monthly is an easy, effective way to be a hero for nature 365 days a year!
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 !gap-4 3xl:!gap-5">
        {amounts.map((amount, index) => (
          <button
            key={index}
            onClick={() => handleAmountSelect(amount.value)}
            className={`${
              selectedAmount === amount.value
                ? "bg-gradient-custom"
                : "bg-[#16263B] hover:!border-primary-user border-2 duration-300 ease-linear transition-all !border-transparent"
            } transition-colors font-montserrat text-white !p-3 3xl:!p-4 rounded-[13px]`}
            aria-pressed={selectedAmount === amount.value}
          >
            <h5 className="text-base sm:text-lg 3xl:text-xl !leading-[110%] !mb-1 font-bold">
              ${amount.value}
              {donationType === "monthly" ? "/mo" : ""}
            </h5>
            <h6 className="text-xs sm:text-sm 3xl:text-base !leading-[125%]">{amount.label}</h6>
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
        {isValidAmount() ? `Donate $${selectedAmount.toLocaleString()} ${donationType === "monthly" ? "Monthly" : ""}` : "Select an amount to donate"}
      </Button>
    </>
  );
};

export default DonationControls;
