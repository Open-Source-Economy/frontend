import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "src/views/components/ui/avatar";
import { AuthenticatedUser } from "@open-source-economy/api-types";
import { AuthenticatedUserCompanion } from "src/ultils/companions";

interface UserAvatarProps {
  user: AuthenticatedUser;
  className?: string;
}

export function UserAvatar({ user, className }: UserAvatarProps) {
  const avatarSrc = AuthenticatedUserCompanion.getAvatar(user);
  // We removed initials logic as per user request to remove redundancy/simplify
  // But UserAvatar usually has a fallback.
  // The user said: 'I would like to remove the initials, but then I see that there is too much redundancy in the code'
  // And pointed to logic using initials.
  // However, in the companion update (Step 183), the user REMOVED getInitials and added getName.
  // So I should not use initials.
  // I will just use the AvatarImage. If no src, AvatarFallback might be empty or generic.
  // The user's code snippet in Header had:
  // {avatarSrc ? ( ... ) : ( <span className="text-sm"></span> )}
  // So maybe just render empty if no avatar?
  // But using shadcn Avatar:
  // <Avatar> <AvatarImage /> <AvatarFallback /> </Avatar>
  // If I put empty string in fallback, it renders empty circle.

  return (
    <Avatar className={className}>
      <AvatarImage src={avatarSrc} alt="User Avatar" className="object-cover" />
      <AvatarFallback className="bg-brand-accent text-white">{/* Intentionally empty as per request to remove initials */}</AvatarFallback>
    </Avatar>
  );
}
