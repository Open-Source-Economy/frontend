import React from "react";
import { Link } from "react-router-dom";
import { CampaignProductType, ProjectId } from "src/api/model";
import { paths } from "src/paths";

interface DonationSelectorProps {
  projectId: ProjectId;
  productType: CampaignProductType;
  setProductType: (productType: CampaignProductType) => void;
}

export function DonationSelector(props: DonationSelectorProps) {
  return (
    <div className="w-full !space-y-2.5 xl:!space-y-3.5 3xl:!space-y-[19px] !my-7 3xl:!my-10">
      <div className="flex flex-wrap !gap-4 xl:!gap-2 2xl:!gap-4">
        {/* Donation Option */}
        <button
          onClick={() => props.setProductType(CampaignProductType.DONATION)}
          className={`flex gap-2 items-center text-nowrap text-base 1600:text-lg 3xl:text-xl font-medium flex-1`}
        >
          <div
            className={`w-5 h-5  rounded-full border flex items-center justify-center ${
              props.productType === CampaignProductType.DONATION ? "!border-primary-user" : "border-white"
            }`}
          >
            {props.productType === CampaignProductType.DONATION && <div className="w-3 h-3 rounded-full bg-primary-user" />}
          </div>
          That's a donation{" "}
        </button>

        {/* Receive Option */}
        <button
          onClick={() => props.setProductType(CampaignProductType.CREDIT)}
          className={`flex gap-2 items-center text-nowrap text-base 1600:text-lg 3xl:text-xl font-medium flex-1 `}
        >
          <div
            className={`w-5 h-5 rounded-full border flex items-center justify-center ${props.productType === CampaignProductType.CREDIT ? "!border-primary-user" : "border-white"}`}
          >
            {props.productType === CampaignProductType.CREDIT && <div className="w-3 h-3 rounded-full bg-primary-user" />}
          </div>
          I want to receive{" "}
          <Link
            to={paths.HOW_ITS_WORK}
            className="font-bold relative after:content-[''] after:absolute after:h-[2px] after:bg-current after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:transition-all after:duration-300"
            target="_blank"
          >
            Credits
          </Link>
        </button>
      </div>

      {/* Info Banner */}
      {props.productType === CampaignProductType.CREDIT && (
        <div className="bg-[#3E2946] text-white py-2.5 !px-3 3xl:py-3 rounded-xl gap-2 xl:text-nowrap flex-wrap xl:!flex-nowrap 3xl:rounded-[15px] flex justify-start text-sm 1600:text-base 3xl:text-lg w-full items-center">
          Get bug fixes, features, support,
          <Link
            to={paths.project(props.projectId)}
            className="text-primary-user text-nowrap relative font-semibold after:transition-all after:content-[''] after:absolute after:h-0.5 after:bg-primary-user after:left-0 after:bottom-0 after:w-0 hover:after:w-full after:duration-300"
          >
            and more...
          </Link>
        </div>
      )}
    </div>
  );
}
