import React from "react";
import { ProjectDeveloperProfile } from "@open-source-economy/api-types";
import { ProjectDeveloperProfileCompanion } from "src/ultils/companions/ProjectDeveloperProfile.companion";
import { MaintainerCard } from "./components/MaintainerCard";

interface MaintainersListProps {
  developers: ProjectDeveloperProfile[];
  projectName: string;
}

export function MaintainersList(props: MaintainersListProps) {
  if (props.developers.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {props.developers.map(developer => (
        <MaintainerCard key={getDeveloperKey(developer)} developer={developer} projectName={props.projectName} />
      ))}
    </div>
  );
}

function getDeveloperKey(developer: ProjectDeveloperProfile): string | undefined {
  return ProjectDeveloperProfileCompanion.getStableIdentifier(developer) ?? undefined;
}
