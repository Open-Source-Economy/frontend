import React from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export function Tooltip(props: TooltipProps) {
  return (
    <>
      <div className="relative inline-block group">
        {props.children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
          {props.text}
        </div>
      </div>
    </>
  );
}
