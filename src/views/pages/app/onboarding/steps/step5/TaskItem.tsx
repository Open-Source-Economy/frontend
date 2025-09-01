import React from "react";

export interface SelectedTask {
  id: string;
  label: string;
  category: string;
  hasSelectedProjects?: boolean;
}

interface TaskItemProps {
  task: SelectedTask;
  onSelectProjects: (task: SelectedTask) => void;
  onRemoveTask: (taskId: string) => void;
}

export function TaskItem({ task, onSelectProjects, onRemoveTask }: TaskItemProps) {
  return (
    <div className="flex p-7 flex-col items-start gap-6 self-stretch bg-[#14233A] rounded-[30px]">
      <div className="flex pb-6 justify-center items-center gap-4 self-stretch border-b border-[#0E1F35]">
        <div className="flex items-center gap-4 flex-1">
          <span className="text-white font-montserrat text-base font-normal leading-[150%]">
            {task.label}
          </span>
          
          <button
            onClick={() => onSelectProjects(task)}
            className="flex px-2.5 py-0.5 justify-center items-center gap-2.5 rounded-[50px] bg-[#202F45] hover:bg-[#2a3f56] transition-colors"
          >
            <svg 
              className="flex w-[18px] h-[18px] p-[1.5px] flex-col justify-center items-center gap-[7.5px]" 
              width="18" 
              height="19" 
              viewBox="0 0 18 19" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id={`mask0_${task.id}`} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="1" y="2" width="16" height="15">
                <path 
                  d="M9 16.0625C12.6245 16.0625 15.5625 13.1245 15.5625 9.5C15.5625 5.87553 12.6245 2.9375 9 2.9375C5.37553 2.9375 2.4375 5.87553 2.4375 9.5C2.4375 13.1245 5.37553 16.0625 9 16.0625Z" 
                  fill="white" 
                  stroke="white" 
                  strokeWidth="1.3125" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M9 6.875V12.125M6.375 9.5H11.625" 
                  stroke="black" 
                  strokeWidth="1.3125" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </mask>
              <g mask={`url(#mask0_${task.id})`}>
                <path d="M1.125 1.625H16.875V17.375H1.125V1.625Z" fill="white"/>
              </g>
            </svg>
            <span className="text-white font-montserrat text-sm font-normal leading-[150%]">
              Select Projects
            </span>
          </button>
        </div>

        <button
          onClick={() => onRemoveTask(task.id)}
          className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 text-white hover:text-[#FF7E4B] transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4L4 20" stroke="currentColor" strokeLinecap="round"/>
            <path d="M4 4L20 20" stroke="currentColor" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
