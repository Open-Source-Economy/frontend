import React from "react";
import * as dto from "@open-source-economy/api-types";
import { SelectProjectsPill, IconButton, InfoPill } from "./ui";
import { CloseIcon, PenIcon } from "./icons";

interface DeveloperServiceItemProps {
  developerServiceEntry: dto.DeveloperServiceEntry;
  onSelectProjects: (entry: dto.DeveloperServiceEntry) => void;
  onRemoveDeveloperService: (serviceId: dto.ServiceId) => void;
  onEditDeveloperService?: (entry: dto.DeveloperServiceEntry) => void;
  showError?: boolean;
}

export function DeveloperServiceItem(props: DeveloperServiceItemProps) {
  const service = props.developerServiceEntry.service;
  const developerService = props.developerServiceEntry.developerService;
  const hasConfiguration = developerService !== null;

  return (
    <>
      <div className="flex p-7 flex-col items-start gap-6 self-stretch bg-[#14233A] rounded-[30px]">
        <div className="flex pb-6 flex-col justify-center items-center gap-4 self-stretch border-b border-[#0E1F35]">
          {/* Service Header */}
          <div className="flex items-center gap-4 self-stretch">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-white font-montserrat text-base font-normal leading-[150%]">{service.name}</span>

              {!hasConfiguration && (
                <SelectProjectsPill onClick={() => props.onSelectProjects(props.developerServiceEntry)} hasError={props.showError && !hasConfiguration} />
              )}
            </div>

            {hasConfiguration && (
              <>
                {props.onEditDeveloperService && (
                  <IconButton onClick={() => props.onEditDeveloperService?.(props.developerServiceEntry)}>
                    <PenIcon className="w-6 h-6" />
                  </IconButton>
                )}

                <IconButton onClick={() => props.onRemoveDeveloperService(service.id)} variant="rounded">
                  <CloseIcon className="w-6 h-6" />
                </IconButton>
              </>
            )}

            {!hasConfiguration && (
              <IconButton onClick={() => props.onRemoveDeveloperService(service.id)}>
                <CloseIcon />
              </IconButton>
            )}
          </div>

          {/* Selected Projects List - TODO: This needs to be populated from developer service data */}
          {hasConfiguration && developerService?.projectIds && developerService.projectIds.length > 0 && (
            <div className="flex items-start content-start gap-[6px] self-stretch flex-wrap">
              {/* TODO: Map projectIds to project names */}
              <span className="text-white font-montserrat text-sm font-normal leading-[150%] opacity-60">
                {developerService.projectIds.length} project(s) configured
              </span>
            </div>
          )}

          {/* Configuration Pills */}
          {hasConfiguration && (developerService?.hourlyRate || developerService?.responseTime) && (
            <div className="flex items-center gap-4 self-stretch">
              {developerService?.hourlyRate && <InfoPill text={`Hourly rate: €${developerService.hourlyRate}`} />}
              {developerService?.responseTime && <InfoPill text={`Response time: ${developerService.responseTime}`} />}
            </div>
          )}
        </div>

        {props.showError && !hasConfiguration && (
          <div className="self-stretch text-[#FF8C8C] font-montserrat text-base font-normal leading-[150%]">* Please select projects</div>
        )}
      </div>
    </>
  );
}
