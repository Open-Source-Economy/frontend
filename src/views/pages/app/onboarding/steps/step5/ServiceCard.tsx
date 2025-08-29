import React from "react";
import { Currency, DeveloperServiceEntry, ServiceId, DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { ProjectItemIdCompanion } from "../../../../../data";
import { displayedCurrencies } from "../../../../../data";

interface ServiceCardProps {
  category: string;
  developerServices: DeveloperServiceEntry[];
  projectItemNameMap: Map<string, string>;
  developerProjectItemEntries: DeveloperProjectItemEntry[];
  currency: Currency;
  onEditTask: (entry: DeveloperServiceEntry) => void;
  onDeleteDeveloperService: (serviceId: ServiceId) => void;
}

export function ServiceCard(props: ServiceCardProps) {
  if (props.developerServices.length === 0) {
    return null;
  }

  const getProjectName = (projectId: { uuid: string }): string => {
    // First try the projectItemNameMap
    const mappedName = props.projectItemNameMap.get(projectId.uuid);
    if (mappedName) return mappedName;

    // Fallback to finding in developerProjectItemEntries
    const projectEntry = props.developerProjectItemEntries.find(entry => entry.projectItem.id.uuid === projectId.uuid);

    if (projectEntry) {
      return ProjectItemIdCompanion.displayName(projectEntry.projectItem.sourceIdentifier);
    }

    // Last fallback
    return `Project ${projectId.uuid.substring(0, 8)}`;
  };

  return (
    <div className="flex flex-col items-start gap-6 w-full">
      {/* Category Title */}
      <h3 className="text-[#FF7E4B] font-michroma text-[28px] leading-[130%] font-normal w-full">{props.category}</h3>

      {/* Services Container */}
      <div className="flex flex-col items-start w-full rounded-[30px]">
        {props.developerServices.map((entry, index) => {
          const isLastItem = index === props.developerServices.length - 1;
          const hasProjects = entry.developerService?.projectItemIds && entry.developerService.projectItemIds.length > 0;

          // Get project names for display
          const projectNames = entry.developerService?.projectItemIds?.map(projectId => getProjectName(projectId)) || [];

          // Format project display text
          const getProjectDisplayText = () => {
            if (projectNames.length === 0) return "";
            if (projectNames.length <= 5) {
              return projectNames.join(" | ");
            } else {
              const displayedProjects = projectNames.slice(0, 5).join(" | ");
              const remaining = projectNames.length - 5;
              return `${displayedProjects} | ${remaining} more...`;
            }
          };

          const projectDisplayText = getProjectDisplayText();

          return (
            <div key={entry.service.id.uuid} className="flex flex-col items-start w-full bg-[#14233A]">
              {/* Service Item */}
              <div
                className={`flex px-7 py-7 flex-col justify-center items-center gap-4 w-full ${
                  !isLastItem ? "border-b border-[#0E1F35]" : ""
                } ${index === 0 ? "pt-7" : ""} ${isLastItem ? "pb-0" : ""}`}
              >
                {/* Service Header Row */}
                <div className="flex items-center gap-4 w-full">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">{entry.service.name}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Edit Button */}
                    <button
                      onClick={() => props.onEditTask(entry)}
                      className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 text-white hover:text-orange-400 transition-colors"
                      title="Edit Service"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12.001 19.9997H21.001M16.377 3.62173C16.775 3.22364 17.315 3 17.878 3C18.4409 3 18.9809 3.22364 19.379 3.62173C19.777 4.01982 20.0007 4.55975 20.0007 5.12273C20.0007 5.68572 19.777 6.22564 19.379 6.62373L7.36895 18.6347C7.13105 18.8726 6.83698 19.0467 6.51395 19.1407L3.64195 19.9787C3.5559 20.0038 3.46469 20.0053 3.37786 19.9831C3.29103 19.9608 3.21178 19.9157 3.1484 19.8523C3.08502 19.7889 3.03984 19.7097 3.0176 19.6228C2.99535 19.536 2.99686 19.4448 3.02195 19.3587L3.85995 16.4867C3.95417 16.1641 4.1282 15.8704 4.36595 15.6327L16.377 3.62173Z"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Close Button */}
                    <button
                      onClick={() => props.onDeleteDeveloperService(entry.service.id)}
                      className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 text-white hover:text-red-400 transition-colors"
                      title="Remove Service"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 4L4 20" stroke="currentColor" strokeLinecap="round" />
                        <path d="M4 4L20 20" stroke="currentColor" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Projects Display */}
                {hasProjects && projectDisplayText && (
                  <div className="flex items-start align-content-start gap-2 w-full flex-wrap">
                    <span className="text-white font-montserrat text-[14px] leading-[150%] font-normal opacity-60">{projectDisplayText}</span>
                  </div>
                )}

                {/* Info Pills */}
                {hasProjects && (
                  <div className="flex items-center gap-4 w-full">
                    {/* Hourly Rate Pill */}
                    {entry.developerService?.hourlyRate && (
                      <div className="flex px-2.5 py-0.5 justify-center items-center gap-2.5 rounded-[50px] border border-[#FF7E4B]">
                        <span className="text-white font-montserrat text-[14px] leading-[150%] font-normal">
                          Hourly rate: {displayedCurrencies[props.currency]?.symbol} {entry.developerService.hourlyRate}
                        </span>
                      </div>
                    )}

                    {/* Response Time Pill */}
                    {entry.developerService?.responseTimeHours && (
                      <div className="flex px-2.5 py-0.5 justify-center items-center gap-2.5 rounded-[50px] border border-[#FF7E4B]">
                        <span className="text-white font-montserrat text-[14px] leading-[150%] font-normal">
                          Response time: {entry.developerService.responseTimeHours} hours
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Error Message for unconfigured services (fallback) */}
                {!hasProjects && (
                  <div className="flex flex-col items-start gap-3 w-full">
                    <div className="flex items-center gap-4 w-full">
                      <button
                        onClick={() => props.onEditTask(entry)}
                        className="flex px-2.5 py-0.5 justify-center items-center gap-2.5 rounded-[50px] bg-[#202F45] hover:bg-[#2a3f56] transition-colors"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <mask
                            id={`mask0_714_31789_${entry.service.id.uuid}`}
                            style={{ maskType: "luminance" }}
                            maskUnits="userSpaceOnUse"
                            x="1"
                            y="1"
                            width="16"
                            height="16"
                          >
                            <path
                              d="M9 16.0625C12.6245 16.0625 15.5625 13.1245 15.5625 9C15.5625 5.37553 12.6245 2.4375 9 2.4375C5.37553 2.4375 2.4375 5.37553 2.4375 9C2.4375 13.1245 5.37553 16.0625 9 16.0625Z"
                              fill="white"
                              stroke="white"
                              strokeWidth="1.3125"
                              strokeLinejoin="round"
                            />
                            <path d="M9 6.375V11.625M6.375 9H11.625" stroke="black" strokeWidth="1.3125" strokeLinecap="round" strokeLinejoin="round" />
                          </mask>
                          <g mask={`url(#mask0_714_31789_${entry.service.id.uuid})`}>
                            <path d="M1.125 1.125H16.875V16.875H1.125V1.125Z" fill="white" />
                          </g>
                        </svg>
                        <span className="text-white font-montserrat text-[14px] leading-[150%] font-normal">Select Projects</span>
                      </button>
                    </div>
                    <div className="text-[#FF8C8C] font-montserrat text-[16px] leading-[150%] font-normal">* Please select projects</div>
                  </div>
                )}
              </div>

              {/* Bottom padding for last item */}
              {isLastItem && <div className="pb-6"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceCard;
