import React from "react";
import * as dto from "@open-source-economy/api-types";
import { IconButton, InfoPill, SelectProjectsPill } from "../ui";
import { CloseIcon, PenIcon } from "../icons";
import { displayedCurrencies, SourceIdentifierCompanion } from "../../../../../../data";
import { DeveloperProjectItem, DeveloperProjectItemId } from "@open-source-economy/api-types/dist/model/onboarding/DeveloperProjectItem";
import { Rate } from "../modals/edit/EditServiceModal";

interface DeveloperServiceItemProps {
  developerServiceEntry: dto.DeveloperServiceEntry;
  sourceIdentifiers: Map<dto.DeveloperProjectItemId, dto.SourceIdentifier>;
  defaultRate: Rate;
  onSelectProjects: (entry: dto.DeveloperServiceEntry) => void;
  onRemoveDeveloperService: (serviceId: dto.ServiceId) => void;
  onEditDeveloperService?: (entry: dto.DeveloperServiceEntry) => void;
  showError?: boolean;
}

export function DeveloperServiceItem(props: DeveloperServiceItemProps) {
  const numberOfDisplayedProjects = 5;

  const service = props.developerServiceEntry.service;
  const developerService = props.developerServiceEntry.developerService;
  const hasConfiguration = developerService !== null;

  const displayedCurrency = displayedCurrencies[props.defaultRate.currency];

  // TODO: is that the best way to do it?
  // Convert the map to use string keys for efficient lookups
  const normalizedMap = new Map<string, dto.SourceIdentifier>();
  for (const [key, value] of props.sourceIdentifiers.entries()) {
    normalizedMap.set(key.uuid, value);
  }

  const sourceIdentifiers: dto.SourceIdentifier[] = (developerService?.developerProjectItemIds ?? [])
    .map(id => normalizedMap.get(id.uuid))
    .filter((v): v is dto.SourceIdentifier => v !== undefined);

  const projectItemNames = sourceIdentifiers.map(si => SourceIdentifierCompanion.displayName(si));

  const visibleNames = projectItemNames.slice(0, numberOfDisplayedProjects).join(" | ");
  const hiddenCount = projectItemNames.length > numberOfDisplayedProjects ? projectItemNames.length - numberOfDisplayedProjects : 0;

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

          {sourceIdentifiers && (
            <div className="flex items-start content-start gap-[6px] self-stretch flex-wrap">
              <span className="text-white font-montserrat text-sm font-normal leading-[150%] opacity-60">
                {visibleNames}
                {hiddenCount > 0 && ` + ${hiddenCount} more`}
              </span>
            </div>
          )}

          {/* Configuration Pills */}
          {hasConfiguration && (developerService?.hourlyRate || developerService?.responseTimeHours) && (
            <div className="flex items-center gap-4 self-stretch">
              {/*TODO: create a function to display Hourly rate the same way in the whole code */}
              {developerService?.hourlyRate && <InfoPill text={`Hourly rate: ${displayedCurrency.symbol} ${developerService.hourlyRate}/h`} />}
              {developerService?.responseTimeHours && <InfoPill text={`Response time: ${developerService.responseTimeHours}`} />}
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
