import React from "react";

interface AddCircleIconProps {
  className?: string;
  maskId?: string;
}

export function AddCircleIcon(props: AddCircleIconProps) {
  const maskId = props.maskId || "mask0_add_circle";

  return (
    <>
      <svg className={props.className} width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id={maskId} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="1" y="2" width="16" height="15">
          <path
            d="M9 16.0625C12.6245 16.0625 15.5625 13.1245 15.5625 9.5C15.5625 5.87553 12.6245 2.9375 9 2.9375C5.37553 2.9375 2.4375 5.87553 2.4375 9.5C2.4375 13.1245 5.37553 16.0625 9 16.0625Z"
            fill="white"
            stroke="white"
            strokeWidth="1.3125"
            strokeLinejoin="round"
          />
          <path d="M9 6.875V12.125M6.375 9.5H11.625" stroke="black" strokeWidth="1.3125" strokeLinecap="round" strokeLinejoin="round" />
        </mask>
        <g mask={`url(#${maskId})`}>
          <path d="M1.125 1.625H16.875V17.375H1.125V1.625Z" fill="white" />
        </g>
      </svg>
    </>
  );
}
