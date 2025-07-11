import React from "react";
import { SelectFilter } from "../../SelectFilter";
import { ServiceType, SubServiceType } from "../../../../../api/model";
                import * as dto from "src/api/dto";

interface SelectServiceProps {
  userPlan: dto.GetUserPlanResponse
  selectedServiceType: ServiceType | null;
  setSelectedServiceType: (service: ServiceType) => void;
  selectedSubServiceType: SubServiceType | null;
  setSelectedSubServiceType: (subServiceType: SubServiceType) => void;

}

export function SelectService(props: SelectServiceProps) {

  const handleCategoryChange = (value: string) => {
    setSelectedServiceType(value);
    console.log("Selected category:", value); // Debug log
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubServiceType(value);
  };

  return (
    <>
      <SelectFilter
        ariaLabel="Select Category"
        placeholder="Select Category"
        labelValues={props.categoryOptions}
        onFilterChange={setSelectedServiceType}
        label="Category"
        isUpgraded={true}
        tooltip="loream lpeam We'll proactively monitor and maintain your critical open-source ponents for two hours each month,"
      />

      <SelectFilter
        ariaLabel="Select Sub Category"
        placeholder="Select Sub Category"
        labelValues={subCategoryOptions}
        onFilterChange={handleSubCategoryChange}
        label="Sub category"
        isUpgraded={true}
        disabled={!selectedCategory}
      />
    </>
  );
}