import React from "react";
import { Card, CardContent } from "src/views/components/ui/card";
import { Badge } from "src/views/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "src/views/components/ui/collapsible";
import { Building2, ChevronDown, ExternalLink, GitFork, Star, Users } from "lucide-react";
import { ProjectItemType, ProjectItemWithDetails } from "@open-source-economy/api-types";
import { ProjectItemWithDetailsCardView, ProjectItemWithDetailsCompanion } from "src/ultils/companions/ProjectItemWithDetails.companion";
import { DeveloperRoleTypeCompanion } from "src/ultils/companions/DeveloperRoleType.companion";

interface ProjectCardProps {
  item: ProjectItemWithDetails;
  category?: string;
  onViewProject?: (slug: string) => void;
  canExpandMaintainers?: boolean;
}

export function ProjectCard(props: ProjectCardProps) {
  const canExpand = props.canExpandMaintainers ?? true;
  const [openMaintainers, setOpenMaintainers] = React.useState(false);

  // Create view model with all display information
  const view: ProjectItemWithDetailsCardView = ProjectItemWithDetailsCompanion.toCardView(props.item, 3);
  const isOwnerProject = view.projectItemType === ProjectItemType.GITHUB_OWNER;
  const isUrlProject = view.projectItemType === ProjectItemType.URL;

  return (
    <Card
      key={view.projectId.uuid}
      className="group hover:shadow-lg transition-all duration-300 border-border hover:border-brand-primary/20 cursor-pointer overflow-hidden"
      onClick={() => props.onViewProject?.(view.projectId.uuid)}
    >
      <CardContent className="p-5 flex flex-col overflow-hidden">
        {/* Project Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-foreground truncate">{view.displayName}</h3>
            </div>
            {/* Display the category */}
            <p className="text-xs text-muted-foreground">{props.category}</p>
          </div>
          {isOwnerProject && (
            <Badge
              variant="outline"
              className="text-xs py-1 px-2 bg-brand-accent/10 border-brand-accent/30 text-brand-accent flex items-center gap-1 flex-shrink-0"
            >
              <Building2 className="w-3 h-3" />
              <span>Org</span>
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[3rem]">{view.projectDescription || "\u00A0"}</p>

        {/* GitHub Stats */}
        <div className="flex items-center gap-4 pb-3 mb-3 border-b border-border/50 text-xs opacity-60">
          {isOwnerProject ? (
            // For owner projects, show followers
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3 text-brand-accent/70" />
              <span className="text-muted-foreground">{view.followers}</span>
              <span className="text-muted-foreground/70">followers</span>
            </div>
          ) : (
            // For repository projects, show stars and forks
            <>
              <div className="flex items-center gap-1.5">
                <Star className="w-3 h-3 text-brand-warning/70" />
                <span className="text-muted-foreground">{view.stars}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GitFork className="w-3 h-3 text-brand-accent/70" />
                <span className="text-muted-foreground">{view.forks}</span>
              </div>
            </>
          )}
          <button
            onClick={e => {
              e.stopPropagation();
              window.open(view.githubUrl, "_blank");
            }}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-brand-accent transition-all duration-200 hover:scale-110 cursor-pointer"
            title={isUrlProject ? "Visit Project" : "View on GitHub"}
          >
            <ExternalLink className="w-3 h-3" />
          </button>
          <div className="ml-auto">
            {/* Only display mainLanguage if it exists */}
            {view.mainLanguage && (
              <Badge variant="outline" className="text-xs py-0 opacity-80 border-border/50">
                {view.mainLanguage}
              </Badge>
            )}
          </div>
        </div>

        {/* Expert Maintainers - Only show section if there are maintainers */}
        {view.maintainersCount > 0 && (
          <div className="mt-auto">
            {canExpand ? (
              <Collapsible open={openMaintainers} onOpenChange={setOpenMaintainers}>
                <CollapsibleTrigger asChild>
                  <div
                    className="flex items-center gap-2 py-1 px-2 -mx-2 rounded-lg cursor-pointer group/maintainers hover:bg-brand-accent/5 transition-colors"
                    onClick={e => e.stopPropagation()}
                  >
                    <span className="text-sm text-muted-foreground group-hover/maintainers:text-brand-accent transition-colors">
                      {view.maintainersCount} Expert maintainer{view.maintainersCount !== 1 ? "s" : ""}
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                      {openMaintainers && (
                        <span className="text-xs text-brand-accent opacity-0 group-hover/maintainers:opacity-100 transition-opacity duration-200">
                          Show Less
                        </span>
                      )}
                      <div className="p-1 hover:bg-brand-accent/10 rounded transition-all duration-200">
                        <div className={`transition-transform duration-300 ${openMaintainers ? "rotate-180" : "rotate-0"}`}>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-colors duration-200 ${openMaintainers ? "text-brand-accent" : "text-muted-foreground"}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent onClick={e => e.stopPropagation()}>
                  <div className="space-y-2 mt-2">
                    {/* Iterate over the actual developer data */}
                    {view.visibleDevelopers.map(developer => (
                      <div key={developer.developerOwner.id.login} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-brand-accent/20 flex-shrink-0">
                          <img
                            src={developer.developerOwner.displayAvatarUrl || developer.developerOwner.avatarUrl || ""}
                            alt={developer.developerOwner.name || developer.developerOwner.id.login}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <p className="text-xs text-foreground truncate">{developer.developerOwner.id.login}</p>
                            {/*<BadgeCheck className="w-3 h-3 text-brand-success flex-shrink-0" />*/}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {developer.developerProjectItem.roles.length > 0
                              ? DeveloperRoleTypeCompanion.label(developer.developerProjectItem.roles[0])
                              : "Contributor"}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* View All Maintainers Link - Only show if there are more than 3 maintainers */}
                    {view.remainingMaintainersCount > 0 && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          props.onViewProject?.(view.projectId.uuid);
                        }}
                        className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accent-dark transition-colors mt-1 py-1"
                      >
                        <span>
                          + {view.remainingMaintainersCount} more maintainer{view.remainingMaintainersCount !== 1 ? "s" : ""}
                        </span>
                      </button>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <div className="py-1 px-2 -mx-2">
                <span className="text-sm text-muted-foreground">
                  {view.maintainersCount} Expert maintainer{view.maintainersCount !== 1 ? "s" : ""}
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
