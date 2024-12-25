import React from "react";
import { Button } from "src/components";
import DonationSelector from "./DonationSelector";

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
      <div className="space-y-4">
        <div className="flex !flex-wrap sm:!flex-nowrap !gap-5">
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
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="27" viewBox="0 0 26 27" fill="none">
                <path
                  d="M21.0848 4.827C18.1796 3.045 15.6441 3.76312 14.1209 4.90701C13.4963 5.37604 13.1841 5.61055 13.0003 5.61055C12.8166 5.61055 12.5044 5.37604 11.8797 4.90701C10.3566 3.76312 7.82101 3.045 4.91588 4.827C1.10323 7.16569 0.240522 14.8811 9.03482 21.3904C10.7099 22.6301 11.5474 23.25 13.0003 23.25C14.4533 23.25 15.2908 22.6301 16.9659 21.3904C25.7601 14.8811 24.8974 7.16569 21.0848 4.827Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            }
          >
            Give Monthly
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {amounts.map((amount, index) => (
          <button
            key={index}
            onClick={() => setSelectedAmount(amount.value)}
            className={`${
              selectedAmount === amount.value ? "bg-gradient-custom" : "bg-[#16263B]"
            } transition-colors font-montserrat text-white py-4 rounded-[13px]`}
            aria-pressed={selectedAmount === amount.value}
          >
            <div className="text-xl !mb-1 font-bold">
              ${amount.value}/{donationType === "monthly" ? "mo" : "once"}
            </div>
            <div className="text-base">{amount.label}</div>
          </button>
        ))}

        <button className={`${customAmount ? "bg-gradient-custom" : "bg-[#16263B] border border-[#D8D8D8]"} w-full h-full  rounded-xl flex items-center px-6`}>
          <span className="text-white text-xl font-medium">$</span>
          <input
            type="text"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Other/mo"
            className="bg-transparent text-white text-xl w-full focus:outline-none ml-2 placeholder-gray-400"
            aria-label="Custom donation amount"
          />
        </button>
      </div>
      <DonationSelector />

      <Button asChild audience="USER" level="PRIMARY" className="w-full cursor-pointer" size="LARGE">
        {" "}
        Donate ${selectedAmount.toLocaleString()} {donationType === "monthly" ? "Monthly" : "Once"}
      </Button>
    </>
  );
};

export default DonationControls;
