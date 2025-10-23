import React from "react";
import { GitBranch, Star, Users } from "lucide-react";
import { Badge } from "src/views/components/ui/badge";
import { Card, CardContent } from "src/views/components/ui/card";
import { Avatar } from "src/views/components/ui/avatar";

interface ExpertMaintainersProps {}

export function ExpertMaintainers(props: ExpertMaintainersProps) {
  // Featured open source experts and their projects
  const experts = [
    {
      name: "Dan Abramov",
      role: "React Core Team",
      projects: ["React", "Redux", "Create React App"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      stats: { stars: "195k", commits: "8.2k", followers: "280k" },
      specialties: ["State Management", "Developer Tools", "Performance"],
    },
    {
      name: "Sindre Sorhus",
      role: "Node.js Maintainer",
      projects: ["AVA", "XO", "1000+ npm packages"],
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      stats: { stars: "1.2M", commits: "25k", followers: "65k" },
      specialties: ["CLI Tools", "Node.js", "TypeScript"],
    },
    {
      name: "Evan You",
      role: "Vue.js Creator",
      projects: ["Vue.js", "Vite", "VueUse"],
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150",
      stats: { stars: "205k", commits: "12k", followers: "95k" },
      specialties: ["Frontend", "Build Tools", "Performance"],
    },
    {
      name: "Tobias Koppers",
      role: "Webpack Creator",
      projects: ["Webpack"],
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
      stats: { stars: "64k", commits: "5.8k", followers: "12k" },
      specialties: ["Build Systems", "Bundling", "Architecture"],
    },
  ];

  return (
    <div className={`relative`}>
      <div className="space-y-6">
        {/* Direct Access Header */}
        <div className="text-center">
          <Badge variant="outline" className="mb-4 text-brand-accent border-brand-accent/40 bg-brand-accent/15 font-semibold px-4 py-2 text-base">
            <Users className="w-4 h-4 mr-2" />
            Direct <span className="text-foreground">Maintainer</span> Access
          </Badge>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-highlight animate-pulse" />
                <span>500+ maintainers available</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-primary" />
                <span>2,000+ projects supported</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expert Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {experts.map((expert, index) => (
            <Card
              key={expert.name}
              className={`
                group relative border border-border/50 hover:border-brand-primary/30 
                transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
                bg-card/50 hover:bg-card
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 w-full">
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-300"
                      />
                    </Avatar>
                  </div>

                  {/* Expert Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base font-semibold text-foreground truncate">{expert.name}</h4>
                    </div>

                    <p className="text-sm text-brand-primary font-medium mb-2 line-clamp-1">Creator & {expert.role}</p>

                    {/* Projects */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {expert.projects.slice(0, 2).map(project => (
                        <Badge
                          key={project}
                          variant="outline"
                          className="text-sm px-2.5 py-1 bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20"
                        >
                          {project}
                        </Badge>
                      ))}
                      {expert.projects.length > 2 && (
                        <Badge variant="outline" className="text-sm px-2.5 py-1 bg-muted-foreground/10 text-muted-foreground border-muted-foreground/20">
                          +{expert.projects.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground opacity-40">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{expert.stats.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        <span>{expert.stats.commits}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Connect Button */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                </div>

                {/* Connection Line Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center pt-6 border-t border-border/30">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <span className="text-brand-primary font-medium">One contract.</span> Direct access to the experts who built your stack.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-foreground">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                <span>Enterprise Trust</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
                <span>Direct Connection</span>
              </div>
              <div className="w-px h-4 bg-border" />
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
                <span>Sustainable Growth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
