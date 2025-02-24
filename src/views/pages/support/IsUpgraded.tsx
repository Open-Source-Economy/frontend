import React, { FC } from "react";

interface IsUpgradedProps {
  position?: string;
}

const IsUpgraded: FC<IsUpgradedProps> = ({ position }) => {
  return (
    <div
      className={`${position} mt-3 border !border-primary-user pl-3 !pr-1 !py-1 bg-[#0E1F35] text-white text-xs max-w-[390px] w-full rounded-[9px] flex justify-between items-center relative`}
    >
      {/* Arrow */}
      <div className="absolute block -top-[10px] left-[15%] -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-primary-user"></div>
      Only available with the Established plan.
      <button className="bg-gradient-custom h-8 flex justify-center items-center px-2 after:absolute after:w-[98%] after:top-1/2 after:left-1/2 after:!bg-[#0e1f35] after:h-[93%] after:-z-10 relative z-20 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md after:opacity-0 after:duration-300 rounded-md">
        Upgrade
      </button>
    </div>
  );
};

export default IsUpgraded;
