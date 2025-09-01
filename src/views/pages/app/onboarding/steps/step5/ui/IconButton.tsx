import React from "react";

interface IconButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "danger" | "rounded";
}

export function IconButton(props: IconButtonProps) {
  const variants = {
    default: "text-white hover:text-[#FF7E4B]",
    danger: "text-white hover:text-red-400"
  };

  const variant = props.variant || "default";

  return (
    <>
      <button
        onClick={props.onClick}
        className={`flex w-6 h-6 flex-col justify-center items-center gap-2.5 transition-colors ${variants[variant]} ${props.className || ""}`}
      >
        {props.children}
      </button>
    </>
  );
}
