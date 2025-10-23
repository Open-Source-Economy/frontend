import React from "react";
import { ExpertMaintainersHeroSection } from "src/views/pages/home/sections/hero/expert/ExpertMaintainersHeroSection";
import { PhotoHeroSection } from "src/views/pages/home/sections/hero/photo/PhotoHeroSection";

export interface HeroAction {
  text: string;
  variant: "default" | "secondary" | "outline";
  onClick?: () => void;
  href?: string;
  external?: boolean;
  icon?: boolean;
}

export interface TrustIndicator {
  icon: React.ElementType;
  text: string;
}

interface HeroProps {
  badge?: string;
  headline: string;
  description: string;
  actions?: HeroAction[];
  trustIndicators?: TrustIndicator[];
  layout: "photo" | "expert";
}

export function HeroSection(props: HeroProps) {
  // Enterprise layout
  if (props.layout === "expert") {
    return <ExpertMaintainersHeroSection {...props} />;
  }

  if (props.layout === "photo") {
    return (
      <PhotoHeroSection
        {...props}
        imageSrc={
          "https://images.unsplash.com/photo-1559223607-b0f2c487d937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXJzJTIwdGFsa2luZyUyMGRpc2N1c3Npb258ZW58MXx8fHwxNzYwNzc1NDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        }
        imageAlt={"Two developers in discussion about open source projects"}
      />
    );
  }

  return <div></div>;
}
