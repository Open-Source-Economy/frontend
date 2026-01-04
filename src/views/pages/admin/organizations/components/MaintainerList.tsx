import React from "react";
import * as dto from "@open-source-economy/api-types";
import { ExternalLink } from "src/views/components/ui/forms/external-link";
import { GitMerge, Shield, Users } from "lucide-react";
import { DeveloperRoleTypeCompanion, MergeRightsTypeCompanion } from "src/ultils/companions";

interface MaintainerDeveloper {
  developerProfile: dto.DeveloperProfile;
  developerOwner: dto.Owner;
  developerProjectItem: dto.DeveloperProjectItem;
}

interface MaintainerListProps {
  developers: MaintainerDeveloper[];
}

export function MaintainerList({ developers }: MaintainerListProps) {
  if (!developers || developers.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
      <div className="flex items-start gap-2 mb-3">
        <Users className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
        <p className="text-sm font-semibold text-purple-300">Registered Maintainers ({developers.length})</p>
      </div>
      <div className="space-y-2">
        {developers.map((dev, idx) => (
          <div
            key={`${dev.developerProfile.id.uuid}-${idx}`}
            className="flex items-start gap-3 p-2 bg-purple-500/10 border border-purple-500/20 rounded hover:bg-purple-500/20 transition-colors"
          >
            {/* Avatar, Name and Username */}
            <div className="flex items-center gap-2 flex-1">
              {dev.developerOwner.displayAvatarUrl && (
                <img src={dev.developerOwner.displayAvatarUrl} alt={dev.developerOwner.id.login} className="w-6 h-6 rounded-full" />
              )}
              <div className="flex flex-col">
                {dev.developerOwner.name && <span className="text-sm text-white font-medium">{dev.developerOwner.name}</span>}
                <ExternalLink href={`https://github.com/${dev.developerOwner.id.login}`} className="text-xs text-purple-200 hover:text-purple-100">
                  @{dev.developerOwner.id.login}
                </ExternalLink>
              </div>
            </div>

            {/* Roles */}
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-300">
                {dev.developerProjectItem.roles?.map((role: dto.DeveloperRoleType) => DeveloperRoleTypeCompanion.label(role)).join(", ") || "N/A"}
              </span>
            </div>

            {/* Merge Rights */}
            <div className="flex items-center gap-1">
              <GitMerge className="w-3 h-3 text-purple-400" />
              <span className="text-xs text-purple-300">
                {dev.developerProjectItem.mergeRights?.map((mr: dto.MergeRightsType) => MergeRightsTypeCompanion.label(mr)).join(", ") || "N/A"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
