import React from "react";
import { SelectProjectsPill, IconButton, InfoPill } from "./ui";
import { CloseIcon, PenIcon } from "./icons";

export enum TaskType {
  STANDARD = "standard",
  INCIDENT_RESPONSE = "incident_response",
  CUSTOM = "custom"
}

export interface SelectedTask {
  id: string;
  label: string;
  category: string;
  type?: TaskType;
  description?: string;
  hasSelectedProjects?: boolean;
  selectedProjects?: string[];
  hourlyRate?: string;
  responseTime?: string;
  firstResponseTime?: string;
  serviceName?: string;
  serviceDescription?: string;
}

interface TaskItemProps {
  task: SelectedTask;
  onSelectProjects: (task: SelectedTask) => void;
  onRemoveTask: (taskId: string) => void;
  onEditTask?: (task: SelectedTask) => void;
  showError?: boolean;
}

export function TaskItem(props: TaskItemProps) {
  return (
    <>
      <div className="flex p-7 flex-col items-start gap-6 self-stretch bg-[#14233A] rounded-[30px]">
        <div className="flex pb-6 flex-col justify-center items-center gap-4 self-stretch border-b border-[#0E1F35]">
          {/* Task Header */}
          <div className="flex items-center gap-4 self-stretch">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-white font-montserrat text-base font-normal leading-[150%]">
                {props.task.label}
              </span>

              {!props.task.hasSelectedProjects && (
                <SelectProjectsPill
                  onClick={() => props.onSelectProjects(props.task)}
                  hasError={props.showError && !props.task.hasSelectedProjects}
                />
              )}
            </div>

            {props.task.hasSelectedProjects && (
              <>
                {props.onEditTask && (
                  <IconButton
                    onClick={() => props.onEditTask?.(props.task)}
                  >
                    <PenIcon className="w-6 h-6" />
                  </IconButton>
                )}

                <IconButton
                  onClick={() => props.onRemoveTask(props.task.id)}
                  variant="rounded"
                >
                  <CloseIcon className="w-6 h-6" />
                </IconButton>
              </>
            )}

            {!props.task.hasSelectedProjects && (
              <IconButton
                onClick={() => props.onRemoveTask(props.task.id)}
              >
                <CloseIcon />
              </IconButton>
            )}
          </div>

          {/* Selected Projects List */}
          {props.task.hasSelectedProjects && props.task.selectedProjects && props.task.selectedProjects.length > 0 && (
            <div className="flex items-start content-start gap-[6px] self-stretch flex-wrap">
              {props.task.selectedProjects.map((project, index) => (
                <React.Fragment key={project}>
                  <span className="text-white font-montserrat text-sm font-normal leading-[150%] opacity-60">
                    {project}
                  </span>
                  {index < props.task.selectedProjects!.length - 1 && (
                    <span className="text-white font-montserrat text-sm font-normal leading-[150%] opacity-60">
                      |
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Configuration Pills */}
          {props.task.hasSelectedProjects && (props.task.hourlyRate || props.task.responseTime) && (
            <div className="flex items-center gap-4 self-stretch">
              {props.task.hourlyRate && (
                <InfoPill text={`Hourly rate: ${props.task.hourlyRate}`} />
              )}
              {props.task.responseTime && (
                <InfoPill text={`Response time: ${props.task.responseTime}`} />
              )}
            </div>
          )}
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
