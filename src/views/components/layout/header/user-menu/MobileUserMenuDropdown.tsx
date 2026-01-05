import React from "react";
import { UserMenuNavigation } from "src/types/navigation";
import { Dialog, DialogContent } from "../../../ui/dialog";
import { MobileUserMenu } from "./MobileUserMenu";
import { AuthenticatedUser } from "@open-source-economy/api-types";

interface MobileUserMenuDropdownProps {
  authenticatedUser: AuthenticatedUser;
  isOpen: boolean;
  onClose: () => void;
  menuConfig: UserMenuNavigation;
}

export function MobileUserMenuDropdown({ authenticatedUser, isOpen, onClose, menuConfig }: MobileUserMenuDropdownProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-background text-foreground border-border p-0 gap-0 flex flex-col h-[100dvh] sm:h-auto sm:rounded-xl">
        <div className="flex flex-col h-full bg-background">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <span className="font-semibold">Menu</span>
            {/* Close button is handled by DialogPrimitive.Close usually, but if we need custom one: */}
            {/* <button onClick={onClose}><X className="h-4 w-4" /></button> */}
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <MobileUserMenu authenticatedUser={authenticatedUser} menuConfig={menuConfig} onItemClick={onClose} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
