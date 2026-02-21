import { ArrowRight, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

interface SectionHeaderProps {
  icon: IconType | LucideIcon;
  title: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function CardHeader(props: SectionHeaderProps) {
  const Icon = props.icon;

  return (
    <div className="flex md:flex-row flex-col gap-2.5 md:items-center justify-between w-full">
      <div className="flex items-center gap-2.5">
        <Icon className="w-6 h-6 text-theme-pink" />
        <h2 className="text-theme-pink font-michroma text-lg -mt-1">{props.title}</h2>
      </div>
      {props.action && (
        <button type="button" onClick={props.action.onClick} className="text-white flex items-center gap-1 hover:text-[#FF57D5] transition-colors hover:underline">
          {props.action.label} <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
