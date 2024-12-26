import React, { useState } from "react";
import { Link } from "react-router-dom";

interface DonationSelectorProps {
  onSelect?: (isDonation: boolean) => void;
}
const DonationSelector: React.FC<DonationSelectorProps> = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<"donation" | "receive">("donation");
  const handleSelect = (option: "donation" | "receive") => {
    setSelectedOption(option);
    onSelect?.(option === "donation");
  };
  return (
    <div className="w-full !space-y-2.5 !my-8 3xl:!my-10">
      <div className="flex space-x-4">
        {/* Donation Option */}
        <button
          onClick={() => handleSelect("donation")}
          className={`flex gap-2 items-center text-base lg:text-lg 3xl:text-xl font-medium font-montserrat flex-1`}
        >
          <div
            className={`w-5 h-5  rounded-full border flex items-center justify-center ${
              selectedOption === "donation" ? "!border-primary-user" : "border-white"
            }`}
          >
            {selectedOption === "donation" && <div className="w-3 h-3 rounded-full bg-primary-user" />}
          </div>
          That's a donation{" "}
        </button>

        {/* Receive Option */}
        <button
          onClick={() => handleSelect("receive")}
          className={`flex gap-2 items-center text-nowrap text-base lg:text-lg 3xl:text-xl font-medium font-montserrat flex-1 `}
        >
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedOption === "receive" ? "!border-primary-user" : "border-white"}`}
          >
            {selectedOption === "receive" && <div className="w-3 h-3 rounded-full bg-primary-user" />}
          </div>
          I want to receive{" "}
          <Link to="" className="font-bold underline underline-offset-4">
            DoW
          </Link>
        </button>
      </div>

      {/* Info Banner */}
      {selectedOption === "receive" && (
        <div className="bg-[#3E2946] text-white py-2.5 3xl:py-3 rounded-xl 3xl:rounded-[15px] flex justify-center text-base 3xl:text-lg w-full items-center">
          With DoWs, you can prioritize your needs
          <Link to="#" className="text-primary-user font-semibold pl-2 underline-offset-4 underline transition-colors">
            Learn More
          </Link>
        </div>
      )}
    </div>
  );
};

export default DonationSelector;
