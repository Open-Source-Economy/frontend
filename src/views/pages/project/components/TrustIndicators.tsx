import React from "react";
import type { LucideIcon } from "lucide-react";

type TrustIndicatorVariant = "card" | "badge";
type TrustIndicatorTone = "accent" | "success" | "warning";

export interface TrustIndicatorItem {
  icon: LucideIcon;
  label: string;
  tone?: TrustIndicatorTone;
}

interface TrustIndicatorGroupProps {
  items: TrustIndicatorItem[];
  variant: TrustIndicatorVariant;
  className?: string;
}

const CARD_CONTAINER_CLASS =
  "flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-brand-neutral-100/60 to-brand-neutral-100/30 rounded-lg border border-brand-neutral-300/60 shadow-sm";
const CARD_ICON_WRAPPER_CLASS = "flex items-center justify-center w-6 h-6 rounded-md bg-brand-accent/10 border border-brand-accent/20";

const BADGE_BASE_CLASS = "flex items-center gap-2 px-3 py-1.5 rounded-md border";

const BADGE_TONE_STYLES: Record<TrustIndicatorTone, { container: string; icon: string }> = {
  accent: {
    container: "bg-brand-accent/10 border-brand-accent/30",
    icon: "text-brand-accent",
  },
  success: {
    container: "bg-brand-success/10 border-brand-success/30",
    icon: "text-brand-success",
  },
  warning: {
    container: "bg-brand-warning/10 border-brand-warning/30",
    icon: "text-brand-warning",
  },
};

export function TrustIndicatorGroup({ items, variant, className }: TrustIndicatorGroupProps) {
  if (items.length === 0) {
    return null;
  }

  const wrapperClassName = ["flex flex-wrap items-center justify-center gap-3", className].filter(Boolean).join(" ");

  return (
    <div className={wrapperClassName}>
      {items.map(item => (
        <TrustIndicatorPill key={item.label} item={item} variant={variant} />
      ))}
    </div>
  );
}

interface TrustIndicatorPillProps {
  item: TrustIndicatorItem;
  variant: TrustIndicatorVariant;
}

function TrustIndicatorPill({ item, variant }: TrustIndicatorPillProps) {
  const Icon = item.icon;

  if (variant === "card") {
    return (
      <div className={CARD_CONTAINER_CLASS}>
        <div className={CARD_ICON_WRAPPER_CLASS}>
          <Icon className="w-3.5 h-3.5 text-brand-accent" />
        </div>
        <span className="text-brand-neutral-800 text-sm">{item.label}</span>
      </div>
    );
  }

  const tone = BADGE_TONE_STYLES[item.tone ?? "accent"];

  return (
    <div className={[BADGE_BASE_CLASS, tone.container].join(" ")}>
      <Icon className={["w-4 h-4", tone.icon].join(" ")} />
      <span className="text-brand-neutral-700 text-sm">{item.label}</span>
    </div>
  );
}
