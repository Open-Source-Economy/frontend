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
    <div className="w-full !space-y-2.5 xl:!space-y-3.5 3xl:!space-y-[19px] !my-7 3xl:!my-10">
      <div className="flex flex-wrap !gap-4 xl:!gap-2 2xl:!gap-4">
        {/* Donation Option */}
        <button
          onClick={() => handleSelect("donation")}
          className={`flex gap-2 items-center text-nowrap text-base 3xl:text-lg 4xl:text-xl font-medium font-montserrat flex-1`}
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
          className={`flex gap-2 items-center text-nowrap text-base 3xl:text-lg 4xl:text-xl font-medium font-montserrat flex-1 `}
        >
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedOption === "receive" ? "!border-primary-user" : "border-white"}`}
          >
            {selectedOption === "receive" && <div className="w-3 h-3 rounded-full bg-primary-user" />}
          </div>
          I want to receive{" "}
          <Link
            to="/"
            className="font-bold relative after:content-[''] after:absolute after:h-[2px] after:bg-current after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:transition-all after:duration-300"
          >
            DoW
          </Link>
        </button>
      </div>

      {/* Info Banner */}
      {selectedOption === "receive" && (
        <div className="bg-[#3E2946] text-white py-2.5 !px-3 3xl:py-3 rounded-xl gap-2 xl:text-nowrap flex-wrap xl:!flex-nowrap 3xl:rounded-[15px] flex justify-start text-sm 1600:text-base 3xl:text-lg w-full items-center">
          With DoWs, you can prioritize your needs
          <Link
            to="#"
            className="text-primary-user text-nowrap relative font-semibold after:transition-all after:content-[''] after:absolute after:h-0.5 after:bg-primary-user after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:duration-300"
          >
            Learn More
          </Link>
        </div>
      )}
    </div>
  );
};

export default DonationSelector;
