import React, { useState } from "react";
import { SelectedTask, TaskType } from "./TaskItem";
import { ModalBackdrop, ModalHeader, Checkbox } from "./ui";

interface TaskOption {
  id: string;
  label: string;
}

interface TaskCategory {
  id: string;
  title: string;
  tasks: TaskOption[];
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTasks: (selectedTasks: SelectedTask[]) => void;
  existingTaskIds?: string[];
}

const TASK_CATEGORIES: TaskCategory[] = [
  {
    id: "open-source-development",
    title: "Open Source Development",
    tasks: [
      { id: "bug-fixes", label: "Bug Fixes" },
      { id: "new-features", label: "New Features" },
      { id: "deployment-guidance-dev", label: "Deployment Guidance" },
    ],
  },
  {
    id: "enterprise-support",
    title: "Enterprise Support",
    tasks: [
      { id: "technical-assistance", label: "Technical Assistance" },
      { id: "non-technical-assistance", label: "Non-Technical Assistance" },
      { id: "deployment-guidance-ent", label: "Deployment Guidance" },
    ],
  },
  {
    id: "consultancy",
    title: "Consultancy",
    tasks: [
      { id: "architecture-design", label: "Architecture Design" },
      { id: "technology-assessment", label: "Technology Assessment" },
      { id: "security-performance", label: "Security & Performance" },
    ],
  },
  {
    id: "operation",
    title: "Operation",
    tasks: [
      { id: "incident-response", label: "Incident Response" },
      { id: "24-7-supervision", label: "24/7 Supervision" },
    ],
  },
  {
    id: "other-tasks",
    title: "Other Tasks",
    tasks: [
      { id: "custom-service", label: "Custom Service" },
    ],
  },
];

export function AddTaskModal({ isOpen, onClose, onAddTasks, existingTaskIds = [] }: AddTaskModalProps) {
  const [selectedTasks, setSelectedTasks] = useState<TaskOption[]>([]);

  if (!isOpen) return null;

  const handleTaskToggle = (task: TaskOption) => {
    setSelectedTasks(prev => {
      const isSelected = prev.some(t => t.id === task.id);
      if (isSelected) {
        return prev.filter(t => t.id !== task.id);
      } else {
        return [...prev, task];
      }
    });
  };

  const handleAddTasks = () => {
    const selectedTasksWithCategory: SelectedTask[] = selectedTasks.map(task => {
      const category = TASK_CATEGORIES.find(cat =>
        cat.tasks.some(t => t.id === task.id)
      );

      // Determine task type based on task ID
      let taskType: TaskType = TaskType.STANDARD;
      if (task.id === "incident-response") {
        taskType = TaskType.INCIDENT_RESPONSE;
      } else if (task.id === "custom-service") {
        taskType = TaskType.CUSTOM;
      }

      return {
        id: task.id,
        label: task.label,
        category: category?.title || "Other",
        type: taskType,
        hasSelectedProjects: false
      };
    });
    onAddTasks(selectedTasksWithCategory);
    setSelectedTasks([]);
  };

  const isTaskSelected = (taskId: string) => {
    return selectedTasks.some(t => t.id === taskId);
  };

  return (
    <ModalBackdrop
      isOpen={isOpen}
      onClose={onClose}
      className="relative w-full max-w-[800px] mx-4 max-h-[80vh] overflow-y-auto bg-[#0E1F35] rounded-[50px] p-4 md:p-8"
    >
      <ModalHeader
        title="Add Tasks"
        subtitle="Tasks are required."
        onClose={onClose}
      />

        {/* Task Categories */}
        <div className="flex flex-col gap-4 mb-8">
          {TASK_CATEGORIES.map((category) => {
            const availableTasks = category.tasks.filter(task => !existingTaskIds.includes(task.id));
            if (availableTasks.length === 0) return null;

            return (
              <div
                key={category.id}
                className="flex p-4 md:p-8 flex-col justify-end items-end gap-4 self-stretch rounded-[30px] bg-[#14233A]"
              >
                {/* Category Title */}
                <div className="flex flex-col items-center gap-1 self-stretch">
                  <div className="flex flex-col items-start gap-4 self-stretch">
                    <h3 className="self-stretch text-[#FF7E4B] font-montserrat text-2xl font-normal leading-[130%]">
                      {category.title}
                    </h3>
                  </div>
                </div>

                {/* Task List */}
                <div className="flex w-full max-w-[670px] flex-col items-center gap-[-1px] rounded-md">
                  {availableTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex p-3 items-center gap-2.5 self-stretch bg-[#14233A] cursor-pointer hover:bg-[#1a2a42] transition-colors"
                      onClick={() => handleTaskToggle(task)}
                    >
                      <Checkbox
                        checked={isTaskSelected(task.id)}
                        onChange={() => handleTaskToggle(task)}
                      />

                      <span className="text-white font-montserrat text-base font-normal leading-[150%]">
                        {task.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Tasks Button */}
        <div className="flex justify-center items-center gap-2.5 rounded-md">
          <button
            onClick={handleAddTasks}
            disabled={selectedTasks.length === 0}
            className={`flex p-3 justify-center items-center gap-2 rounded-md border border-[#FF7E4B] transition-all ${
              selectedTasks.length === 0 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-[#FF7E4B] hover:bg-opacity-10'
            }`}
          >
            <span className="text-white font-michroma text-xs font-normal leading-[150%]">
              Add Tasks
            </span>
          </button>
        </div>
    </ModalBackdrop>
  );
}
