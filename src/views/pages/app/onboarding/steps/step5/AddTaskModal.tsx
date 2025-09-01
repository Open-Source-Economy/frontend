import React, { useState } from "react";

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
  onAddTasks: (selectedTasks: TaskOption[]) => void;
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

export function AddTaskModal({ isOpen, onClose, onAddTasks }: AddTaskModalProps) {
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
    onAddTasks(selectedTasks);
    setSelectedTasks([]);
  };

  const isTaskSelected = (taskId: string) => {
    return selectedTasks.some(t => t.id === taskId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-[800px] mx-4 max-h-[80vh] overflow-y-auto bg-[#0E1F35] rounded-[50px] p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex justify-center items-center gap-2.5 self-stretch">
            <h2 className="flex-1 text-white font-michroma text-[28px] font-normal leading-[130%]">
              Add Tasks
            </h2>
            <button
              onClick={onClose}
              className="flex w-6 h-6 flex-col justify-center items-center gap-2.5 text-white hover:text-[#FF7E4B] transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4L4 20" stroke="currentColor" strokeLinecap="round"/>
                <path d="M4 4L20 20" stroke="currentColor" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <p className="self-stretch text-white font-montserrat text-base font-normal leading-[150%] opacity-60">
            Tasks are required.
          </p>
        </div>

        {/* Task Categories */}
        <div className="flex flex-col gap-4 mb-8">
          {TASK_CATEGORIES.map((category) => (
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
                {category.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex p-3 items-center gap-2.5 self-stretch bg-[#14233A] cursor-pointer hover:bg-[#1a2a42] transition-colors"
                    onClick={() => handleTaskToggle(task)}
                  >
                    {/* Checkbox */}
                    <div className="relative w-[18px] h-[18px] rounded-sm border border-white bg-[#14233A]">
                      {isTaskSelected(task.id) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] rounded-sm flex items-center justify-center">
                          <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <span className="text-white font-montserrat text-base font-normal leading-[150%]">
                      {task.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
      </div>
    </div>
  );
}
