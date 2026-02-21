import React from "react";
import { SectionSubtitle } from "./SectionSubtitle";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  titleClassName?: string;
}

export function SectionHeader({ title, subtitle, titleClassName = "text-brand-accent" }: SectionHeaderProps) {
  return (
    <div>
      <h4 className={`mb-0.5 ${titleClassName}`}>{title}</h4>
      <SectionSubtitle
        text={subtitle || ""}
        tooltip={
          subtitle?.includes("rolls over")
            ? {
              content: "Credits roll over monthly and expire after 6 months.",
              description: "Expired credits become donations to the project and ecosystem.",
              link: {
                text: "Learn more about credits →",
                href: "#",
              },
            }
            : subtitle?.includes("Credits vary by tier")
              ? {
                content: "Service credits can be used to access maintainer support, priority bug fixes, feature requests, and consultation hours.",
                description: "Each tier provides different credit amounts to match your team's needs.",
                link: {
                  text: "Learn more about service credits →",
                  href: "#",
                },
              }
              : undefined
        }
      />
    </div>
  );
}
