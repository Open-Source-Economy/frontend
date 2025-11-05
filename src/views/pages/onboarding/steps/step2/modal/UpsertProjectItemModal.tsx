import React, { useEffect, useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { DeveloperProjectItemEntry, DeveloperRoleType, MergeRightsType, ProjectCategory, ProjectItemType } from "@open-source-economy/api-types";
import { getOnboardingBackendAPI } from "../../../../../../services";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { BrandModal, BrandModalSection } from "src/views/components/ui/brand-modal";
import { Button } from "src/views/components/ui/forms/button";
import { FormField } from "src/views/components/ui/forms/form-field";
import { SelectField } from "src/views/components/ui/forms/select-field";
import { Input } from "src/views/components/ui/forms/input";
import { ChipInput } from "src/views/components/ui/chip-input";
import { AlertCircle, ExternalLink, Github, ShieldCheck, User } from "lucide-react";
import { DeveloperRoleTypeCompanion, MergeRightsTypeCompanion, ProjectCategoryCompanion, SourceIdentifierCompanion } from "src/ultils/companions";
import { GithubUrls } from "src/ultils";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { InfoMessage } from "src/views/components/ui/info-message";

interface UpsertProjectItemModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  entry: DeveloperProjectItemEntry | null;
  onUpsert: (projectItem: DeveloperProjectItemEntry) => void;
}

const projectTypeOptions = [
  { value: ProjectItemType.GITHUB_REPOSITORY, label: "GitHub Repository" },
  { value: ProjectItemType.GITHUB_OWNER, label: "GitHub Organization" },
  { value: ProjectItemType.URL, label: "Other URL" },
];

// Convert DeveloperRoleType to select options
const roleOptions = Object.entries(DeveloperRoleType).map(([key, value]) => ({
  value: value,
  label: DeveloperRoleTypeCompanion.label(value as DeveloperRoleType),
}));

// Convert MergeRightsType to select options
const mergeRightsOptions = Object.entries(MergeRightsType).map(([key, value]) => ({
  value: value,
  label: MergeRightsTypeCompanion.label(value as MergeRightsType),
}));

export function UpsertProjectItemModal(props: UpsertProjectItemModalProps) {
  const api = getOnboardingBackendAPI();

  const [selectedProjectType, setSelectedProjectType] = useState<ProjectItemType | null>(props.entry?.projectItem.projectItemType || null);

  const [url, setUrl] = useState<string>("");

  const [selectedRole, setSelectedRole] = useState<DeveloperRoleType | null>(props.entry?.developerProjectItem.roles?.[0] || null);

  const [selectedMergeRights, setSelectedMergeRights] = useState<MergeRightsType | null>(props.entry?.developerProjectItem.mergeRights?.[0] || null);

  // Category states
  const [predefinedCategories, setPredefinedCategories] = useState<ProjectCategory[]>(props.entry?.developerProjectItem.predefinedCategories || []);
  const [customCategories, setCustomCategories] = useState<string[]>(props.entry?.developerProjectItem.customCategories || []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data from entry when modal opens
  useEffect(() => {
    if (props.show && props.entry) {
      // When editing, pre-populate all fields
      setSelectedProjectType(props.entry.projectItem.projectItemType);

      // Convert sourceIdentifier to URL
      const si = props.entry.projectItem.sourceIdentifier as any;
      if (typeof si === "object" && si.name && si.ownerId?.login) {
        setUrl(GithubUrls.generateRepositoryUrl(si));
      } else if (typeof si === "object" && si.login) {
        setUrl(GithubUrls.generateOwnerUrl(si));
      } else if (typeof si === "string") {
        setUrl(si);
      }

      setSelectedRole(props.entry.developerProjectItem.roles?.[0] || null);
      setSelectedMergeRights(props.entry.developerProjectItem.mergeRights?.[0] || null);
      setPredefinedCategories(props.entry.developerProjectItem.predefinedCategories || []);
      setCustomCategories(props.entry.developerProjectItem.customCategories || []);
    } else if (props.show && !props.entry) {
      // When adding new entry, start with just project type
      setSelectedProjectType(null);
      setUrl("");
      setSelectedRole(null);
      setSelectedMergeRights(null);
      setPredefinedCategories([]);
      setCustomCategories([]);
    }
    setErrors({});
    setError(null);
  }, [props.show, props.entry]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedProjectType) {
      newErrors.projectType = "Please select a project type";
    }

    if (!url?.trim()) {
      newErrors.url = "Project URL is required";
    } else {
      // Validate based on project type
      if (selectedProjectType === ProjectItemType.GITHUB_REPOSITORY) {
        const repo = GithubUrls.extractRepositoryId(url, true);
        if (!repo) {
          newErrors.url = "Enter a valid GitHub repository (owner/repo or https://github.com/owner/repo).";
        }
      } else if (selectedProjectType === ProjectItemType.GITHUB_OWNER) {
        const owner = GithubUrls.extractOwnerId(url, true);
        if (!owner) {
          newErrors.url = "Enter a valid GitHub organization/user (owner or https://github.com/owner).";
        }
      } else if (selectedProjectType === ProjectItemType.URL) {
        try {
          new URL(url);
        } catch {
          newErrors.url = "Please enter a valid URL.";
        }
      }
    }

    if (!selectedRole) {
      newErrors.role = "Please select your role";
    }

    if (!selectedMergeRights) {
      newErrors.mergeRights = "Please select merge rights";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    if (!selectedProjectType) {
      return;
    }

    const sourceIdentifier = SourceIdentifierCompanion.fromUrlOrShorthand(url);

    // Check if we're editing and the project identifier has changed
    const isEditingWithChangedProject =
      props.entry &&
      (selectedProjectType !== props.entry.projectItem.projectItemType ||
        !SourceIdentifierCompanion.equals(sourceIdentifier, props.entry.projectItem.sourceIdentifier));

    const apiCall = async () => {
      // If editing and the project identifier changed, delete the old entry first
      if (isEditingWithChangedProject && props.entry) {
        const deleteParams: dto.RemoveDeveloperProjectItemParams = {};
        const deleteBody: dto.RemoveDeveloperProjectItemBody = {
          developerProjectItemId: props.entry.developerProjectItem.id,
        };
        const deleteQuery: dto.RemoveDeveloperProjectItemQuery = {};
        await api.removeProjectItem(deleteParams, deleteBody, deleteQuery);
      }

      // Then create or update the project item
      const params: dto.UpsertDeveloperProjectItemParams = {};
      const body: dto.UpsertDeveloperProjectItemBody = {
        projectItemType: selectedProjectType,
        sourceIdentifier: sourceIdentifier,
        roles: selectedRole ? [selectedRole] : [],
        mergeRights: selectedMergeRights ? [selectedMergeRights] : [],
        customCategories: customCategories.length > 0 ? customCategories : undefined,
        predefinedCategories: predefinedCategories.length > 0 ? predefinedCategories : undefined,
      };
      const query: dto.UpsertDeveloperProjectItemQuery = {};
      return await api.upsertProjectItem(params, body, query);
    };

    const onSuccess = (response: dto.UpsertDeveloperProjectItemResponse) => {
      props.setShow(false);
      props.onUpsert({
        developerProjectItem: response.developerProjectItem,
        projectItem: response.projectItem,
      });
    };

    await handleApiCall(apiCall, setIsLoading, setError, onSuccess);
  };

  const handleFieldChange = (field: string, value: any) => {
    if (field === "projectType") setSelectedProjectType(value);
    if (field === "url") setUrl(value);
    if (field === "role") setSelectedRole(value);
    if (field === "mergeRights") setSelectedMergeRights(value);
    if (field === "categories") {
      // Value is an array of strings (mix of labels and custom text)
      const allCategories = value as string[];

      // Separate predefined (matching labels) from custom
      const predefined: ProjectCategory[] = [];
      const custom: string[] = [];

      allCategories.forEach(item => {
        // Try to find matching enum value
        const enumValue = Object.values(ProjectCategory).find(cat => ProjectCategoryCompanion.toLabel(cat) === item);

        if (enumValue) {
          predefined.push(enumValue);
        } else {
          custom.push(item);
        }
      });

      setPredefinedCategories(predefined);
      setCustomCategories(custom);
    }

    // Clear errors for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const getUrlLabel = () => {
    if (selectedProjectType === ProjectItemType.GITHUB_REPOSITORY) {
      return "GitHub Repository URL";
    } else if (selectedProjectType === ProjectItemType.GITHUB_OWNER) {
      return "GitHub Organization URL";
    }
    return "Project URL";
  };

  const getUrlPlaceholder = () => {
    if (selectedProjectType === ProjectItemType.GITHUB_REPOSITORY) {
      return "https://github.com/username/repository";
    } else if (selectedProjectType === ProjectItemType.GITHUB_OWNER) {
      return "https://github.com/organization";
    }
    return "https://...";
  };

  const getUrlHint = () => {
    if (selectedProjectType === ProjectItemType.GITHUB_REPOSITORY) {
      return "e.g., https://github.com/facebook/react";
    } else if (selectedProjectType === ProjectItemType.GITHUB_OWNER) {
      return "e.g., https://github.com/nodejs";
    }
    return "Any public URL to your project";
  };

  const mode = props.entry ? "edit" : "add";

  return (
    <BrandModal
      open={props.show}
      onClose={() => props.setShow(false)}
      title={mode === "add" ? "Add Open Source Project" : "Edit Project Information"}
      description={
        mode === "add"
          ? "Share details about an open source project where you actively contribute or maintain code."
          : "Update your project details to keep your profile accurate."
      }
      size="3xl"
      footer={
        <>
          <Button
            variant="outline"
            onClick={() => props.setShow(false)}
            className="border-brand-neutral-300 hover:bg-brand-secondary-dark text-brand-neutral-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-gradient-to-r from-brand-accent to-brand-highlight hover:from-brand-accent-dark hover:to-brand-highlight-dark text-white shadow-lg"
          >
            {isLoading ? "Saving..." : mode === "add" ? "Add Project" : "Save Changes"}
          </Button>
        </>
      }
    >
      <div className="space-y-8 py-2 pb-6">
        {/* Step 1: Project Information */}
        <BrandModalSection icon={<Github />} title="Project Information" description="Identify the project and provide a link" iconColor="accent">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Project Type */}
              <div className="md:col-span-1">
                <SelectField
                  label="Project Type"
                  required
                  options={projectTypeOptions}
                  value={selectedProjectType || ""}
                  onChange={value => handleFieldChange("projectType", value)}
                  error={errors.projectType}
                />
              </div>

              {/* Project URL - Only shown after type is selected */}
              {selectedProjectType && (
                <div className="md:col-span-2">
                  <FormField label={getUrlLabel()} required error={errors.url} hint={getUrlHint()}>
                    <div className="relative">
                      <Input
                        type="url"
                        value={url}
                        onChange={e => handleFieldChange("url", e.target.value)}
                        placeholder={getUrlPlaceholder()}
                        className="pr-10"
                        variant={errors.url ? "error" : "default"}
                      />
                      {url && (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-accent hover:text-brand-accent-dark transition-colors z-10"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </FormField>
                </div>
              )}
            </div>

            {/* Categories field - optional, multi-select */}
            {selectedProjectType && (
              <div>
                <FormField label="Categories" hint="Select from suggestions or type your own custom tags">
                  <ChipInput
                    values={[...predefinedCategories.map(category => ProjectCategoryCompanion.toLabel(category)), ...customCategories]}
                    onChange={allValues => handleFieldChange("categories", allValues)}
                    suggestions={Object.values(ProjectCategory)
                      .filter(category => !predefinedCategories.includes(category))
                      .map(category => ProjectCategoryCompanion.toLabel(category))}
                    placeholder="Type to search or add categories..."
                    allowCustom={true}
                    showCount
                    countLabel="category"
                  />
                </FormField>
              </div>
            )}
          </div>
        </BrandModalSection>

        {/* Step 2: Your Contribution */}
        {selectedProjectType && (
          <BrandModalSection icon={<User />} title="Your Contribution" description="Tell us about your role and permissions" iconColor="highlight">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Role */}
              <SelectField
                label="Your Role"
                required
                options={roleOptions}
                value={selectedRole || ""}
                onChange={value => handleFieldChange("role", value)}
                error={errors.role}
              />

              {/* Merge Rights */}
              <SelectField
                label="Merge Rights to Main Branch"
                required
                options={mergeRightsOptions}
                value={selectedMergeRights || ""}
                onChange={value => handleFieldChange("mergeRights", value)}
                error={errors.mergeRights}
              />
            </div>
          </BrandModalSection>
        )}

        {/*/!* Step 3: Verification Notice *!/*/}
        {/*{selectedProjectType && (*/}
        {/*  <BrandModalSection icon={<ShieldCheck />} title="Verification" description="How we'll confirm your contributions" iconColor="success">*/}
        {/*    <InfoMessage icon={AlertCircle} variant="success" title="Verification Process">*/}
        {/*      <p className="mb-3">*/}
        {/*        We'll verify your project contributions through your GitHub profile. Please ensure your GitHub contributions are set to public visibility for*/}
        {/*        successful verification.*/}
        {/*      </p>*/}
        {/*      <ul className="text-xs space-y-1 ml-4 list-disc">*/}
        {/*        <li>Verification typically takes 24-48 hours</li>*/}
        {/*        <li>You'll receive an email notification once verified</li>*/}
        {/*        <li>Public contributions are required for verification</li>*/}
        {/*      </ul>*/}
        {/*    </InfoMessage>*/}
        {/*  </BrandModalSection>*/}
        {/*)}*/}

        {/* API Error Display */}
        {error && <ServerErrorAlert error={error} variant="compact" />}
      </div>
    </BrandModal>
  );
}
