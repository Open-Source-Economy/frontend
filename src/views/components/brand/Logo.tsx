import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "white" | "dark" | "secondary" | "accent";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const iconVariantClasses = {
  primary: "text-logo-icon-primary",
  white: "text-white",
  dark: "text-brand-primary",
  secondary: "text-brand-secondary",
  accent: "text-brand-accent",
};

const textVariantClasses = {
  primary: "text-logo-text-primary",
  white: "text-white",
  dark: "text-brand-primary",
  secondary: "text-brand-secondary",
  accent: "text-brand-accent",
};

export function Logo(props: LogoProps) {
  const iconColorClass = iconVariantClasses[props.variant ?? "primary"];
  const textColorClass = textVariantClasses[props.variant ?? "primary"];
  const sizeClass = sizeClasses[props.size ?? "md"];

  return (
    <div className={`flex items-center gap-3 ${props.className ?? ""}`}>
      <div className={`${sizeClass} flex-shrink-0 ${iconColorClass}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Interconnected nodes representing open source economy */}
          <circle cx="20" cy="30" r="8" fill="currentColor" className="opacity-80" />
          <circle cx="50" cy="20" r="10" fill="currentColor" />
          <circle cx="80" cy="35" r="8" fill="currentColor" className="opacity-80" />
          <circle cx="25" cy="65" r="9" fill="currentColor" className="opacity-90" />
          <circle cx="70" cy="70" r="8" fill="currentColor" className="opacity-80" />
          <circle cx="50" cy="80" r="7" fill="currentColor" className="opacity-70" />

          {/* Connecting lines representing collaboration */}
          <line x1="28" y1="30" x2="42" y2="22" stroke="currentColor" strokeWidth="2" className="opacity-60" />
          <line x1="58" y1="20" x2="72" y2="35" stroke="currentColor" strokeWidth="2" className="opacity-60" />
          <line x1="20" y1="38" x2="25" y2="56" stroke="currentColor" strokeWidth="2" className="opacity-60" />
          <line x1="33" y1="65" x2="62" y2="70" stroke="currentColor" strokeWidth="2" className="opacity-60" />
          <line x1="70" y1="62" x2="57" y2="80" stroke="currentColor" strokeWidth="2" className="opacity-60" />
          <line x1="50" y1="30" x2="50" y2="73" stroke="currentColor" strokeWidth="2" className="opacity-40" />
        </svg>
      </div>
      {props.showText !== false && (
        <div className="flex flex-col">
          <span className={`leading-tight ${textColorClass}`}>Open Source</span>
          <span className={`leading-tight ${textColorClass} opacity-80`}>Economy</span>
        </div>
      )}
    </div>
  );
}
