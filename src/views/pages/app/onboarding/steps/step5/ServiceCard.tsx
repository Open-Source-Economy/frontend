import React from "react";
import { displayedCurrencies } from "../../../../../data";
import { Currency, DeveloperServiceEntry, ServiceId } from "@open-source-economy/api-types";
import { CloseIcon } from "../step3/FundingCard";

interface ServiceCardProps {
  category: string;
  developerServices: DeveloperServiceEntry[];
  projectItemNameMap: Map<string, string>;
  currency: Currency;
  onEditTask: (entry: DeveloperServiceEntry) => void;
  onDeleteDeveloperService: (serviceId: ServiceId) => void;
}

export function ServiceCard(props: ServiceCardProps) {
  return (
    <div key={props.category} className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
      <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[20px] text-left">
        <p className="block leading-[1.3]">{props.category}</p>
      </div>

      {props.developerServices.map(entry => {
        const projectItemNames = (entry.developerService?.projectItemIds || [])
          .map(projectId => props.projectItemNameMap.get(projectId.uuid))
          .filter(Boolean) as string[];

        const projectsDisplay =
          projectItemNames.length > 0
            ? projectItemNames.length > 5
              ? `${projectItemNames.slice(0, 5).join(" | ")} | +${projectItemNames.length - 5} more...`
              : projectItemNames.join(" | ")
            : "No projects selected";

        const displayRate = entry.developerService?.hourlyRate ?? 0;

        return (
          <div key={entry.service.id.uuid} className="box-border content-stretch flex flex-col gap-3 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-row gap-4 items-start justify-between p-0 relative shrink-0 w-full">
              <div className="flex-1">
                <div className="font-montserrat font-normal text-[#ffffff] text-[16px] text-left mb-1">
                  <p className="block leading-[1.5]">{entry.service.name}</p>
                </div>
                <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left opacity-70 mb-2">
                  <p className="block leading-[1.4]">{projectsDisplay}</p>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left">
                    <p className="block leading-[1.5]">
                      Hourly rate: {displayedCurrencies[props.currency]?.symbol} {displayRate}
                    </p>
                  </div>
                  {entry.service.hasResponseTime && (
                    <div className="font-montserrat font-normal text-[#ffffff] text-[14px] text-left">
                      <p className="block leading-[1.5]">Response time: {entry.developerService?.responseTimeHours ?? "12"} hours</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row gap-2 items-center">
                <button
                  onClick={() => entry.developerService && props.onEditTask(entry)}
                  className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors p-1"
                  title="Edit Service"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.333 2.00009C11.5081 1.82499 11.7167 1.68595 11.9457 1.59129C12.1747 1.49663 12.4194 1.44788 12.6663 1.44788C12.9133 1.44788 13.158 1.49663 13.387 1.59129C13.616 1.68595 13.8246 1.82499 13.9997 2.00009C14.1748 2.17518 14.3138 2.38383 14.4085 2.61281C14.5032 2.8418 14.5519 3.08651 14.5519 3.33342C14.5519 3.58033 14.5032 3.82504 14.4085 4.05403C14.3138 4.28302 14.1748 4.49167 13.9997 4.66676L5.33301 13.3334L1.33301 14.6667L2.66634 10.6667L11.333 2.00009Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => props.onDeleteDeveloperService(entry.service.id)}
                  className="text-[#ffffff] hover:text-red-400 transition-colors p-1"
                  title="Remove Service"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
