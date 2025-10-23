import React from "react";

interface FloatingElementsProps {
  count?: number;
  className?: string;
}

export function FloatingElements({ count = 3, className = "" }: FloatingElementsProps) {
  const elements = Array.from({ length: count }, (_, i) => i);

  const getElementStyles = (index: number) => {
    const positions = ["top-1/4 left-1/4", "top-1/3 right-1/4", "bottom-1/4 left-1/3", "top-1/2 right-1/3", "bottom-1/3 right-1/4"];

    const sizes = ["w-16 h-16", "w-20 h-20", "w-12 h-12", "w-24 h-24"];
    const delays = ["0s", "2s", "4s", "1s", "3s"];

    return {
      position: positions[index % positions.length],
      size: sizes[index % sizes.length],
      delay: delays[index % delays.length],
    };
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {elements.map((_, index) => {
        const styles = getElementStyles(index);
        return (
          <div
            key={index}
            className={`
              absolute ${styles.position} ${styles.size}
              bg-gradient-to-br from-brand-primary/10 via-brand-accent/5 to-transparent
              rounded-full blur-xl opacity-40
              animate-pulse
            `}
            style={{
              animationDelay: styles.delay,
              animationDuration: "6s",
            }}
          />
        );
      })}
    </div>
  );
}
