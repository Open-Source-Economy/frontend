import React from "react";

interface CheckIconProps {
  className?: string;
}

export function CheckIcon(props: CheckIconProps) {
  return (
    <>
      <svg
        className={props.className}
        width="12"
        height="9"
        viewBox="0 0 12 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 4.5L4.5 8L11 1.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}
