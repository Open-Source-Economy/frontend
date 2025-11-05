import React from "react";

interface DecorativeBackgroundProps {
  variant: "primary" | "accent" | "success" | "gradient";
  intensity?: "subtle" | "medium" | "strong";
  animated?: boolean;
  className?: string;
}

export function DecorativeBackground({ variant, intensity = "medium", animated = true, className = "" }: DecorativeBackgroundProps) {
  const getVariantStyles = () => {
    const baseStyles = "absolute inset-0 rounded-2xl";
    const intensityMap = {
      subtle: "5",
      medium: "10",
      strong: "20",
    };

    const opacity = intensityMap[intensity];

    switch (variant) {
      case "primary":
        return `${baseStyles} bg-gradient-to-br from-brand-primary/${opacity} via-brand-primary-light/5 to-transparent`;
      case "accent":
        return `${baseStyles} bg-gradient-to-br from-brand-accent/${opacity} via-brand-accent-light/5 to-transparent`;
      case "success":
        return `${baseStyles} bg-gradient-to-br from-brand-primary/${opacity} via-brand-primary-light/5 to-transparent`;
      case "gradient":
        return `${baseStyles} bg-gradient-to-br from-brand-primary/${opacity} via-brand-accent/5 to-brand-primary/5`;
      default:
        return `${baseStyles} bg-gradient-to-br from-brand-primary/${opacity} to-transparent`;
    }
  };

  const animationClass = animated ? "transition-all duration-700 hover:scale-105" : "";
  const blurClass = intensity === "strong" ? "blur-2xl" : intensity === "medium" ? "blur-xl" : "blur-lg";

  return <div className={`${getVariantStyles()} ${blurClass} ${animationClass} ${className}`} />;
}
