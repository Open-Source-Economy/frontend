import React from "react";

interface DecorativeOrbProps {
  size?: "small" | "medium" | "large" | "extra-large";
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "primary" | "accent" | "success" | "gradient";
  intensity?: "subtle" | "medium" | "strong";
  animated?: boolean;
  className?: string;
}

export function DecorativeOrb({
  size = "medium",
  position = "top-right",
  variant = "primary",
  intensity = "medium",
  animated = true,
  className = "",
}: DecorativeOrbProps) {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-16 h-16";
      case "medium":
        return "w-24 h-24";
      case "large":
        return "w-32 h-32";
      case "extra-large":
        return "w-40 h-40";
      default:
        return "w-24 h-24";
    }
  };

  const getPositionClasses = () => {
    const basePosition = "absolute";
    switch (position) {
      case "top-left":
        return `${basePosition} -top-8 -left-8`;
      case "top-right":
        return `${basePosition} -top-8 -right-8`;
      case "bottom-left":
        return `${basePosition} -bottom-8 -left-8`;
      case "bottom-right":
        return `${basePosition} -bottom-8 -right-8`;
      default:
        return `${basePosition} -top-8 -right-8`;
    }
  };

  const getVariantClasses = () => {
    const intensityMap = {
      subtle: { primary: "10", secondary: "5" },
      medium: { primary: "20", secondary: "10" },
      strong: { primary: "30", secondary: "15" },
    };

    const opacities = intensityMap[intensity];

    switch (variant) {
      case "primary":
        return `bg-gradient-to-br from-brand-primary/${opacities.primary} via-brand-success/${opacities.secondary} to-transparent`;
      case "accent":
        return `bg-gradient-to-br from-brand-accent/${opacities.primary} to-transparent`;
      case "success":
        return `bg-gradient-to-br from-brand-success/${opacities.primary} to-transparent`;
      case "gradient":
        return `bg-gradient-to-br from-brand-primary/${opacities.secondary} via-brand-accent/${opacities.secondary} to-brand-success/${opacities.secondary}`;
      default:
        return `bg-gradient-to-br from-brand-primary/${opacities.primary} to-transparent`;
    }
  };

  const getBlurClass = () => {
    switch (size) {
      case "small":
        return "blur-lg";
      case "medium":
        return "blur-xl";
      case "large":
        return "blur-2xl";
      case "extra-large":
        return "blur-3xl";
      default:
        return "blur-xl";
    }
  };

  const animationClass = animated ? "animate-pulse" : "";
  const opacityClass = intensity === "strong" ? "opacity-60" : intensity === "medium" ? "opacity-50" : "opacity-40";

  return (
    <div
      className={`
        ${getSizeClasses()} 
        ${getPositionClasses()} 
        ${getVariantClasses()} 
        ${getBlurClass()} 
        ${animationClass} 
        ${opacityClass} 
        rounded-full 
        pointer-events-none
        ${className}
      `}
    />
  );
}
