import React from "react";
import { SelectProjectsPill, IconButton } from "./ui";
import { CloseIcon } from "./icons";

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
  showError?: boolean;
}

export function TaskItem(props: TaskItemProps) {
  return (
    <>
      <div className="flex p-7 flex-col items-start gap-6 self-stretch bg-[#14233A] rounded-[30px]">
        <div className="flex pb-6 justify-center items-center gap-4 self-stretch border-b border-[#0E1F35]">
          <div className="flex items-center gap-4 flex-1">
            <span className="text-white font-montserrat text-base font-normal leading-[150%]">
              {props.task.label}
            </span>

            <SelectProjectsPill
              onClick={() => props.onSelectProjects(props.task)}
              hasError={props.showError && !props.task.hasSelectedProjects}
            />
          </div>

          <IconButton
            onClick={() => props.onRemoveTask(props.task.id)}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {props.showError && !props.task.hasSelectedProjects && (
          <div className="self-stretch text-[#FF8C8C] font-montserrat text-base font-normal leading-[150%]">
            * Please select projects
          </div>
        )}
      </div>
    </>
  );
}
