import { PhoneIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button, FormEntry } from "src/views/components";
import { BaseInput } from "src/views/components/old-form/frames/BaseInput";
import { ToggleSwitch } from "src/views/components/issue";
import { Header } from "src/views/layout";
import FileUpload from "./FileUpload";
import IsUpgraded from "./IsUpgraded";
import { SelectFilter } from "./SelectFilter";
import { Priority, ServiceType } from "@open-source-economy/api-types";
import { DropdownOption, getSubServiceOptions } from "./DropdownOption";

export function Support() {
  const [subject, setSubject] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [githubDiscussionUrl, setGithubDiscussionUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [subCategoryOptions, setSubCategoryOptions] = useState<DropdownOption[]>([]);
  const [isSubjectValid, setIsSubjectValid] = useState(true);
  const [isGithubUrlValid, setIsGithubUrlValid] = useState(true);
  const [isGithubDiscussionUrlValid, setIsGithubDiscussionUrlValid] = useState(true);

  const categoryOptions = [
    { value: ServiceType.SUPPORT, label: "Support" },
    { value: ServiceType.DEVELOPMENT, label: "Development", badge: "Only On Start-Up Plan" },
    // { value: ServiceType.OPERATION, label: "Operations" },
    { value: ServiceType.ADVISORY, label: "Consultancy" },
    // TODO: make the compiler complain if an option is mission
  ];

  const projectOptions = [
    { value: "apache", label: "Apache/Pekko" },
    { value: "slick", label: "Slick" },
    { value: "other", label: "Other" },
  ];

  const severityOptions = [
    { value: Priority.LOW, label: "Low" },
    { value: Priority.MEDIUM, label: "Medium" },
    { value: Priority.HIGH, label: "High" },
    { value: Priority.CRITICAL, label: "Critical" },
  ];

  // Update subcategory options when category changes
  useEffect(() => {
    if (selectedCategory) {
      // Use the helper function from service-types.ts to get subcategory options
      setSubCategoryOptions(getSubServiceOptions(selectedCategory));
    } else {
      setSubCategoryOptions([]);
    }

    // Reset subcategory when main category changes
    setSelectedSubCategory("");
  }, [selectedCategory]);

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, validator?: React.Dispatch<React.SetStateAction<boolean>>) => (value: string) => {
      setter(value);
      if (validator) {
        validator(value.trim() !== "");
      }
    };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    console.log("Selected category:", value); // Debug log
  };

  const handleSubCategoryChange = (value: string) => {
    setSelectedSubCategory(value);
  };

  const handleProjectChange = (value: string) => {
    setSelectedProject(value);
  };

  const handleSeverityChange = (value: string) => {
    setSelectedSeverity(value);
  };

  const handleSubmit = () => {
    setIsSubjectValid(subject.trim() !== "");
    setIsGithubUrlValid(githubUrl.trim() !== "");
    setIsGithubDiscussionUrlValid(githubDiscussionUrl.trim() !== "");

    if (subject.trim() && githubUrl.trim()) {
      // Handle form submission
      console.log({
        subject,
        githubUrl,
        selectedCategory,
        selectedSubCategory,
        selectedProject,
        selectedSeverity,
        isPublic,
      });
    }
  };

  return (
    <div>
      <Header />
      <h2 className="main-heading text-primary-user pt-12 sm:pt-14 md:pt-16">Support</h2>
      <div className="lg:!p-10 3xl:py-[42px] !p-4 !mx-4 !py-8 flex flex-col !gap-5 md:!gap-7 xl:!gap-9 3xl:!gap-12 justify-center items-center bg-primaryBg max-w-[1112px] xl:!mx-auto rounded-2xl xl:rounded-[25px] 3xl:!px-[55px] my-10 xl:my-16 3xl:my-[74px]">
        <h4 className="text-[22px] md:text-2xl xl:text-[30px] font-michroma text-white">Your request is about</h4>
        {/* Category Selection */}
        <form action="" onSubmit={e => e.preventDefault()} className="w-full flex flex-col !gap-3 xl:!gap-5 3xl:!gap-7">
          {" "}
          <div className="grid grid-cols-1 md:grid-cols-2 !gap-5 w-full">
            <SelectFilter
              ariaLabel="Select Category"
              placeholder="Select Category"
              labelValues={categoryOptions}
              onFilterChange={handleCategoryChange}
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
          </div>
          <FormEntry label="Subject">
            <BaseInput
              type="text"
              placeholder="Enter Title"
              value={subject}
              onChange={handleInputChange(setSubject, setIsSubjectValid)}
              isValid={isSubjectValid}
            />
          </FormEntry>
          <FormEntry label="GitHub discussion or issue url (optional)">
            <BaseInput
              type="text"
              placeholder="https://github.com/scala-native/scala-native/issues/3701"
              value={githubDiscussionUrl}
              onChange={handleInputChange(setGithubDiscussionUrl, setIsGithubDiscussionUrlValid)}
              isValid={isGithubDiscussionUrlValid}
            />
          </FormEntry>
          <div className="grid grid-cols-1 md:grid-cols-2 !gap-5 w-full">
            <SelectFilter
              ariaLabel="Select Project"
              placeholder="Select Project"
              labelValues={projectOptions}
              onFilterChange={handleProjectChange}
              label="Project"
            />
            <SelectFilter
              ariaLabel="Select Severity"
              placeholder="Select Severity"
              labelValues={severityOptions}
              onFilterChange={handleSeverityChange}
              label="Severity"
              isUpgraded={true}
            />
          </div>
          <FormEntry subLabel="We will do our best to find a maintainer for you" label="GitHub url">
            <BaseInput
              type="text"
              placeholder="https://github.com/scala-native/scala-native/issues/3701"
              value={githubUrl}
              onChange={handleInputChange(setGithubUrl, setIsGithubUrlValid)}
              isValid={isGithubUrlValid}
            />
          </FormEntry>
          <div className="w-full flex flex-col gap-3 justify-center items-center">
            <FormEntry label="Problem Description">
              <textarea
                className="w-full xl:min-h-[201px]  text-white outline-none montserrat rounded-xl bg-transparent !bg-[#202F45] text-sm md:text-base xl:text-lg placeholer:text-[#8693A4] p-3 md:!p-4 min-h-[100px]"
                cols={5}
                placeholder="Please Provide a detailed description of the problem"
              ></textarea>
            </FormEntry>
            <div className="mx-auto max-w-[557px] w-full">
              <div className="flex justify-between items-center h-full !max-h-[49px] w-full py-3 rounded-[10px] border px-[18px] !border-[rgba(255,255,255,0.30)]">
                <div className="flex items-center gap-1.5">
                  <PhoneIcon width={17} stroke="#FF518C" />
                  <span className="text-xs sm:text-sm md:text-base text-white">Request online meeting</span>
                </div>

                <ToggleSwitch onToggle={setIsPublic} bgSwitchColor="bg-[#FF518C]" />
              </div>
              <IsUpgraded position="!mt-2.5" />
            </div>
          </div>
          <FileUpload />
          <div className="flex items-center justify-center flex-wrap !gap-5 ">
            <Button
              audience="USER"
              level="SECONDARY"
              size="MEDIUM"
              parentClassName="w-full sm:w-fit"
              className="!capitalize w-full !font-semibold !text-base !font-montserrat"
            >
              Save for later
            </Button>
            <Button
              parentClassName="w-full sm:w-fit"
              audience="USER"
              level="PRIMARY"
              size="MEDIUM"
              className="!capitalize w-full !font-semibold !text-base !font-montserrat"
              onClick={handleSubmit}
            >
              Submit Support ticket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
