import React, { FC } from "react";
import { Button } from "src/views/v1/components";

interface IsUpgradedProps {
  position?: string;
}

const IsUpgraded: FC<IsUpgradedProps> = ({ position }) => {
  return (
    <div
      className={`${position} mt-3 gap-2 border !border-primary-user pl-3 !pr-1 !py-1 bg-[#0E1F35] text-white text-[10px] sm:text-xs max-w-[390px] w-full rounded-[9px] flex justify-between items-center relative`}
    >
      {/* Arrow */}
      <div className="absolute block -top-[10px] left-[15%] -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-primary-user"></div>
      Only available with the Established plan.
      <Button audience="ALL" className="!h-8 !lowercase !max-w-[84px]" level="PRIMARY" size="MEDIUM">
        {" "}
        Upgrade
      </Button>
    </div>
  );
};

export default IsUpgraded;
