import React from "react";
import { User, Heart } from "lucide-react";

export interface IndividualSupporterAvatarProps {
  name?: string;
  initials?: string;
  avatarUrl?: string;
  isAnonymous?: boolean;
  monthlyAmount?: number;
}

export function IndividualSupporterAvatar({ name, initials, avatarUrl, isAnonymous, monthlyAmount }: IndividualSupporterAvatarProps) {
  const displayName = isAnonymous ? "Anonymous Supporter" : name || "Supporter";

  return (
    <div className="group relative" title={displayName}>
      {/* Avatar Container */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-card-blue to-brand-card-blue-dark border-2 border-brand-neutral-300 overflow-hidden hover:border-brand-accent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-brand-accent/30 flex items-center justify-center">
          {avatarUrl ? (
            /* GitHub Avatar */
            <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
          ) : initials ? (
            /* Initial Avatar */
            <span className="text-brand-neutral-900 uppercase">{initials}</span>
          ) : (
            /* Anonymous Avatar */
            <User className="h-6 w-6 text-brand-neutral-500" />
          )}
        </div>

        {/* Heart badge for supporters */}
        <div
          className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-accent rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
          style={{
            boxShadow: "0 4px 12px -4px rgba(255, 127, 80, 0.6)",
          }}
        >
          <Heart className="h-2.5 w-2.5 text-white fill-white" />
        </div>
      </div>

      {/* Tooltip on hover */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-card-blue-dark border border-brand-neutral-300 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 shadow-xl">
        <p className="text-brand-neutral-900 text-sm">{displayName}</p>
        {monthlyAmount && <p className="text-brand-neutral-600 text-xs">${monthlyAmount}/month</p>}
        {/* Tooltip arrow */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-card-blue-dark border-r border-b border-brand-neutral-300 rotate-45"></div>
      </div>
    </div>
  );
}
