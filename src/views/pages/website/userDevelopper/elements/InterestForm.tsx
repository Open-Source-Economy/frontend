import React, { useEffect, useRef, useState } from "react";
import "./InterestForm.css";
import { Button } from "src/components/elements/Button";

interface InterestFormProps {}

const profileOptions = ["Your Profile", "Profile 1", "Profile 2", "Profile 3"];

const projectOptions = ["In which open source project? (if applicable)", "Project 1", "Project 2", "Project 3"];

export function InterestForm(props: InterestFormProps) {
  const [isOpenDropdown1, setIsOpenDropdown1] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState(profileOptions[0]);
  const [isOpenDropdown2, setIsOpenDropdown2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(projectOptions[0]);

  // Create refs for the dropdown containers
  const dropdown1Ref = useRef<HTMLDivElement>(null);
  const dropdown2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle click outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target as Node)) {
        setIsOpenDropdown1(false);
      }
      if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target as Node)) {
        setIsOpenDropdown2(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle functions for each dropdown
  const toggleDropdown1 = () => {
    setIsOpenDropdown2(false);
    setIsOpenDropdown1(!isOpenDropdown1);
  };

  const toggleDropdown2 = () => {
    setIsOpenDropdown1(false);
    setIsOpenDropdown2(!isOpenDropdown2);
  };

  // Handle selection for each dropdown
  const handleSelect1 = (option: string) => {
    setSelectedOption1(option);
    setIsOpenDropdown1(false);
  };

  const handleSelect2 = (option: string) => {
    setSelectedOption2(option);
    setIsOpenDropdown2(false);
  };

  return (
    <>
      <h1
        className="text-center text-3xl md:text-4xl lg:text-6xl 3xl:text-[71px] lg:mt-32 md:mt-22 xl:mt-[186px] mt-14 michroma leading-[120%]"
        style={{
          background: "linear-gradient(90deg, #66319B 0%, #FF518C 50%, #FF7E4B 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Register your <br /> interest now.
      </h1>

      <div className="container mx-auto flex flex-col pt-14 lg:pt-[105px] lg:px-20 2xl:px-64 md:px-32 sm:px-10">
        <div>
          <input
            type="email"
            placeholder="Your Email*"
            className="email border-bottom border-[#fff] bg-transparent text-[16px] lg:text-[24px] pb-3 outline-none text-[#fff] w-100 michroma"
          />

          <label className="flex align-items-center mt-3 gap-2 agreecheckbox cursor-pointer">
            <input className="w-4 h-4" type="checkbox" />
            <h2 className="text-[15px] text-[rgba(252,254,253,27%)] michroma">Sign up for news & updates</h2>
          </label>

          {/* First Dropdown */}
          <div ref={dropdown1Ref} className="mt-5 relative inline-block text-left w-100">
            <button
              onClick={toggleDropdown1}
              className="flex text-left items-center justify-between border-bottom border-[#fff] bg-transparent text-[16px] lg:text-[24px] pb-3 outline-none text-[#FCFEFD] w-100 michroma"
            >
              {selectedOption1}
              <svg
                className={`w-8 h-8 p-1 ml-2 border border-[#fff] rounded-full text-[#fff] transform transition-transform duration-200 ${
                  isOpenDropdown1 ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isOpenDropdown1 && (
              <div className="absolute z-[999] top-12 cursor-pointer left-0 mb-2 w-full bg-[#0e1f35] border border-gray-300 rounded-md shadow-lg">
                <div className="p-2">
                  {profileOptions.slice(1).map((option, index) => (
                    <h1
                      key={index}
                      onClick={() => handleSelect1(option)}
                      className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200"
                    >
                      {option}
                    </h1>
                  ))}
                </div>
              </div>
            )}

            {/* Second Dropdown */}
            <div ref={dropdown2Ref} className="mt-5 relative inline-block text-left w-100">
              <button
                onClick={toggleDropdown2}
                className="flex items-center text-left justify-between border-bottom border-[#fff] bg-transparent text-[16px] lg:text-[24px] pb-3 outline-none text-[#FCFEFD] w-100 michroma"
              >
                {selectedOption2}
                <svg
                  className={`w-8 h-8 p-1 ml-2 border border-[#fff] rounded-full text-[#fff] transform transition-transform duration-200 ${
                    isOpenDropdown2 ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpenDropdown2 && (
                <div className="absolute z-50 cursor-pointer left-0 mt-2 w-full bg-[#0e1f35] border border-gray-300 rounded-md shadow-lg">
                  <div className="p-2">
                    {projectOptions.slice(1).map((option, index) => (
                      <h1
                        key={index}
                        onClick={() => handleSelect2(option)}
                        className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors duration-200"
                      >
                        {option}
                      </h1>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="mt-5">
            <h1 className="text-[23px] michroma text-[#FCFEFD45]">Message</h1>
            <input
              placeholder="Share your motivation..."
              type="text"
              className="mt-3 message border-bottom border-[#fff] bg-transparent lg:text-[17px] text-[14px] lg:pb-48 pb-20 md:pb-32 outline-none text-[#fff] w-100 placeholder:!text-white placeholder:!opacity-100 michroma"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <Button level={"PRIMARY"} size="MEDIUM" asChild>
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
