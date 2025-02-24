import React, { useState } from "react";
import { FormEntry } from "src/views/components";
import { BaseInput } from "src/views/components/form/frames/BaseInput";
import { ToggleSwitch } from "src/views/components/issue";
import { Header } from "src/views/layout";
import FileUpload from "./FileUpload";
import { SelectFilter } from "./SelectFilter";

export function Support() {
  const [subject, setSubject] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const categoryOptions = [
    { value: "support", label: "Support", isSelected: true },
    { value: "development", label: "Development", badge: "Only On Start-Up Plan" },
    { value: "operations", label: "Operations" },
    { value: "consultancy", label: "Consultancy" },
  ];

  const subCategoryOptions = [
    { value: "bugfix", label: "Bug fix" },
    { value: "newfeature", label: "new feature", badge: "Only On Start-Up Plan" },
    { value: "maintenance", label: "maintenance" },
  ];

  const projectOptions = [
    { value: "apache", label: "Apache/Pekko" },
    { value: "slick", label: "Slick", isSelected: true },
    { value: "other", label: "Other" },
  ];

  const severityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium", isSelected: true },
    { value: "high", label: "High" },
  ];

  return (
    <div>
      <Header />
      <h2 className="main-heading text-primary-user pt-16">Support</h2>
      <div className="p-10 flex flex-col !gap-7 justify-center items-center bg-primaryBg max-w-[1112px] mx-auto rounded-[25px] my-16">
        <h4 className="text-[30px] font-michroma text-white">Your request is about</h4>
        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 !gap-5 w-full">
          <SelectFilter
            ariaLabel="Select Category"
            placeholder="Select Category"
            labelValues={categoryOptions}
            onFilterChange={setSelectedCategory}
            label="Category"
            tooltip="lorem ipsum We'll proactively monitor and maintain your critical open-source ponents for two hours each month,"
          />
          <SelectFilter
            ariaLabel="Select Sub Category"
            placeholder="Select Sub Category"
            labelValues={subCategoryOptions}
            onFilterChange={setSelectedCategory}
            label="Sub category"
          />
        </div>
        {/* Public/Private Toggle */}
        {/* <FormEntry label="Visibility">
          <ToggleSwitch onToggle={setIsPublic} bgSwitchColor="bg-[#FF518C]" />
        </FormEntry> */}
        {/* Subject Input */}

        {/* Password Input */}

        <FormEntry label="GitHub discussion or issue url (optional)">
          <BaseInput
            type="text"
            placeholder="https://github.com/scala-native/scala-native/issues/3701"
            value={githubUrl}
            onChange={setGithubUrl}
            isValid={true}
          />
        </FormEntry>
        <div className="grid grid-cols-1 md:grid-cols-2 !gap-5 w-full">
          <SelectFilter
            ariaLabel="Select Project"
            placeholder="Select Project"
            labelValues={projectOptions}
            onFilterChange={setSelectedCategory}
            label="Project"
          />
          <SelectFilter
            ariaLabel="Select Severity"
            placeholder="Select Severity"
            labelValues={severityOptions}
            onFilterChange={setSelectedCategory}
            label="Severity"
          />
        </div>
        <FormEntry label="Problem Description">
          <textarea
            className="w-full min-h-[201px] resize-none outline-none montserrat rounded-xl bg-transparent !bg-[#202F45] text-lg text-[#8693A4] p-4 h-[100px]"
            cols={5}
            placeholder="Please Provide a detailed description of the problem"
          ></textarea>
        </FormEntry>
        <FileUpload />
      </div>
    </div>
  );
}
