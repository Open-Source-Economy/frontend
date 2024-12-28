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

  return (
    <>
      <div className="my-6 2xl:my-7 3xl:my-10">
        <div className="relative">
          <div className="flex !flex-wrap sm:!flex-nowrap !gap-5 max-w-[97%] sm:max-w-full">
            <Button
              onClick={() => setDonationType("once")}
              parentClassName="w-full"
              className="!w-full"
              audience={donationType === "once" ? "ALL" : "USER"}
              level={donationType === "once" ? "PRIMARY" : "SECONDARY"}
              size="LARGE"
            >
              Give Once
            </Button>

            <Button
              onClick={() => setDonationType("monthly")}
              parentClassName="w-full"
              className="!w-full"
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

        <div className="flex rounded-[15px] py-3 !px-4 sm:!px-[19px] bg-[#3E2946] max-w-[97%] sm:max-w-full mt-3 3xl:!mt-6">
          <h1 className="text-sm sm:text-base 1600:text-lg 3xl:text-xl lg:max-w-[90%] w-full text-primary-user font-montserrat">
            Giving monthly is an easy, effective way to be a hero for nature 365 days a year!
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 !gap-4 3xl:!gap-5">
        {amounts.map((amount, index) => (
          <button
            key={index}
            onClick={() => setSelectedAmount(amount.value)}
            className={`${
              selectedAmount === amount.value ? "bg-gradient-custom" : "bg-[#16263B]"
            } transition-colors font-montserrat text-white !p-3 3xl:!p-4 rounded-[13px]`}
            aria-pressed={selectedAmount === amount.value}
          >
            <div className="text-base sm:text-lg 3xl:text-xl !mb-0.5 3xl:!mb-1 font-bold">
              ${amount.value}
              {donationType === "monthly" ? "/mo" : ""}
            </div>
            <div className="text-xs sm:text-sm 3xl:text-base">{amount.label}</div>
          </button>
        ))}

        <button className={`${customAmount ? "border-[#D8D8D8] border" : ""} w-full h-full bg-[#16263B] rounded-xl flex items-center px-6`}>
          <span className="text-white text-base sm:text-lg 3xl:text-xl font-medium">$</span>
          <input
            type="text"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Other/mo"
            className="bg-transparent text-white text-base sm:text-lg 3xl:text-xl w-full focus:outline-none ml-2 placeholder-gray-400"
            aria-label="Custom donation amount"
          />
        </button>
      </div>
      <DonationSelector />

      <Button asChild audience="USER" level="PRIMARY" className="w-full overflow-hidden cursor-pointer" size="LARGE">
        {" "}
        Donate ${selectedAmount.toLocaleString()} {donationType === "monthly" ? "Monthly" : "Once"}
      </Button>
    </>
  );
};

export default DonationControls;
