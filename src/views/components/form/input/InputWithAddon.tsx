import React from "react";

interface InputWithAddonProps {
  children: React.ReactNode;
  addon: React.ReactNode;
  position?: "left" | "right";
}

export function InputWithAddon(props: InputWithAddonProps) {
  const { children, addon, position = "right" } = props;
  return (
    <div className="flex items-center gap-2">
      <div className={`flex items-center ${position === "left" ? "pl-2 pr-0" : "pr-2 pl-0"} h-10 rounded-md bg-[#202F45]` }>
        {position === "left" && (
          <div className="flex px-2 items-center gap-2 self-stretch rounded-md border border-[#202F45] bg-[#0E1F35]">{addon}</div>
        )}
        {children}
        {position === "right" && (
          <div className="flex px-2 items-center gap-2 self-stretch rounded-md border border-[#202F45] bg-[#0E1F35]">{addon}</div>
        )}
      </div>
    </div>
  );
}


