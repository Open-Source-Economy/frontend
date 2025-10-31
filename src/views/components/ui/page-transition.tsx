import React from 'react';
import { Loader2 } from 'lucide-react';

interface PageTransitionProps {
  isLoading: boolean;
  message?: string;
}

/**
 * PageTransition - Smooth loading transition between page navigations
 *
 * Features:
 * - Elegant fade animation using Tailwind CSS
 * - Brand-colored spinner
 * - Non-blocking overlay
 * - Smooth entrance and exit
 * - Optional loading message
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ isLoading, message }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex flex-col items-center gap-3 animate-in zoom-in-95 duration-200">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-accent to-brand-highlight blur-xl opacity-40 animate-pulse" />

          {/* Spinner */}
          <Loader2 className="relative w-12 h-12 text-brand-accent animate-spin" />
        </div>

        {/* Optional message */}
        {message && (
          <p className="text-brand-neutral-600 text-base font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

