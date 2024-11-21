import React, { useState } from "react";

export enum Tab {
  One,
  Two,
}

interface PaymentOptionsProps {
  tab1Title: React.ReactNode;
  tab2Title: React.ReactNode;
  tab1: React.ReactNode;
  tab2: React.ReactNode;
}

export function PaymentOptions(props: PaymentOptionsProps) {
  const [activeTab, setActiveTab] = useState(Tab.One);

  return (
    <>
      <div className="">
        <h2
          onClick={() => setActiveTab(Tab.One)}
          className={`text-center text-[25px] cursor-pointer pt-2 ${activeTab === Tab.One ? " opacity-100" : "opacity-50"}`}
        >
          {props.tab1Title}
        </h2>
        <div
          onClick={() => setActiveTab(Tab.One)}
          className={`bg-[#14233A] rounded-[30px] cursor-pointer p-4 mt-12 w-[340px] md:w-96  ${
            activeTab === Tab.One ? "shadow-custom-double-left-right transition-all ease-in-out duration-500" : "opacity-50"
          }`}
        >
          {props.tab1}
        </div>
      </div>

      <div className="">
        <h2
          onClick={() => setActiveTab(Tab.Two)}
          className={`text-center text-[25px] cursor-pointer mt-5 mt-lg-0 ${activeTab === Tab.Two ? " opacity-100" : "opacity-50"}`}
        >
          {props.tab2Title}
        </h2>
        <div
          onClick={() => setActiveTab(Tab.Two)}
          className={`bg-[#14233A] cursor-pointer rounded-[30px] p-4 mt-12 w-[340px] md:w-96  ${
            activeTab === Tab.Two ? "shadow-custom-double-left-right transition-all ease-in-out duration-500" : "opacity-50"
          }`}
        >
          {props.tab2}
        </div>
      </div>
    </>
  );
}
