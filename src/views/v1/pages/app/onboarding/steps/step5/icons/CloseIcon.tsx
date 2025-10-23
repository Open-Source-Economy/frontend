import React from "react";

interface CloseIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export function CloseIcon(props: CloseIconProps) {
  return (
    <>
      <svg className={props.className} width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4L4 20" stroke="currentColor" strokeLinecap="round" />
        <path d="M4 4L20 20" stroke="currentColor" strokeLinecap="round" />
      </svg>
    </>
  );
}
