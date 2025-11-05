import React from "react";

import { DecorativeBackground } from "./decorative/decorative-background";
import { FloatingElements } from "./floating-elements";
import { ImageWithFallback } from "src/views/components/ImageWithFallback";

interface EnhancedImageContainerProps {
  src: string;
  alt: string;
  className?: string;
  showDecorations?: boolean;
  variant?: "standard" | "premium" | "enterprise";
}

export function EnhancedImageContainer({ src, alt, className = "", showDecorations = true, variant = "standard" }: EnhancedImageContainerProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "premium":
        return {
          container: "relative group perspective-1000",
          background: "gradient",
          imageWrapper: "relative z-10 transform-gpu transition-all duration-700 group-hover:scale-105 group-hover:rotate-y-2",
          shadow: "shadow-2xl shadow-brand-primary/20 group-hover:shadow-3xl group-hover:shadow-brand-primary/30",
        };
      case "enterprise":
        return {
          container: "relative group",
          background: "primary",
          imageWrapper: "relative z-10 transform-gpu transition-all duration-500 group-hover:scale-105",
          shadow: "shadow-2xl shadow-brand-primary/25 group-hover:shadow-brand-primary/40",
        };
      default:
        return {
          container: "relative group",
          background: "accent",
          imageWrapper: "relative z-10 transition-all duration-500 group-hover:scale-105",
          shadow: "shadow-xl shadow-brand-accent/20 group-hover:shadow-brand-accent/30",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`${styles.container} ${className}`}>
      {/* Floating decorative elements */}
      {showDecorations && variant === "premium" && <FloatingElements count={4} />}

      {/* Main background glow */}
      {showDecorations && (
        <DecorativeBackground variant={styles.background as any} intensity="medium" animated={true} className="opacity-60 group-hover:opacity-80" />
      )}

      {/* Secondary glow effect */}
      {showDecorations && variant !== "standard" && (
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/20 via-transparent to-brand-primary/20 rounded-2xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
      )}

      {/* Image container */}
      <div className={styles.imageWrapper}>
        {/* Inner glow for premium variant */}
        {variant === "premium" && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        <ImageWithFallback src={src} alt={alt} className={`w-full h-auto rounded-xl ${styles.shadow} transition-all duration-500`} />

        {/* Overlay effects */}
        {variant === "enterprise" && (
          <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/5 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </div>

      {/* Corner accent */}
      {showDecorations && variant !== "standard" && <div className="absolute top-4 right-4 w-3 h-3 bg-brand-primary rounded-full opacity-60 animate-pulse" />}
    </div>
  );
}
