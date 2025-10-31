import React from "react";
import { Loader2 } from "lucide-react";

export interface LoadingStateProps {
  /** Loading message to display */
  message?: string;
  /** Variant of the loading state */
  variant?: "spinner" | "skeleton" | "overlay" | "inline" | "dots" | "pulse";
  /** Size of the loading indicator */
  size?: "sm" | "md" | "lg" | "xl";
  /** Additional CSS classes */
  className?: string;
  /** Show as full page overlay */
  fullPage?: boolean;
  /** Custom spinner icon */
  spinnerIcon?: React.ReactNode;
  /** Show backdrop blur */
  showBackdrop?: boolean;
  /** Skeleton variant configuration */
  skeletonConfig?: {
    lines?: number;
    showAvatar?: boolean;
    showImage?: boolean;
  };
}

/**
 * LoadingState - Generic loading indicator for use throughout the application
 *
 * Features:
 * - Multiple variants for different contexts
 * - Consistent styling with premium dark theme
 * - Flexible sizing options
 * - Optional messages and backdrops
 * - Full page overlay support
 *
 * @example
 * ```tsx
 * <LoadingState
 *   variant="spinner"
 *   message="Loading data..."
 *   size="md"
 * />
 * ```
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  variant = "spinner",
  size = "md",
  className = "",
  fullPage = false,
  spinnerIcon,
  showBackdrop = false,
  skeletonConfig = { lines: 3, showAvatar: false, showImage: false },
}) => {
  // Size configurations
  const sizeClasses = {
    spinner: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
      xl: "w-12 h-12",
    },
    text: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    container: {
      sm: "gap-2 p-3",
      md: "gap-3 p-4",
      lg: "gap-4 p-6",
      xl: "gap-5 p-8",
    },
  };

  // Spinner Variant
  const SpinnerContent = () => (
    <div className={`flex flex-col items-center justify-center ${sizeClasses.container[size]} ${className}`}>
      <div className="relative">{spinnerIcon || <Loader2 className={`${sizeClasses.spinner[size]} text-brand-accent animate-spin`} />}</div>
      {message && <p className={`${sizeClasses.text[size]} text-brand-neutral-600 text-center`}>{message}</p>}
    </div>
  );

  // Dots Variant
  const DotsContent = () => (
    <div className={`flex items-center justify-center ${sizeClasses.container[size]} ${className}`}>
      <div className="flex items-center gap-2">
        <div
          className={`${size === "sm" ? "w-2 h-2" : size === "lg" ? "w-4 h-4" : "w-3 h-3"} rounded-full bg-brand-accent animate-bounce`}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={`${size === "sm" ? "w-2 h-2" : size === "lg" ? "w-4 h-4" : "w-3 h-3"} rounded-full bg-brand-accent animate-bounce`}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={`${size === "sm" ? "w-2 h-2" : size === "lg" ? "w-4 h-4" : "w-3 h-3"} rounded-full bg-brand-accent animate-bounce`}
          style={{ animationDelay: "300ms" }}
        />
      </div>
      {message && <p className={`ml-3 ${sizeClasses.text[size]} text-brand-neutral-600`}>{message}</p>}
    </div>
  );

  // Pulse Variant
  const PulseContent = () => (
    <div className={`flex flex-col items-center justify-center ${sizeClasses.container[size]} ${className}`}>
      <div className={`${sizeClasses.spinner[size]} rounded-full bg-brand-accent/20 animate-pulse`} />
      {message && <p className={`mt-3 ${sizeClasses.text[size]} text-brand-neutral-600 text-center`}>{message}</p>}
    </div>
  );

  // Skeleton Variant
  const SkeletonContent = () => {
    const lineHeights = {
      sm: "h-3",
      md: "h-4",
      lg: "h-5",
      xl: "h-6",
    };

    const avatarSizes = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
      xl: "w-16 h-16",
    };

    const imageSizes = {
      sm: "h-24",
      md: "h-32",
      lg: "h-40",
      xl: "h-48",
    };

    return (
      <div className={`space-y-3 ${className}`}>
        {/* Optional Avatar */}
        {skeletonConfig.showAvatar && (
          <div className="flex items-center gap-3">
            <div className={`${avatarSizes[size]} rounded-full bg-brand-neutral-300/30 animate-pulse`} />
            <div className="flex-1 space-y-2">
              <div className={`w-24 ${lineHeights[size]} bg-brand-neutral-300/30 rounded animate-pulse`} />
              <div className={`w-32 ${lineHeights[size]} bg-brand-neutral-300/20 rounded animate-pulse`} />
            </div>
          </div>
        )}

        {/* Optional Image */}
        {skeletonConfig.showImage && <div className={`w-full ${imageSizes[size]} bg-brand-neutral-300/30 rounded-lg animate-pulse`} />}

        {/* Text Lines */}
        {Array.from({ length: skeletonConfig.lines || 3 }).map((_, idx) => (
          <div
            key={idx}
            className={`${lineHeights[size]} bg-brand-neutral-300/30 rounded animate-pulse`}
            style={{
              width: idx === (skeletonConfig.lines || 3) - 1 ? "60%" : "100%",
              animationDelay: `${idx * 100}ms`,
            }}
          />
        ))}
      </div>
    );
  };

  // Inline Variant - Compact for buttons, etc.
  const InlineContent = () => (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Loader2 className={`${sizeClasses.spinner[size]} text-brand-accent animate-spin`} />
      {message && <span className={`${sizeClasses.text[size]} text-brand-neutral-600`}>{message}</span>}
    </span>
  );

  // Render appropriate variant
  const renderContent = () => {
    switch (variant) {
      case "dots":
        return <DotsContent />;
      case "pulse":
        return <PulseContent />;
      case "skeleton":
        return <SkeletonContent />;
      case "inline":
        return <InlineContent />;
      case "overlay":
      case "spinner":
      default:
        return <SpinnerContent />;
    }
  };

  // Full page overlay
  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div className={`absolute inset-0 bg-brand-secondary/90 ${showBackdrop ? "backdrop-blur-sm" : ""}`} />

        {/* Content */}
        <div className="relative z-10 bg-brand-card-blue border border-brand-neutral-300/40 rounded-2xl shadow-2xl">{renderContent()}</div>
      </div>
    );
  }

  // Overlay variant (non-full-page)
  if (variant === "overlay") {
    return (
      <div className="relative">
        <div className={`absolute inset-0 z-10 flex items-center justify-center bg-brand-secondary/80 ${showBackdrop ? "backdrop-blur-sm" : ""} rounded-lg`}>
          <div className="bg-brand-card-blue border border-brand-neutral-300/40 rounded-xl shadow-lg">
            <SpinnerContent />
          </div>
        </div>
      </div>
    );
  }

  // Standard rendering
  return renderContent();
};

/**
 * LoadingCard - Loading state styled as a card
 * Perfect for loading content in card-based layouts
 */
export const LoadingCard: React.FC<{
  lines?: number;
  showAvatar?: boolean;
  showImage?: boolean;
  className?: string;
}> = ({ lines = 3, showAvatar = false, showImage = false, className = "" }) => (
  <div className={`bg-brand-card-blue border border-brand-neutral-300/30 rounded-xl p-6 ${className}`}>
    <LoadingState variant="skeleton" size="md" skeletonConfig={{ lines, showAvatar, showImage }} />
  </div>
);

/**
 * LoadingButton - Loading state for button contexts
 * Use inside buttons to show loading state
 */
export const LoadingButton: React.FC<{
  message?: string;
  size?: "sm" | "md" | "lg";
}> = ({ message, size = "md" }) => <LoadingState variant="inline" size={size} message={message} />;

/**
 * LoadingTable - Loading state for table contexts
 * Shows skeleton rows
 */
export const LoadingTable: React.FC<{
  rows?: number;
  columns?: number;
  className?: string;
}> = ({ rows = 5, columns = 4, className = "" }) => {
  const heights = ["h-4", "h-4", "h-4"];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b border-brand-neutral-300/30">
        {Array.from({ length: columns }).map((_, idx) => (
          <div key={`header-${idx}`} className="flex-1 h-4 bg-brand-neutral-300/40 rounded animate-pulse" style={{ animationDelay: `${idx * 50}ms` }} />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={`row-${rowIdx}`} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div
              key={`cell-${rowIdx}-${colIdx}`}
              className={`flex-1 ${heights[rowIdx % 3]} bg-brand-neutral-300/30 rounded animate-pulse`}
              style={{ animationDelay: `${(rowIdx * columns + colIdx) * 30}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * LoadingSection - Loading state for full sections
 * Shows a centered spinner with optional message
 */
export const LoadingSection: React.FC<{
  message?: string;
  minHeight?: string;
  className?: string;
}> = ({ message = "Loading content...", minHeight = "min-h-[400px]", className = "" }) => (
  <div className={`${minHeight} flex items-center justify-center ${className}`}>
    <LoadingState variant="spinner" size="lg" message={message} />
  </div>
);
