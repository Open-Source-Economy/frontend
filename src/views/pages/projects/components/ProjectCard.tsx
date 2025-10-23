import React from "react";
import { Card, CardContent } from "src/views/components/ui/card";
import { Button } from "src/views/components/ui/forms/button";
import { Badge } from "src/views/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "src/views/components/ui/collapsible";
import { ChevronDown, ChevronUp, ExternalLink, GitFork, MessageCircle, Star } from "lucide-react";
import { ProjectItemWithDetails } from "@open-source-economy/api-types";
import { ProjectItemWithDetailsCompanion } from "src/ultils/companions/ProjectItemWithDetails.companion";

interface ProjectCardProps {
  item: ProjectItemWithDetails;
  category: string;
  onViewProject?: (slug: string) => void;
  canExpandMaintainers?: boolean;
}

export function ProjectCard(props: ProjectCardProps) {
  const canExpand = props.canExpandMaintainers ?? true;
  const [openMaintainers, setOpenMaintainers] = React.useState(false);

  const projectId = ProjectItemWithDetailsCompanion.getProjectId(props.item);
  const projectName = ProjectItemWithDetailsCompanion.getProjectName(props.item);
  const projectDescription = ProjectItemWithDetailsCompanion.getProjectDescription(props.item);
  const githubUrl = ProjectItemWithDetailsCompanion.getGithubUrl(props.item);
  const stars = ProjectItemWithDetailsCompanion.getStars(props.item);
  const forks = ProjectItemWithDetailsCompanion.getForks(props.item);
  const mainLanguage = ProjectItemWithDetailsCompanion.getMainLanguage(props.item);
  const developers = props.item.developers;
  const maintainersCount = developers.length;
  const visibleDevelopers = developers.slice(0, 3);
  const remainingMaintainers = maintainersCount - visibleDevelopers.length;
  const isUrlProject = ProjectItemWithDetailsCompanion.isUrlProject(props.item);

  return (
    <Card
      key={projectId}
      className="group hover:shadow-lg transition-all duration-300 border-border hover:border-brand-primary/20 cursor-pointer"
      onClick={() => props.onViewProject?.(projectId)}
    >
      <CardContent className="p-5 h-full flex flex-col">
        {/* Project Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-foreground truncate">{projectName}</h3>
            </div>
            {/* Display the category */}
            <p className="text-xs text-muted-foreground">{props.category}</p>
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              window.open(githubUrl, "_blank");
            }}
            className="opacity-40 hover:opacity-100 transition-opacity p-1 rounded text-muted-foreground hover:text-foreground flex-shrink-0"
            title={isUrlProject ? "Visit Project" : "View on GitHub"}
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{projectDescription}</p>

        {/* GitHub Stats */}
        <div className="flex items-center gap-4 pb-3 mb-3 border-b border-border/50 text-xs opacity-60">
          <div className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-brand-warning/70" />
            <span className="text-muted-foreground">{stars}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GitFork className="w-3 h-3 text-brand-accent/70" />
            <span className="text-muted-foreground">{forks}</span>
          </div>
          <div className="ml-auto">
            {/* Only display mainLanguage if it exists */}
            {mainLanguage && (
              <Badge variant="outline" className="text-xs py-0 opacity-80 border-border/50">
                {mainLanguage}
              </Badge>
            )}
          </div>
        </div>

        {/* Expert Maintainers - Only show section if there are maintainers */}
        {maintainersCount > 0 && (
          <div className="mt-auto">
            {canExpand ? (
              <Collapsible open={openMaintainers} onOpenChange={setOpenMaintainers}>
                <CollapsibleTrigger asChild>
                  <div className="flex items-center gap-2 py-1 px-2 -mx-2 rounded-lg cursor-pointer group/maintainers hover:bg-brand-accent/5 transition-colors">
                    <span className="text-sm text-muted-foreground group-hover/maintainers:text-brand-accent transition-colors">
                      {maintainersCount} Expert maintainer{maintainersCount !== 1 ? "s" : ""}
                    </span>
                    <div className="ml-auto p-1 hover:bg-brand-accent/10 rounded transition-colors">
                      {openMaintainers ? (
                        <ChevronUp className="w-3.5 h-3.5 text-brand-accent" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent onClick={e => e.stopPropagation()}>
                  <div className="space-y-2 mt-2">
                    {/* Iterate over the actual developer data */}
                    {visibleDevelopers.map(developer => (
                      <div key={developer.developerOwner.id.login} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-brand-accent/20 flex-shrink-0">
                          <img
                            src={developer.developerOwner.displayAvatarUrl || developer.developerOwner.avatarUrl || ""}
                            alt={developer.developerOwner.name || developer.developerOwner.id.login}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-foreground truncate">{developer.developerOwner.name || developer.developerOwner.id.login}</p>
                          <p className="text-xs text-muted-foreground truncate">{developer.developerProjectItem.comment || "Maintainer"}</p>
                        </div>
                      </div>
                    ))}

                    {/* View All Maintainers Link - Only show if there are more than 3 maintainers */}
                    {remainingMaintainers > 0 && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          props.onViewProject?.(projectId);
                        }}
                        className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accent-dark transition-colors mt-1 py-1"
                      >
                        <span>
                          + {remainingMaintainers} more maintainer{remainingMaintainers !== 1 ? "s" : ""}
                        </span>
                      </button>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <div className="py-1 px-2 -mx-2">
                <span className="text-sm text-muted-foreground">
                  {maintainersCount} Expert maintainer{maintainersCount !== 1 ? "s" : ""}
                </span>
              </div>
            )}

            {/*  /!* Talk to Maintainers Button *!/*/}
            {/*  <div className="mt-3 pt-3 border-t border-border">*/}
            {/*    <Button*/}
            {/*      onClick={e => {*/}
            {/*        e.stopPropagation();*/}
            {/*        window.location.href = "#contact";*/}
            {/*      }}*/}
            {/*      variant="outline"*/}
            {/*      size="sm"*/}
            {/*      className="w-full border-brand-accent/30 hover:bg-brand-accent/10 hover:border-brand-accent text-brand-accent"*/}
            {/*    >*/}
            {/*      <MessageCircle className="w-3.5 h-3.5 mr-2" />*/}
            {/*      Talk to Maintainers*/}
            {/*    </Button>*/}
            {/*  </div>*/}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
