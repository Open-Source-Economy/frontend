import React from "react";
import * as dto from "@open-source-economy/api-types";
import { AlertCircle, Clock, Edit, Github, Globe, Trash2, X } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";
import { CurrencyCompanion, ResponseTimeTypeCompanion, SourceIdentifierCompanion } from "src/ultils/companions";
import { Rate } from "../types";

interface ServiceCardProps {
  developerServiceEntry: dto.DeveloperServiceEntry;
  sourceIdentifiers: Map<dto.DeveloperProjectItemId, dto.SourceIdentifier>;
  defaultRate: Rate;
  onSelectProjects: (entry: dto.DeveloperServiceEntry) => void;
  onRemoveDeveloperService: (serviceId: dto.ServiceId) => void;
  onEditDeveloperService?: (entry: dto.DeveloperServiceEntry) => void;
  showError?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  developerServiceEntry,
  sourceIdentifiers: sourceIdentifiersMap,
  defaultRate,
  onSelectProjects,
  onRemoveDeveloperService,
  onEditDeveloperService,
  showError,
}) => {
  const service = developerServiceEntry.service;
  const developerService = developerServiceEntry.developerService;
  const currencySymbol = CurrencyCompanion.symbol(defaultRate.currency);

  // Check if service needs response time configuration
  const needsResponseTime = service.hasResponseTime && developerService?.responseTimeHours === undefined;
  const needsProjects = developerService?.developerProjectItemIds.length === 0;

  // Effective rate (custom or base)
  const effectiveRate = developerService?.hourlyRate || defaultRate.amount;
  const hasCustomRate = !!developerService?.hourlyRate;

  // Convert the map to use string keys for efficient lookups
  const normalizedMap = new Map<string, dto.SourceIdentifier>();
  for (const [key, value] of sourceIdentifiersMap.entries()) {
    normalizedMap.set(key.uuid, value);
  }

  const sourceIdentifiers: dto.SourceIdentifier[] = (developerService?.developerProjectItemIds ?? [])
    .map(id => normalizedMap.get(id.uuid))
    .filter((v): v is dto.SourceIdentifier => v !== undefined);

  const projectCount = sourceIdentifiers.length;

  return (
    <div className={`bg-brand-card-blue/30 rounded-xl border p-5 transition-all border-brand-neutral-300/30 hover:border-brand-accent/40`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {/* Service Name */}
          <div>
            <h4 className="text-brand-neutral-900">{service.name}</h4>
            {service.description && <p className="text-sm text-brand-neutral-600 mt-1">{service.description}</p>}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className={`text-sm flex items-center gap-1.5 ${hasCustomRate ? "text-brand-accent" : "text-brand-neutral-600"}`}>
                {currencySymbol} {effectiveRate}/hr
                {!hasCustomRate && <span className="text-xs text-brand-neutral-500">(base rate)</span>}
              </span>
              {developerService?.responseTimeHours && (
                <>
                  <span className="text-brand-neutral-400">•</span>
                  <span className="text-sm text-brand-neutral-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {ResponseTimeTypeCompanion.label(developerService.responseTimeHours)}
                    {<span className="text-xs text-brand-neutral-500">(response time)</span>}
                  </span>
                </>
              )}
              {needsResponseTime && (
                <>
                  <span className="text-brand-neutral-400">•</span>
                  <button
                    onClick={() => onSelectProjects(developerServiceEntry)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-warning/10 hover:bg-brand-warning/20 border border-brand-warning/30 rounded-lg text-xs text-brand-warning transition-all cursor-pointer"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Set response time</span>
                  </button>
                </>
              )}
              {needsProjects ? (
                <>
                  <span className="text-brand-neutral-400">•</span>
                  <button
                    onClick={() => onSelectProjects(developerServiceEntry)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-error/10 hover:bg-brand-error/20 border border-brand-error/30 rounded-lg text-xs text-brand-error transition-all cursor-pointer"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Add projects</span>
                  </button>
                </>
              ) : (
                <>
                  {/*<span className="text-brand-neutral-400">•</span>*/}
                  {/*<span className="text-sm text-brand-neutral-600">*/}
                  {/*  {projectCount} project{projectCount !== 1 ? "s" : ""}*/}
                  {/*</span>*/}
                </>
              )}
            </div>
          </div>

          {/* Projects */}
          {projectCount > 0 && (
            <div>
              <h5 className="text-xs text-brand-neutral-600 mb-2">
                {projectCount} Project{projectCount > 1 ? "s" : ""}
              </h5>
              <div className="flex flex-wrap gap-2">
                {sourceIdentifiers.map(sourceIdentifier => {
                  const displayName = SourceIdentifierCompanion.displayName(sourceIdentifier);
                  const isGithub = displayName.includes("/") || displayName.toLowerCase().includes("github");

                  return (
                    <div
                      key={displayName}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-card-blue border border-brand-neutral-300/40 rounded-lg text-sm text-brand-neutral-800 group"
                    >
                      {isGithub ? <Github className="w-3.5 h-3.5 text-brand-neutral-600" /> : <Globe className="w-3.5 h-3.5 text-brand-neutral-600" />}
                      <span className="truncate max-w-[200px]">{displayName}</span>
                      <button
                        onClick={() => onEditDeveloperService && onEditDeveloperService(developerServiceEntry)}
                        className="ml-1 p-0.5 rounded hover:bg-brand-error/20 text-brand-neutral-500 hover:text-brand-error transition-all cursor-pointer"
                        title="Remove project from service"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Error Message */}
          {showError && (needsResponseTime || needsProjects) && (
            <p className="text-sm text-brand-error leading-relaxed">* Please configure this service before proceeding</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {onEditDeveloperService && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditDeveloperService(developerServiceEntry)}
              className="h-9 w-9 p-0 text-brand-accent hover:text-brand-accent-light hover:bg-brand-accent/10 transition-all"
              title="Edit service"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveDeveloperService(service.id)}
            className="h-9 w-9 p-0 text-brand-error hover:text-brand-error-light hover:bg-brand-error/10 transition-all"
            title="Remove service"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
