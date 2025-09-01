import React from "react";

interface InputWithAddonProps {
  children: React.ReactNode;
  addon: React.ReactNode;
  position?: "left" | "right";
}

export function InputWithAddon(props: InputWithAddonProps) {
  const { children, addon, position = "right" } = props;
  return (
    <div className="flex items-center gap-2.5">
      <div className={`flex ${position === "left" ? "pl-3 pr-0" : "pr-3 pl-0"} py-3 items-center gap-3 rounded-md bg-[#202F45]`}>
        {position === "left" && (
          <div className="flex px-3 py-3 items-center gap-3 self-stretch rounded-md border border-[#202F45] bg-[#0E1F35]">{addon}</div>
        )}
        {children}
        {position === "right" && (
          <div className="flex px-3 py-3 items-center gap-3 self-stretch rounded-md border border-[#202F45] bg-[#0E1F35]">{addon}</div>
        )}
      </div>
    </div>
  );
}


