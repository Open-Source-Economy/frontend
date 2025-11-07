import React from "react";
import { LucideIcon } from "lucide-react";

interface StatisticCardProps {
  icon: LucideIcon;
  iconColor: string;
  value: number | string;
  label: string;
}

export function StatisticCard({ icon: Icon, iconColor, value, label }: StatisticCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex items-center gap-3">
        <Icon className={`w-8 h-8 ${iconColor}`} />
        <div>
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-sm text-gray-400">{label}</div>
        </div>
      </div>
    </div>
  );
}
