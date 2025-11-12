import React from "react";
import type { ProjectDeveloperProfile } from "@open-source-economy/api-types";
import { SectionHeader } from "../../../components/ui/section/section-header";
import { Button } from "../../../components/ui/forms";
import { MaintainerCard } from "./components/MaintainerCard";
import { ProjectDeveloperProfileCompanion } from "../../../../ultils/companions/ProjectDeveloperProfile.companion";

const DEFAULT_MAINTAINER_DISPLAY_COUNT = 3;

interface MaintainersSectionProps {
  developers: ProjectDeveloperProfile[];
  projectName: string;
  showAllMaintainers: boolean;
  onToggleShowAll: () => void;
}

export function MaintainersSection({ developers, projectName, showAllMaintainers, onToggleShowAll }: MaintainersSectionProps) {
  const displayedMaintainers =
    showAllMaintainers || developers.length <= DEFAULT_MAINTAINER_DISPLAY_COUNT ? developers : developers.slice(0, DEFAULT_MAINTAINER_DISPLAY_COUNT);

  return (
    <section>
      <SectionHeader title="Meet the Maintainers" description="Get direct access to the experts behind the project" spacing="lg" visibility="normal" />

      {displayedMaintainers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedMaintainers.map(developer => (
              <MaintainerCard key={ProjectDeveloperProfileCompanion.getStableIdentifier(developer)} developer={developer} projectName={projectName} />
            ))}
          </div>

          {developers.length > DEFAULT_MAINTAINER_DISPLAY_COUNT && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={onToggleShowAll} className="text-brand-neutral-700 hover:text-brand-accent border-brand-neutral-300">
                {showAllMaintainers ? "Show Less" : `See All ${developers.length} Maintainers`}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 text-center">
          <p className="text-sm text-brand-neutral-500">Maintainer information will be available soon.</p>
        </div>
      )}
    </section>
  );
}
