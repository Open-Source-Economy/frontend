import React from "react";

interface AddProjectButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function AddProjectButton(props: AddProjectButtonProps) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`flex p-3 justify-center items-center gap-2.5 rounded-md bg-[#202F45] transition-colors ${
        props.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#2a3f56]"
      }`}
    >
      {/* Add Icon */}
      <svg
        className="flex w-6 h-6 p-0.5 flex-col justify-center items-center gap-2.5"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask id="mask0_714_18740" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
          <path
            d="M12 20.75C16.8326 20.75 20.75 16.8326 20.75 12C20.75 7.16738 16.8326 3.25 12 3.25C7.16738 3.25 3.25 7.16738 3.25 12C3.25 16.8326 7.16738 20.75 12 20.75Z"
            fill="white"
            stroke="white"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path d="M12 8.5V15.5M8.5 12H15.5" stroke="black" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </mask>
        <g mask="url(#mask0_714_18740)">
          <path d="M1.5 1.5H22.5V22.5H1.5V1.5Z" fill="white" />
        </g>
      </svg>

      {/* Button Text */}
      <div className="text-white font-michroma text-xs font-normal">Add Project</div>
    </button>
  );
}
