import React from "react";
import { Code2, GitFork, Package, Star, Users } from "lucide-react";
import { ProjectStats } from "src/ultils/companions/ProjectItemWithDetails.companion";

interface PlatformStatsProps {
  projectStats: ProjectStats;
  variant?: "default" | "showcase";
  className?: string;
}

export function PlatformStats(props: PlatformStatsProps) {
  const variant = props.variant ?? "default";

  const defaultStats = [
    {
      icon: Star,
      label: "Total Stars",
      value: props.projectStats.totalStars,
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10",
    },
    {
      icon: Users,
      label: "Maintainers",
      value: props.projectStats.totalMaintainers.toString(),
      color: "text-brand-accent",
      bgColor: "bg-brand-accent/10",
    },
    {
      icon: Package,
      label: "Projects",
      value: props.projectStats.totalProjects.toString(),
      color: "text-brand-primary",
      bgColor: "bg-brand-primary/10",
    },
    {
      icon: GitFork,
      label: "Total Forks",
      value: props.projectStats.totalForks,
      color: "text-brand-highlight",
      bgColor: "bg-brand-highlight/10",
    },
  ];

  const showcaseStats = [
    {
      icon: Code2,
      label: "Projects",
      value: `${props.projectStats.totalProjects}+`,
      iconBg: "bg-gradient-to-br from-brand-primary/20 to-brand-accent/20",
      iconBorder: "border-brand-primary/30 group-hover:border-brand-accent/50",
      iconColor: "text-brand-primary group-hover:text-brand-accent",
      valueGradient: "from-brand-primary via-brand-primary-light to-brand-accent group-hover:from-brand-accent group-hover:to-brand-primary",
    },
    {
      icon: Star,
      label: "Combined Stars",
      value: `${props.projectStats.totalStars}+`,
      iconBg: "bg-gradient-to-br from-brand-accent/20 to-brand-highlight/20",
      iconBorder: "border-brand-accent/30 group-hover:border-brand-highlight/50",
      iconColor: "text-brand-accent group-hover:text-brand-highlight",
      valueGradient: "from-brand-accent via-brand-accent-light to-brand-highlight group-hover:from-brand-highlight group-hover:to-brand-accent",
    },
    {
      icon: Users,
      label: "Maintainers",
      value: `${props.projectStats.totalMaintainers}`,
      iconBg: "bg-gradient-to-br from-brand-highlight/20 to-brand-primary/20",
      iconBorder: "border-brand-highlight/30 group-hover:border-brand-primary/50",
      iconColor: "text-brand-highlight group-hover:text-brand-primary",
      valueGradient: "from-brand-highlight via-brand-highlight-light to-brand-primary group-hover:from-brand-primary group-hover:to-brand-highlight",
    },
  ];

  if (variant === "showcase") {
    return (
      <div className={`flex items-center justify-center gap-8 lg:gap-12 py-6 ${props.className ?? ""}`}>
        {showcaseStats.map((stat, index) => (
          <div key={index} className="text-center group">
            <div className="flex items-center justify-center mb-3">
              <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center border ${stat.iconBorder} transition-all duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor} transition-colors duration-300`} />
              </div>
            </div>
            <div
              className={`text-2xl lg:text-3xl mb-1 bg-gradient-to-r ${stat.valueGradient} bg-clip-text text-transparent transition-all duration-300 font-semibold`}
            >
              {stat.value}
            </div>
            <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center justify-center gap-8 md:gap-12 ${props.className ?? ""}`}>
      {defaultStats.map((stat, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div>
            <div className="text-foreground mb-0.5">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
