import React, { useState } from "react";

interface PrivatePublicToggledProps {}

export function PrivatePublicToggled(props: PrivatePublicToggledProps) {
  const [isToggled, setIsToggled] = useState(false); // Start with 'Public' as true

  const toggleSwitch = () => {
    setIsToggled(!isToggled); // Toggle the state
  };

  return (
    <>
      <h2 className={` ${isToggled ? "text-white" : "text-gray-600"}`}>Private</h2>
      <div className="relative inline-flex items-center cursor-pointer bg-[rgba(255,255,255,10%)] rounded-full w-11 h-6" onClick={toggleSwitch}>
        <span
          className={`absolute w-8 h-8 left-[-10px] bg-[#FF7E4B] rounded-full shadow transform transition-transform duration-300 ${
            isToggled ? "translate-x-[-1px]" : "translate-x-full"
          }`}
        />
      </div>
      <h2 className={` ${isToggled ? "text-gray-600" : "text-white"}`}>Public</h2>
    </>
  );
}
