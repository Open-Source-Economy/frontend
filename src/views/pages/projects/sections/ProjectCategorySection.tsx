import React from "react";
import { Button } from "src/views/components/ui/forms/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ProjectItemWithDetails } from "@open-source-economy/api-types";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectItemWithDetailsCompanion } from "src/ultils/companions/ProjectItemWithDetails.companion";

interface ProjectCategorySectionProps {
  category: string;
  projects: ProjectItemWithDetails[];
  initialShowCount: number;
  incrementCount: number;
  onViewProject?: (slug: string) => void;
  className?: string;
  canExpandMaintainers?: boolean;
}

export function ProjectCategorySection(props: ProjectCategorySectionProps) {
  const [displayCount, setDisplayCount] = React.useState(props.initialShowCount);

  const displayedProjects = props.projects.slice(0, displayCount);
  const hasMore = props.projects.length > displayCount;
  const remainingCount = props.projects.length - displayCount;

  if (props.projects.length === 0) {
    return null;
  }

  const handleShowMore = () => {
    setDisplayCount(prev => Math.min(prev + props.incrementCount, props.projects.length));
  };

  const handleShowLess = () => {
    setDisplayCount(props.initialShowCount);
  };

  return (
    <div className={props.className ?? ""}>
      {/* Category Header */}
      {/*<div className="mb-8">*/}
      {/*  <h2 className="text-foreground mb-1">{props.category}</h2>*/}
      {/*  <p className="text-sm text-muted-foreground">*/}
      {/*    {props.projects.length} {props.projects.length === 1 ? "project" : "projects"}*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8 items-start">
        {displayedProjects.map(item => (
          <ProjectCard
            key={ProjectItemWithDetailsCompanion.getProjectId(item).uuid}
            item={item}
            category={props.category}
            onViewProject={props.onViewProject}
            canExpandMaintainers={props.canExpandMaintainers}
          />
        ))}
      </div>

      {/* Show More/Less Buttons */}
      <div className="flex justify-center gap-4">
        {hasMore && (
          <Button onClick={handleShowMore} variant="outline" className="border-brand-accent/30 hover:bg-brand-accent/5">
            <ChevronDown className="w-4 h-4 mr-2" />
            Show {Math.min(remainingCount, props.incrementCount)} More {Math.min(remainingCount, props.incrementCount) === 1 ? "Project" : "Projects"}
          </Button>
        )}

        {displayCount > props.initialShowCount && (
          <Button onClick={handleShowLess} variant="outline" className="border-brand-accent/30 hover:bg-brand-accent/5">
            <ChevronUp className="w-4 h-4 mr-2" />
            Show Less
          </Button>
        )}
      </div>
    </div>
  );
}
