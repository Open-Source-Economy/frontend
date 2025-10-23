import React from "react";
import { Button } from "src/views/components/ui/forms/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ProjectItemWithDetails } from "@open-source-economy/api-types";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectItemWithDetailsCompanion } from "src/ultils/companions/ProjectItemWithDetails.companion";

interface ProjectCategorySectionProps {
  category: string;
  projects: ProjectItemWithDetails[];
  initialShowCount?: number;
  onViewProject?: (slug: string) => void;
  className?: string;
  canExpandMaintainers?: boolean;
}

export function ProjectCategorySection(props: ProjectCategorySectionProps) {
  const [showAll, setShowAll] = React.useState(false);

  const initialShowCount = props.initialShowCount ?? 4;
  const displayedProjects = showAll ? props.projects : props.projects.slice(0, initialShowCount);
  const hasMore = props.projects.length > initialShowCount;

  if (props.projects.length === 0) {
    return null;
  }

  return (
    <div className={props.className ?? ""}>
      {/* Category Header */}
      <div className="mb-8">
        <h2 className="text-foreground mb-1">{props.category}</h2>
        <p className="text-sm text-muted-foreground">
          {props.projects.length} {props.projects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8 items-start">
        {displayedProjects.map(item => (
          <ProjectCard
            key={ProjectItemWithDetailsCompanion.getProjectId(item)}
            item={item}
            category={props.category}
            onViewProject={props.onViewProject}
            canExpandMaintainers={props.canExpandMaintainers}
          />
        ))}
      </div>

      {/* Show More Button */}
      {hasMore && (
        <div className="flex justify-center">
          <Button onClick={() => setShowAll(!showAll)} variant="outline" className="border-brand-accent/30 hover:bg-brand-accent/5">
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4 mr-2" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-2" />
                Show {props.projects.length - initialShowCount} More {props.projects.length - initialShowCount === 1 ? "Project" : "Projects"}
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
