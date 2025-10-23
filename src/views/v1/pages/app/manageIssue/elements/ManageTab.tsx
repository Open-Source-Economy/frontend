import React, { useState } from "react";

export enum Tab {
  One,
  Two,
}

interface ManageTabProps {
  tab1Title: string;
  tab2Title: string;
  tab1: React.ReactNode;
  tab2: React.ReactNode;
}

export function ManageTab(props: ManageTabProps) {
  const [activeTab, setActiveTab] = useState(Tab.One);

  return (
    <>
      <div className="padding sm:!py-10 !p-4 sm:!px-10 text-center justify-center flex flex-col items-start w-full bg-[#14233A] rounded-3xl">
        <div className="relative p-[2px] w-full">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#ff7e4b] via-[#FF518C] to-[#66319B]" />
          <div className="bg-[#14233A] rounded-lg flex justify-between items-center relative z-10 p-2">
            <button
              className={`btnpadding w-full transition-all duration-500 ease-in-out py-3 !px-5 focus:outline-none montserrat text-sm md:text-lg ${
                activeTab === Tab.One ? "text-white bg-[#ff7e4b] rounded-md shadow-[0_0_20px_5px_rgba(255,81,140,0.4)]" : "bg-transparent text-gray-300"
              }`}
              onClick={() => setActiveTab(Tab.One)}
            >
              {props.tab1Title}
            </button>

            <button
              className={`btnpadding w-full transition-all duration-500 ease-in-out py-3 !px-5 focus:outline-none montserrat text-sm md:text-lg ${
                activeTab === Tab.Two ? "text-white bg-[#ff7e4b] rounded-md shadow-[0_0_20px_5px_rgba(255,81,140,0.4)]" : "bg-transparent text-gray-300"
              }`}
              onClick={() => setActiveTab(Tab.Two)}
            >
              {props.tab2Title}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="!mt-8 xl:!mt-10 3xl:!mt-14 flex items-center justify-center w-full">
          <>
            {activeTab === Tab.One && props.tab1}
            {activeTab === Tab.Two && props.tab2}
          </>
        </div>
      </div>
    </>
  );
}
