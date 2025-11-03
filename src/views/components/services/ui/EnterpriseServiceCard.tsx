import React from "react";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Button } from "../../ui/forms/button";
import { paths } from "src/paths";

interface EnterpriseServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  buttonText: string;
  colorScheme: "primary" | "success" | "accent";
  showButton?: boolean;
  className?: string;
}

/**
 * EnterpriseServiceCard - Card for enterprise-grade services
 * Used in services page for NDA, SLA, and ecosystem programs
 */
export const EnterpriseServiceCard: React.FC<EnterpriseServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  colorScheme,
  showButton = true,
  className = "",
}) => {
  const colorClasses = {
    primary: {
      iconBg: "from-brand-primary to-brand-primary-dark",
      title: "text-brand-primary-dark",
      buttonVariant: "outline" as const,
      borderHover: "hover:border-brand-primary/30",
    },
    success: {
      iconBg: "from-brand-success to-brand-success-dark",
      title: "text-brand-success-dark",
      buttonVariant: "outline" as const,
      borderHover: "hover:border-brand-success/30",
    },
    accent: {
      iconBg: "from-brand-accent to-brand-accent-dark",
      title: "text-brand-accent-dark",
      buttonVariant: "outline" as const,
      borderHover: "hover:border-brand-accent/30",
    },
  };

  const colors = colorClasses[colorScheme];

  return (
    <div
      className={`group relative bg-gradient-to-r from-brand-neutral-50/50 to-transparent rounded-xl border border-brand-neutral-200/50 ${colors.borderHover} overflow-hidden transition-all duration-300 hover:shadow-md h-full ${className}`}
    >
      {/* Content */}
      <div className="relative p-8 h-full flex flex-col">
        {/* Icon */}
        <div
          className={`w-16 h-16 bg-gradient-to-br ${colors.iconBg} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h3 className={`text-lg ${colors.title} mb-4 text-center font-semibold`}>{title}</h3>

        {/* Description */}
        <div
          className={`text-sm text-muted-foreground leading-relaxed ${showButton ? "mb-6" : ""} flex-grow text-center min-h-[4rem] flex items-end justify-center`}
        >
          <div className="block">{description}</div>
        </div>

        {/* Button - Only shown in local environment */}
        {showButton && (
          <Link to={paths.CONTACT} className="w-full mt-auto">
            <Button size="sm" variant={colors.buttonVariant} className="w-full">
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
