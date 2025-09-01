import React from "react";
import { TaskItem, SelectedTask } from "./TaskItem";
import { AddTaskButton } from "./ui";

interface TaskCategoryProps {
  categoryTitle: string;
  tasks: SelectedTask[];
  onSelectProjects: (task: SelectedTask) => void;
  onRemoveTask: (taskId: string) => void;
  showAddCustomTask?: boolean;
  onAddCustomTask?: () => void;
}

export function TaskCategory({ 
  categoryTitle, 
  tasks, 
  onSelectProjects, 
  onRemoveTask, 
  showAddCustomTask = false,
  onAddCustomTask 
}: TaskCategoryProps) {
  if (tasks.length === 0 && !showAddCustomTask) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-6 self-stretch">
      {/* Category Header */}
      <div className="flex items-center gap-6 self-stretch">
        <h3 className="flex-1 text-[#FF7E4B] font-michroma text-[28px] font-normal leading-[130%]">
          {categoryTitle}
        </h3>
        
        {/* Add Custom Task Button - only for "Other Tasks" category */}
        {showAddCustomTask && onAddCustomTask && (
          <AddTaskButton
            onClick={onAddCustomTask}
            text="Add Custom Task"
          />
        )}
      </div>

      {/* Tasks */}
      <div className="flex flex-col items-start self-stretch rounded-[30px]">
        {tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            onSelectProjects={onSelectProjects}
            onRemoveTask={onRemoveTask}
          />
        ))}
      </div>
    </div>
  );
}
