import React from "react";
import CustomCheckbox from "./CustomCheckBox";

type TermsAgreementProps = {
  isTermChecked: boolean;
  termError: boolean;

  setIsTermChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setTermError: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TermsAgreement({ isTermChecked, setIsTermChecked, termError, setTermError }: TermsAgreementProps) {
  return (
    <div className="grid grid-flow-col items-start justify-center gap-2 mt-4">
      <CustomCheckbox isTermChecked={isTermChecked} termError={termError} setTermError={setTermError} setIsTermChecked={setIsTermChecked} />
      <p className="text-[12px] leading-6 text-[#ffffff]">
        {/*TODO*/}
        By placing an order you agree with the{" "}
        <a href="" className="gradient-text fw-bold hover-effect">
          Terms of Use
        </a>{" "}
        and{" "}
        <a href="" className="gradient-text fw-bold hover-effect">
          Terms of Sales
        </a>
      </p>

      <style>{`
              .gradient-text {
                background: linear-gradient(90deg, #ff7e4b, #ff518c);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              .hover-effect {
                border-bottom: 1px solid transparent; /* Set a transparent border to allow border-image to show */
                transition: border-bottom 0.3s ease;
              }
              .hover-effect:hover {
                border-image: linear-gradient(90deg, #ff7e4b, #ff518c);
                border-image-slice: 1;
              }
            `}</style>
    </div>
  );
}
