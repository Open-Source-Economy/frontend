import React from "react";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { ProjectItemId } from "@open-source-economy/api-types/dist/model";
import { ProjectItemIdCompanion } from "../../../../../data";

interface ProjectListTableProps {
  projects: DeveloperProjectItemEntry[];
  onEditProject: (project: DeveloperProjectItemEntry) => void;
  onDeleteProject: (projectId: ProjectItemId) => void;
}

export function ProjectListTable(props: ProjectListTableProps) {
  return (
    <div className="flex flex-col items-start self-stretch rounded-[30px]">
      {/* Table Header */}
      <div className="flex p-3 pb-0.5 flex-col items-start gap-6 self-stretch border-b border-[#FF7E4B] border-opacity-20 bg-[#14233A]">
        <div className="flex pb-2.5 justify-center items-center gap-4 self-stretch">
          <div className="flex items-center gap-2.5 flex-1">
            <div className="flex w-[260px] items-center gap-2.5">
              <div className="text-[#FF7E4B] font-montserrat text-lg font-medium leading-[150%]">
                Project name
              </div>
            </div>
            <svg className="w-0 self-stretch stroke-[#FF7E4B] opacity-20" width="2" height="27" viewBox="0 0 2 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.2" d="M1 0V27" stroke="#FF7E4B"/>
            </svg>
            <div className="flex w-[180px] items-center gap-2.5">
              <div className="text-[#FF7E4B] font-montserrat text-lg font-medium leading-[150%]">
                Roll
              </div>
            </div>
            <svg className="w-0 self-stretch stroke-[#FF7E4B] opacity-20" width="2" height="27" viewBox="0 0 2 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.2" d="M1 0V27" stroke="#FF7E4B"/>
            </svg>
            <div className="flex items-center gap-2.5 flex-1">
              <div className="text-[#FF7E4B] font-montserrat text-lg font-medium leading-[150%]">
                Rights given
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Rows */}
      {props.projects.map((entry, index) => (
        <div key={entry.developerProjectItem.id.uuid} className="flex p-5 pb-0.5 flex-col items-start gap-6 self-stretch bg-[#14233A]">
          <div className={`flex pb-5 justify-center items-center gap-6 self-stretch ${index < props.projects.length - 1 ? 'border-b border-[#0E1F35]' : ''}`}>
            <div className="flex items-start gap-2.5 flex-1">
              <div className="flex w-[260px] items-center gap-2.5">
                {/* GitHub Icon */}
                <svg className="w-[21px] h-[21px] flex-shrink-0" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_620_59157)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.5 0.5C4.69875 0.5 0 5.19875 0 11C0 15.6462 3.00562 19.5706 7.17937 20.9619C7.70437 21.0538 7.90125 20.7388 7.90125 20.4631C7.90125 20.2138 7.88813 19.3869 7.88813 18.5075C5.25 18.9931 4.5675 17.8644 4.3575 17.2738C4.23938 16.9719 3.7275 16.04 3.28125 15.7906C2.91375 15.5937 2.38875 15.1081 3.26813 15.095C4.095 15.0819 4.68563 15.8562 4.8825 16.1712C5.8275 17.7594 7.33688 17.3131 7.94063 17.0375C8.0325 16.355 8.30812 15.8956 8.61 15.6331C6.27375 15.3706 3.8325 14.465 3.8325 10.4487C3.8325 9.30688 4.23938 8.36187 4.90875 7.62687C4.80375 7.36437 4.43625 6.28813 5.01375 4.84438C5.01375 4.84438 5.89313 4.56875 7.90125 5.92063C8.74125 5.68438 9.63375 5.56625 10.5263 5.56625C11.4188 5.56625 12.3113 5.68438 13.1513 5.92063C15.1594 4.55562 16.0387 4.84438 16.0387 4.84438C16.6163 6.28813 16.2488 7.36437 16.1438 7.62687C16.8131 8.36187 17.22 9.29375 17.22 10.4487C17.22 14.4781 14.7656 15.3706 12.4294 15.6331C12.81 15.9612 13.1381 16.5912 13.1381 17.5756C13.1381 18.98 13.125 20.1087 13.125 20.4631C13.125 20.7388 13.3219 21.0669 13.8469 20.9619C17.9944 19.5706 21 15.6331 21 11C21 5.19875 16.3013 0.5 10.5 0.5Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_620_59157">
                      <rect width="21" height="21" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                  </defs>
                </svg>
                <div className="text-white font-montserrat text-base font-normal leading-[150%]">
                  {ProjectItemIdCompanion.displayName(entry.projectItem.sourceIdentifier)}
                </div>
              </div>
              <svg className="w-0 self-stretch stroke-white opacity-20" width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" d="M1 0V42" stroke="white"/>
              </svg>
              <div className="w-[180px] text-white font-montserrat text-sm font-normal leading-[150%]">
                {entry.developerProjectItem.roles[0] || "No role"}
              </div>
              <svg className="w-0 self-stretch stroke-white opacity-20" width="2" height="42" viewBox="0 0 2 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.2" d="M1 0V42" stroke="white"/>
              </svg>
              <div className="flex-1 text-white font-montserrat text-sm font-normal leading-[150%]">
                {entry.developerProjectItem.mergeRights[0] === 'YES_FULL_RIGHTS' ? 'Yes, full rights' : 
                 entry.developerProjectItem.mergeRights[0] === 'NO_PRS_ARE_REVIEWED_AND_MERGED_BY_OTHERS' ? 'No, PRs are reviewed and merged by others' :
                 entry.developerProjectItem.mergeRights[0] || "No rights specified"}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Edit Icon */}
              <button
                onClick={() => props.onEditProject(entry)}
                className="w-6 h-6 hover:opacity-70 transition-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.001 19.9997H21.001M16.377 3.62173C16.775 3.22364 17.315 3 17.878 3C18.4409 3 18.9809 3.22364 19.379 3.62173C19.777 4.01982 20.0007 4.55975 20.0007 5.12273C20.0007 5.68572 19.777 6.22564 19.379 6.62373L7.36895 18.6347C7.13105 18.8726 6.83698 19.0467 6.51395 19.1407L3.64195 19.9787C3.5559 20.0038 3.46469 20.0053 3.37786 19.9831C3.29103 19.9608 3.21178 19.9157 3.1484 19.8523C3.08502 19.7889 3.03984 19.7097 3.0176 19.6228C2.99535 19.536 2.99686 19.4448 3.02195 19.3587L3.85995 16.4867C3.95417 16.1641 4.1282 15.8704 4.36595 15.6327L16.377 3.62173Z" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* Delete Icon */}
              <button
                onClick={() => props.onDeleteProject(entry.developerProjectItem.id)}
                className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 hover:opacity-70 transition-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4L4 20" stroke="white" strokeLinecap="round"/>
                  <path d="M4 4L20 20" stroke="white" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
