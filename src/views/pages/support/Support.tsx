import React, { useState } from "react";
import { FormEntry, SelectFilter } from "src/views/components";
import { BaseInput } from "src/views/components/form/frames/BaseInput";
import { ToggleSwitch } from "src/views/components/issue";
import { Header } from "src/views/layout";
import FileUpload from "./FileUpload";

export function Support() {
  const [subject, setSubject] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const categoryOptions = [
    { value: "billing", label: "Billing" },
    { value: "technical", label: "Technical Support" },
    { value: "general", label: "General Inquiry" },
  ];

  return (
    <div>
      <Header />
      <h2 className="main-heading text-primary-user pt-16">Support</h2>
      <div className="p-10 flex flex-col !gap-7 justify-center items-center bg-primaryBg max-w-[1112px] mx-auto rounded-[25px] my-16">
        <h4 className="text-[30px] font-michroma text-white">Your request is about</h4>
        {/* Category Selection */}
        <div className="grid grid-cols-2 w-full !gap-5">
          <FormEntry label=" Category">
            <SelectFilter
              ariaLabel="Select Category"
              showBorder={false}
              placeholder="Select Category"
              labelValues={categoryOptions}
              onFilterChange={setSelectedCategory}
            />
          </FormEntry>
          <FormEntry label="Sub category">
            <SelectFilter
              showBorder={false}
              placeholder="Select Category"
              ariaLabel="Support Category"
              labelValues={categoryOptions}
              onFilterChange={setSelectedCategory}
            />
          </FormEntry>
        </div>
        {/* Public/Private Toggle */}
        {/* <FormEntry label="Visibility">
          <ToggleSwitch onToggle={setIsPublic} bgSwitchColor="bg-[#FF518C]" />
        </FormEntry> */}
        {/* Subject Input */}
        <FormEntry label="Subject">
          <BaseInput type="text" placeholder="Enter Title" value={subject} onChange={setSubject} isValid={true} />
        </FormEntry>
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
        <div className="grid grid-cols-2 w-full !gap-5">
          <FormEntry label="Project">
            <SelectFilter
              ariaLabel="Select Category"
              showBorder={false}
              placeholder="other"
              labelValues={categoryOptions}
              onFilterChange={setSelectedCategory}
            />
          </FormEntry>
          <FormEntry label="Severity">
            <SelectFilter
              showBorder={false}
              placeholder="Low"
              ariaLabel="Support Category"
              labelValues={categoryOptions}
              onFilterChange={setSelectedCategory}
            />
          </FormEntry>
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
