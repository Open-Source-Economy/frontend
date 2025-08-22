import React, { useState } from "react";
import * as dto from "@open-source-economy/api-types";

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface ServiceCategory {
  service: dto.Service;
  services: dto.Service[];
}

interface InitialServiceSelectionProps {
  serviceCategories: ServiceCategory[];
  onClose: () => void;
  onAddServices: (serviceIds: dto.ServiceId[]) => void;
  isLoading: boolean;
}

export default function InitialServiceSelection(props: InitialServiceSelectionProps) {
  const [selectedServices, setSelectedServices] = useState<dto.ServiceId[]>([]);

  const handleServiceSelection = (service: dto.Service) => {
    setSelectedServices(prev => {
      if (prev.some(s => s.uuid === service.id.uuid)) {
        return prev.filter(s => s.uuid !== service.id.uuid);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleAddSelectedTasks = () => {
    setSelectedServices(selectedServices);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#14233a] rounded-md p-6 w-[600px] max-h-[80vh] overflow-y-auto border border-[rgba(255,255,255,0.2)]">
        <div className="flex flex-row gap-4 items-center justify-between mb-6">
          <div className="font-michroma not-italic text-[#ffffff] text-[25px] text-left">
            <p className="block leading-[1.3]">Add Task</p>
          </div>
          <button onClick={props.onClose} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors">
            <CloseIcon />
          </button>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          {props.isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-70">Loading services...</div>
            </div>
          ) : (
            props.serviceCategories.map(category => (
              <div key={category.service.id.uuid}>
                <div className="font-montserrat font-medium text-[#ffffff] text-[16px] text-left py-2 bg-[#202f45] px-4">
                  <p className="block leading-[1.5]">{category.service.name}</p>
                </div>
                {category.services.map(service => {
                  const isSelected = selectedServices.some(s => s.uuid === service.id.uuid);
                  return (
                    <div
                      key={service.id.uuid}
                      className="bg-[#202f45] box-border content-stretch flex flex-row gap-2.5 items-center justify-start pl-6 pr-3 py-3 border-b border-[#2a3f56] last:border-b-0"
                    >
                      <div className="bg-[#202f45] relative rounded-sm shrink-0 size-[18px]">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleServiceSelection(service)}
                          className="w-full h-full opacity-0 cursor-pointer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] rounded-sm flex items-center justify-center">
                            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute border border-[#ffffff] border-solid inset-[-1px] pointer-events-none rounded-sm" />
                      </div>
                      <div className="font-montserrat font-normal text-[#ffffff] text-[16px] text-left">
                        <p className="block leading-[1.5]">{service.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="flex flex-row gap-4 items-center justify-end">
          <button
            onClick={props.onClose}
            className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
          >
            <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
              <p className="block leading-[1.5] whitespace-pre">Cancel</p>
            </div>
          </button>
          <button
            onClick={handleAddSelectedTasks}
            disabled={selectedServices.length === 0}
            className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all ${
              selectedServices.length === 0
                ? "bg-gray-500 opacity-50 cursor-not-allowed"
                : "bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] hover:scale-105"
            }`}
          >
            <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
              <p className="block leading-[1.5] whitespace-pre">Add Selected</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}