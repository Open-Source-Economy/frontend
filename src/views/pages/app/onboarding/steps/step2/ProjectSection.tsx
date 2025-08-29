import React from "react";
import { GenericInputRef, UrlInput } from "../../../../../components/form";

interface ProjectSectionProps {
  url: string;
  onUrlChange: (url: string) => void;
  urlInputRef: React.RefObject<GenericInputRef>;
}

export function ProjectSection(props: ProjectSectionProps) {
  return (
    <div className="flex p-9 flex-col justify-end items-end gap-2.5 self-stretch rounded-[30px] bg-[#14233A]">
      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="self-stretch text-white font-montserrat text-2xl font-normal leading-[130%]">The Project</div>
        </div>
      </div>

      {/* URL Input with custom styling to match Figma */}
      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="flex items-start gap-1 self-stretch">
          <div className="flex flex-col items-start">
            <div className="text-white font-montserrat text-base font-normal leading-[150%] opacity-60">Project URL *</div>
          </div>
          {/* Info icon */}
          <svg
            className="flex p-1 flex-col justify-center items-center gap-3.5 opacity-60"
            width="10"
            height="20"
            viewBox="0 0 10 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.6">
              <path
                d="M5 5.25781C6.32608 5.25781 7.59785 5.7846 8.53553 6.72228C9.47322 7.65996 10 8.93173 10 10.2578C10 11.5839 9.47322 12.8557 8.53553 13.7933C7.59785 14.731 6.32608 15.2578 5 15.2578C3.67392 15.2578 2.40215 14.731 1.46447 13.7933C0.526784 12.8557 0 11.5839 0 10.2578C0 8.93173 0.526784 7.65996 1.46447 6.72228C2.40215 5.7846 3.67392 5.25781 5 5.25781ZM5.74995 8.32759C6.12135 8.32759 6.42276 8.06975 6.42276 7.68764C6.42276 7.30552 6.12063 7.04768 5.74995 7.04768C5.37854 7.04768 5.07857 7.30552 5.07857 7.68764C5.07857 8.06975 5.37854 8.32759 5.74995 8.32759ZM5.88065 12.3466C5.88065 12.2702 5.90708 12.0716 5.89208 11.9588L5.30498 12.6344C5.18356 12.7623 5.03143 12.8508 4.96 12.8273C4.9276 12.8153 4.90051 12.7923 4.88362 12.7621C4.86673 12.732 4.86114 12.6969 4.86787 12.663L5.84637 9.57179C5.92636 9.17968 5.70638 8.82184 5.23998 8.77613C4.74788 8.77613 4.02364 9.27538 3.58296 9.90891C3.58296 9.98462 3.56867 10.1732 3.58367 10.286L4.17006 9.60964C4.29148 9.48323 4.4329 9.39395 4.50432 9.41823C4.53951 9.43086 4.56835 9.45678 4.58464 9.49043C4.60093 9.52408 4.60338 9.56278 4.59146 9.59822L3.62153 12.6744C3.50939 13.0344 3.72152 13.3872 4.23577 13.4672C4.99286 13.4672 5.43997 12.9801 5.88137 12.3466H5.88065Z"
                fill="white"
              />
            </g>
          </svg>
        </div>

        <UrlInput
          id="repository-url"
          name="repositoryUrl"
          label=""
          required
          value={props.url}
          onChange={e => props.onUrlChange(e.target.value)}
          placeholder="URL"
          ref={props.urlInputRef}
          className="w-full"
        />
      </div>
    </div>
  );
}
