import React, { useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { MultiSelectInput, SelectOption } from "../../../../../components/form/select/MultiSelectInput";

interface ServiceCategory {
  service: dto.Service;
  services: dto.Service[];
}

interface InitialServiceSelectionProps {
  serviceCategories: ServiceCategory[];
  onAddInitialServices: (serviceIds: dto.ServiceId[]) => void;
  isLoading: boolean;
}

// Transform service categories into grouped options for MultiSelectInput
const transformServiceCategoriesToOptions = (serviceCategories: ServiceCategory[]): SelectOption[] => {
  const options: SelectOption[] = [];
  
  serviceCategories.forEach(category => {
    // Add category header (non-selectable)
    options.push({
      value: `category-${category.service.id.uuid}`,
      label: category.service.name,
      isCategory: true,
    });
    
    // Add category services
    category.services.forEach(service => {
      options.push({
        value: service.id.uuid,
        label: service.name,
        isCategory: false,
      });
    });
  });
  
  return options;
};

export default function InitialServiceSelection(props: InitialServiceSelectionProps) {
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const options = transformServiceCategoriesToOptions(props.serviceCategories);

  const handleSelectionChange = (selectedValues: string[]) => {
    // Filter out category headers from selection
    const filteredValues = selectedValues.filter(value => !value.startsWith('category-'));
    setSelectedServiceIds(filteredValues);
  };

  const handleAddTasks = () => {
    if (selectedServiceIds.length === 0) return;
    
    const serviceIds: dto.ServiceId[] = selectedServiceIds.map(uuid => ({ uuid }));
    props.onAddInitialServices(serviceIds);
    setSelectedServiceIds([]);
  };

  const isAddButtonDisabled = selectedServiceIds.length === 0;

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Add Task Section */}
      <div className="flex flex-col gap-8 p-8 bg-[#14233A] rounded-[30px] w-full">
        {/* Section Title */}
        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-white font-michroma text-[28px] leading-[130%] font-normal">
            Add Task
          </h2>
        </div>

        {/* Task Required Label */}
        <div className="flex w-full items-start gap-1">
          <div className="flex flex-col items-start">
            <span className="text-white font-montserrat text-[16px] leading-[150%] font-normal opacity-60">
              Tasks are required
            </span>
          </div>
        </div>

        {/* Input and Add Button Row */}
        <div className="flex items-center gap-6 w-full">
          {/* Dropdown Input */}
          <div className="flex-1 relative">
            <MultiSelectInput
              options={options}
              value={selectedServiceIds}
              onChange={handleSelectionChange}
              placeholder="Select a task..."
              isOpen={isDropdownOpen}
              onToggle={setIsDropdownOpen}
            />
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddTasks}
            disabled={isAddButtonDisabled}
            className={`flex px-5 py-3 justify-center items-center gap-2.5 rounded-md transition-opacity ${
              isAddButtonDisabled 
                ? 'opacity-50 bg-[#202F45] cursor-not-allowed' 
                : 'bg-[#202F45] hover:opacity-90'
            }`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_714_20237" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="2" y="2" width="20" height="20">
                <path d="M12 20.75C16.8326 20.75 20.75 16.8326 20.75 12C20.75 7.16738 16.8326 3.25 12 3.25C7.16738 3.25 3.25 7.16738 3.25 12C3.25 16.8326 7.16738 20.75 12 20.75Z" fill="white" stroke="white" strokeWidth="1.75" strokeLinejoin="round"/>
                <path d="M12 8.5V15.5M8.5 12H15.5" stroke="black" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </mask>
              <g mask="url(#mask0_714_20237)">
                <path d="M1.5 1.5H22.5V22.5H1.5V1.5Z" fill="white"/>
              </g>
            </svg>
            <span className="text-white font-michroma text-[12px] leading-normal font-normal">
              Add
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
