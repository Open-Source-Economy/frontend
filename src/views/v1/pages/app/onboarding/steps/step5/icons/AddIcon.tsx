import React from "react";

interface AddIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function AddIcon(props: AddIconProps) {
  return (
    <>
      <svg className={props.className} width={props.width || 20} height={props.height || 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );
}
