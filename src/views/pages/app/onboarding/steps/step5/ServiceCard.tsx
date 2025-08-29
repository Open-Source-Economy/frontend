import React from "react";
import { Currency, DeveloperServiceEntry, ServiceId } from "@open-source-economy/api-types";

interface ServiceCardProps {
  category: string;
  developerServices: DeveloperServiceEntry[];
  projectItemNameMap: Map<string, string>;
  currency: Currency;
  onEditTask: (entry: DeveloperServiceEntry) => void;
  onDeleteDeveloperService: (serviceId: ServiceId) => void;
}

export function ServiceCard(props: ServiceCardProps) {
  if (props.developerServices.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-6 w-full">
      {/* Category Title */}
      <h3 className="text-[#FF7E4B] font-michroma text-[28px] leading-[130%] font-normal w-full">
        {props.category}
      </h3>

      {/* Services Container */}
      <div className="flex flex-col items-start w-full rounded-[30px]">
        {props.developerServices.map((entry, index) => {
          const isLastItem = index === props.developerServices.length - 1;
          
          return (
            <div key={entry.service.id.uuid} className="flex flex-col items-start w-full bg-[#14233A]">
              {/* Service Item */}
              <div className={`flex px-7 py-7 justify-center items-center gap-4 w-full ${
                !isLastItem ? 'border-b border-[#0E1F35]' : ''
              } ${index === 0 ? 'pt-7' : ''} ${isLastItem ? 'pb-7' : ''}`}>
                {/* Service Content */}
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal">
                    {entry.service.name}
                  </span>
                  
                  {/* Select Projects Button */}
                  <button
                    onClick={() => props.onEditTask(entry)}
                    className="flex px-2.5 py-0.5 justify-center items-center gap-2.5 rounded-[50px] bg-[#202F45] hover:bg-[#2a3f56] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <mask id={`mask0_714_31789_${entry.service.id.uuid}`} style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="1" y="1" width="16" height="16">
                        <path d="M9 16.0625C12.6245 16.0625 15.5625 13.1245 15.5625 9C15.5625 5.37553 12.6245 2.4375 9 2.4375C5.37553 2.4375 2.4375 5.37553 2.4375 9C2.4375 13.1245 5.37553 16.0625 9 16.0625Z" fill="white" stroke="white" strokeWidth="1.3125" strokeLinejoin="round"/>
                        <path d="M9 6.375V11.625M6.375 9H11.625" stroke="black" strokeWidth="1.3125" strokeLinecap="round" strokeLinejoin="round"/>
                      </mask>
                      <g mask={`url(#mask0_714_31789_${entry.service.id.uuid})`}>
                        <path d="M1.125 1.125H16.875V16.875H1.125V1.125Z" fill="white"/>
                      </g>
                    </svg>
                    <span className="text-white font-montserrat text-[14px] leading-[150%] font-normal">
                      Select Projects
                    </span>
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => props.onDeleteDeveloperService(entry.service.id)}
                  className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 text-white hover:text-red-400 transition-colors"
                  title="Remove Service"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4L4 20" stroke="currentColor" strokeLinecap="round"/>
                    <path d="M4 4L20 20" stroke="currentColor" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServiceCard;
