import React, { useState } from "react";

type CustomCheckboxProps = {
  isTermChecked: boolean;
  termError: boolean;

  setIsTermChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setTermError: React.Dispatch<React.SetStateAction<boolean>>;
};
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ isTermChecked, setIsTermChecked, termError, setTermError }) => {
  return (
    <div
      className={`w-6 group relative h-6 flex items-center justify-center rounded-md cursor-pointer transition-all duration-300  ${
        isTermChecked ? "gradient-bg border-transparent" : "bg-[#202F45] border-transparent"
      }
         ${termError ? "border !border-red-600" : "border-0"} `}
      onClick={() => {
        setTermError(false);
        setIsTermChecked(!isTermChecked);
      }}
    >
      <div className="absolute hidden group-hover:block -top-14 bg-[#FF595B] rounded-xl p-2 h-[48px] w-[280px] -left-6 text-xs">
        You need to accept out Terms of Sale and Terms of use to create a Type form account.
        <svg className="size-3 absolute -bottom-1 left-7" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,80 80,50 50,20 20,50" fill="#FF5252" style={{ transform: "scale(1.5)", transformOrigin: "center" }} />
        </svg>
      </div>
      {isTermChecked && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

export default CustomCheckbox;
