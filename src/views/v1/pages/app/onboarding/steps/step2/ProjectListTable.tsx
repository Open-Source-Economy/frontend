import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { SourceIdentifierCompanion } from "../../../../../data";
import { displayedDeveloperRoles, displayedMergeRights } from "../../../../../components/form";
import { GitHubIcon } from "./icons/GitHubIcon";
import { ProjectItemType } from "@open-source-economy/api-types/dist/model/project/ProjectItemType";

interface ProjectListTableProps {
  projects: DeveloperProjectItemEntry[];
  onEditProject: (project: DeveloperProjectItemEntry) => void;
  onDeleteProject: (project: DeveloperProjectItemEntry) => void;
}

export function ProjectListTable(props: ProjectListTableProps) {
  return (
    <div className="flex flex-col items-start self-stretch rounded-[30px]">
      {/* Table Header */}
      <div className="flex p-3 pb-0.5 flex-col items-start gap-6 self-stretch border-b border-[#FF7E4B] border-opacity-20 bg-[#14233A]">
        <div className="flex pb-2.5 justify-center items-center gap-4 self-stretch">
          <div className="flex items-center gap-2.5 flex-1">
            <div className="flex w-[260px] items-center gap-2.5">
              <div className="text-[#FF7E4B] font-montserrat text-lg font-medium leading-[150%]">Project</div>
            </div>
            <svg
              className="w-0 self-stretch stroke-[#FF7E4B] opacity-20"
              width="2"
              height="27"
              viewBox="0 0 2 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path opacity="0.2" d="M1 0V27" stroke="#FF7E4B" />
            </svg>
            <div className="flex w-[180px] items-center gap-2.5">
              <div className="text-[#FF7E4B] font-montserrat text-lg font-medium leading-[150%]">Roll</div>
            </div>
            <svg
              className="w-0 self-stretch stroke-[#FF7E4B] opacity-20"
              width="2"
              height="27"
              viewBox="0 0 2 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path opacity="0.2" d="M1 0V27" stroke="#FF7E4B" />
            </svg>
            <div className="flex items-center gap-2.5 flex-1">
              <div className="text-[#FF7E4B] font-montserrat text-lg font-medium leading-[150%]">Rights given</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Rows */}
      {props.projects.map((entry, index) => (
        <div key={entry.developerProjectItem.id.uuid} className="flex p-5 pb-0.5 flex-col items-start gap-6 self-stretch bg-[#14233A]">
          <div className={`flex pb-5 justify-center items-center gap-6 self-stretch ${index < props.projects.length - 1 ? "border-b border-[#0E1F35]" : ""}`}>
            <div className="flex items-start gap-2.5 flex-1">
              <div className="flex w-[260px] items-center gap-2.5">
                {/* GitHub Icon */}
                {entry.projectItem.projectItemType === ProjectItemType.GITHUB_OWNER ||
                  (entry.projectItem.projectItemType === ProjectItemType.GITHUB_REPOSITORY && <GitHubIcon />)}

                <div className="text-white font-montserrat text-base font-normal leading-[150%]">
                  {SourceIdentifierCompanion.displayName(entry.projectItem.sourceIdentifier)}
                </div>
              </div>
              <svg className="w-0 self-stretch stroke-white opacity-20" width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" d="M1 0V42" stroke="white" />
              </svg>
              <div className="w-[180px] text-white font-montserrat text-sm font-normal leading-[150%]">
                {displayedDeveloperRoles[entry.developerProjectItem.roles[0]]?.name || "No role"}
              </div>
              <svg className="w-0 self-stretch stroke-white opacity-20" width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" d="M1 0V42" stroke="white" />
              </svg>
              <div className="flex-1 text-white font-montserrat text-sm font-normal leading-[150%]">
                {displayedMergeRights[entry.developerProjectItem.mergeRights[0]]?.name || "No rights specified"}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Edit Icon */}
              <button onClick={() => props.onEditProject(entry)} className="w-6 h-6 hover:opacity-70 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.001 19.9997H21.001M16.377 3.62173C16.775 3.22364 17.315 3 17.878 3C18.4409 3 18.9809 3.22364 19.379 3.62173C19.777 4.01982 20.0007 4.55975 20.0007 5.12273C20.0007 5.68572 19.777 6.22564 19.379 6.62373L7.36895 18.6347C7.13105 18.8726 6.83698 19.0467 6.51395 19.1407L3.64195 19.9787C3.5559 20.0038 3.46469 20.0053 3.37786 19.9831C3.29103 19.9608 3.21178 19.9157 3.1484 19.8523C3.08502 19.7889 3.03984 19.7097 3.0176 19.6228C2.99535 19.536 2.99686 19.4448 3.02195 19.3587L3.85995 16.4867C3.95417 16.1641 4.1282 15.8704 4.36595 15.6327L16.377 3.62173Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Delete Icon */}
              <button
                onClick={() => props.onDeleteProject(entry)}
                className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 hover:opacity-70 transition-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4L4 20" stroke="white" strokeLinecap="round" />
                  <path d="M4 4L20 20" stroke="white" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
