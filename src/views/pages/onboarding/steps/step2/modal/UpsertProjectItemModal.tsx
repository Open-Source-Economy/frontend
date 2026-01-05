import React, { useEffect, useMemo, useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { DeveloperProjectItemEntry, DeveloperRoleType, MergeRightsType, ProjectCategory, ProjectItemType } from "@open-source-economy/api-types";
import { getOnboardingBackendAPI } from "../../../../../../services";
import { ApiError } from "../../../../../../ultils/error/ApiError";
import { handleApiCall } from "../../../../../../ultils";
import { BrandModal, BrandModalAlert, BrandModalSection } from "src/views/components/ui/brand-modal";
import { Button } from "src/views/components/ui/forms/button";
import { FormField } from "src/views/components/ui/forms/form-field";
import { SelectField } from "src/views/components/ui/forms/select/select-field";
import { Textarea } from "src/views/components/ui/forms/textarea";
import { AlertCircle, Github, ShieldCheck, User } from "lucide-react";
import { SourceIdentifierCompanion } from "src/ultils/companions";
import { GithubUrls } from "src/ultils";
import { BulkProjectUrlParser } from "src/ultils/BulkProjectUrlParser";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { isVisible } from "src/ultils/featureVisibility";
import { BulkProjectsPreview } from "./BulkProjectsPreview";
import { CategoryInput } from "./components/CategoryInput";
import { ProjectUrlInput } from "./components/ProjectUrlInput";
import { ModeToggle } from "./components/ModeToggle";
import { RoleAndMergeRightsFields } from "./components/RoleAndMergeRightsFields";
import { getUrlConfig } from "./utils/urlHelpers";

interface UpsertProjectItemModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  entry: DeveloperProjectItemEntry | null;
  onUpsert: (projectItem: DeveloperProjectItemEntry) => void;
  existingProjects?: DeveloperProjectItemEntry[]; // Existing projects to check for conflicts
}

const projectTypeOptions = [
  { value: ProjectItemType.GITHUB_REPOSITORY, label: "GitHub Repository" },
  { value: ProjectItemType.GITHUB_OWNER, label: "GitHub Organization" },
  { value: ProjectItemType.URL, label: "Other URL" },
];

const createProjectItemData = (
  sourceIdentifier: dto.SourceIdentifier,
  projectType: ProjectItemType,
  role: DeveloperRoleType | null,
  mergeRights: MergeRightsType | null,
  predefinedCategories: ProjectCategory[],
  customCategories: string[],
): dto.ProjectItemData => {
  return {
    projectItemType: projectType,
    sourceIdentifier: sourceIdentifier,
    roles: role ? [role] : [],
    mergeRights: mergeRights ? [mergeRights] : [],
    comments: undefined,
    customCategories: customCategories.length > 0 ? customCategories : undefined,
    predefinedCategories: predefinedCategories.length > 0 ? predefinedCategories : undefined,
  };
};

export function UpsertProjectItemModal(props: UpsertProjectItemModalProps) {
  const api = getOnboardingBackendAPI();

  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkUrls, setBulkUrls] = useState("");

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

  // Memoize validation result to avoid recalculating on every render
  const bulkValidationResult = useMemo(() => {
    if (!isBulkMode || !bulkUrls.trim() || !selectedProjectType) {
      return null;
    }
    return BulkProjectUrlParser.validateBulkUrls(bulkUrls, selectedProjectType, props.existingProjects || [], props.entry, false);
  }, [isBulkMode, bulkUrls, selectedProjectType, props.existingProjects, props.entry]);

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
    // Reset bulk mode when modal opens/closes
    if (props.show) {
      setIsBulkMode(false);
      setBulkUrls("");
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

    // Check for conflicts with existing projects (if editing, exclude the current entry)
    if (url && selectedProjectType && Object.keys(newErrors).length === 0) {
      const existingProjects = props.existingProjects || [];
      const sourceIdentifier = SourceIdentifierCompanion.fromUrlOrShorthand(url);

      // Filter existing projects by type and exclude the entry being edited
      const existingSourceIdentifiers = existingProjects
        .filter(existing => {
          if (
            props.entry &&
            SourceIdentifierCompanion.equals(existing.projectItem.sourceIdentifier, props.entry.projectItem.sourceIdentifier) &&
            existing.projectItem.projectItemType === props.entry.projectItem.projectItemType
          ) {
            return false;
          }
          return existing.projectItem.projectItemType === selectedProjectType;
        })
        .map(existing => existing.projectItem.sourceIdentifier);

      const conflictingSourceIdentifiers = SourceIdentifierCompanion.findIncludedUrls([sourceIdentifier], existingSourceIdentifiers);

      if (conflictingSourceIdentifiers.length > 0) {
        const displayName = SourceIdentifierCompanion.displayName(conflictingSourceIdentifiers[0]);
        newErrors.url = `This project already exists: ${displayName}. Please edit the existing entry or choose a different project.`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBulkForm = (): { valid: boolean; projects: Array<{ sourceIdentifier: dto.SourceIdentifier; projectType: ProjectItemType }> } => {
    const newErrors: Record<string, string> = {};

    // Validate shared fields
    if (!selectedRole) {
      newErrors.role = "Please select a role for all projects";
    }

    if (!selectedMergeRights) {
      newErrors.mergeRights = "Please select merge rights for all projects";
    }

    if (!selectedProjectType) {
      newErrors.projectType = "Please select a project type for all projects";
      setErrors(newErrors);
      return { valid: false, projects: [] };
    }

    // Use memoized validation result
    if (!bulkValidationResult) {
      newErrors.bulkUrls = "Please enter at least one project URL";
      setErrors(newErrors);
      return { valid: false, projects: [] };
    }

    // Check if there are any projects at all
    if (bulkValidationResult.validProjects.length === 0 && bulkValidationResult.errors.length === 0) {
      newErrors.bulkUrls = "Please enter at least one project URL";
      setErrors(newErrors);
      return { valid: false, projects: [] };
    }

    // Format errors into error message string
    if (bulkValidationResult.errors.length > 0) {
      newErrors.bulkUrls = BulkProjectUrlParser.formatValidationErrors(bulkValidationResult.errors, 3);
    }

    const projects = bulkValidationResult.validProjects;

    setErrors(newErrors);
    return { valid: Object.keys(newErrors).length === 0, projects };
  };

  const handleSave = async () => {
    if (isBulkMode) {
      handleBulkSave();
      return;
    }

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

      // Then create or update the project item (single item as array of 1)
      const params: dto.UpsertDeveloperProjectItemParams = {};
      const body: dto.UpsertDeveloperProjectItemBody = {
        projectItems: [
          createProjectItemData(sourceIdentifier, selectedProjectType!, selectedRole, selectedMergeRights, predefinedCategories, customCategories),
        ],
      };
      const query: dto.UpsertDeveloperProjectItemQuery = {};
      return await api.upsertProjectItem(params, body, query);
    };

    const onSuccess = (response: dto.UpsertDeveloperProjectItemResponse) => {
      props.setShow(false);
      // Response now returns results array, get first item for single mode
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        // Ensure we create a new object reference with all properties including categories
        props.onUpsert({
          developerProjectItem: {
            ...result.developerProjectItem,
            customCategories: result.developerProjectItem.customCategories || [],
            predefinedCategories: result.developerProjectItem.predefinedCategories || [],
          },
          projectItem: result.projectItem,
        });
      }
    };

    await handleApiCall(apiCall, setIsLoading, setError, onSuccess);
  };

  const handleBulkSave = async () => {
    const { valid, projects } = validateBulkForm();
    if (!valid || projects.length === 0) {
      return;
    }

    // Convert projects to ProjectItemData format
    const projectItems: dto.ProjectItemData[] = projects.map(projectData =>
      createProjectItemData(projectData.sourceIdentifier, projectData.projectType, selectedRole, selectedMergeRights, predefinedCategories, customCategories),
    );

    const apiCall = async () => {
      const params: dto.UpsertDeveloperProjectItemParams = {};
      const body: dto.UpsertDeveloperProjectItemBody = {
        projectItems: projectItems,
      };
      const query: dto.UpsertDeveloperProjectItemQuery = {};
      return await api.upsertProjectItem(params, body, query);
    };

    const onSuccess = (response: dto.UpsertDeveloperProjectItemResponse) => {
      props.setShow(false);
      // Call onUpsert for each result
      if (response.results && response.results.length > 0) {
        response.results.forEach(result => {
          // Ensure we create a new object reference with all properties including categories
          props.onUpsert({
            developerProjectItem: {
              ...result.developerProjectItem,
              customCategories: result.developerProjectItem.customCategories || [],
              predefinedCategories: result.developerProjectItem.predefinedCategories || [],
            },
            projectItem: result.projectItem,
          });
        });
      }
    };

    await handleApiCall(apiCall, setIsLoading, setError, onSuccess);
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const { [field]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const urlConfig = getUrlConfig(selectedProjectType);

  const mode = props.entry ? "edit" : "add";

  return (
    <BrandModal
      open={props.show}
      onClose={() => props.setShow(false)}
      title={mode === "add" ? "Add Open Source Projects" : "Edit Project Information"}
      description={
        mode === "add"
          ? "Share details about open source projects where you actively contribute or maintain code."
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
            disabled={isLoading || (isBulkMode && (!!errors.bulkUrls || !!errors.role || !!errors.mergeRights || !!errors.projectType))}
            className="bg-gradient-to-r from-brand-accent to-brand-highlight hover:from-brand-accent-dark hover:to-brand-highlight-dark text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : mode === "add" ? (isBulkMode ? "Add Projects" : "Add Project") : "Save Changes"}
          </Button>
        </>
      }
    >
      <div className="space-y-8 py-2 pb-6">
        {/* Step 1: Your Contribution */}
        <BrandModalSection icon={<User />} title="Your Contribution" description={"Tell us about your role and permissions"} iconColor="highlight">
          <RoleAndMergeRightsFields
            isBulkMode={isBulkMode}
            selectedRole={selectedRole}
            selectedMergeRights={selectedMergeRights}
            onRoleChange={role => {
              setSelectedRole(role);
              clearError("role");
            }}
            onMergeRightsChange={mergeRights => {
              setSelectedMergeRights(mergeRights);
              clearError("mergeRights");
            }}
            roleError={errors.role}
            mergeRightsError={errors.mergeRights}
          />
        </BrandModalSection>

        {/* Step 2: Project Information */}
        <BrandModalSection
          icon={<Github />}
          title="Project Information"
          description={isBulkMode ? "Paste URLs for all projects where you have this role" : "Identify the project and provide a link"}
          iconColor="accent"
        >
          {/* Mode Toggle - Only show in Add mode */}
          {mode === "add" && <ModeToggle isBulkMode={isBulkMode} onModeChange={setIsBulkMode} />}

          {!isBulkMode ? (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Project Type */}
                <div className="md:col-span-1">
                  <SelectField
                    label="Project Type"
                    required
                    options={projectTypeOptions}
                    value={selectedProjectType || ""}
                    onChange={value => {
                      setSelectedProjectType(value as ProjectItemType);
                      clearError("projectType");
                    }}
                    error={errors.projectType}
                  />
                </div>

                {/* Project URL - Only shown after type is selected */}
                {selectedProjectType && (
                  <div className="md:col-span-2">
                    <ProjectUrlInput
                      projectType={selectedProjectType}
                      value={url}
                      onChange={value => {
                        setUrl(value);
                        clearError("url");
                      }}
                      error={errors.url}
                    />
                  </div>
                )}
              </div>

              {/* Categories field - optional, multi-select */}
              {selectedProjectType && (
                <CategoryInput
                  key={`category-input-${props.entry?.developerProjectItem.id.uuid || "new"}`}
                  predefinedCategories={predefinedCategories}
                  customCategories={customCategories}
                  onChange={(predefined, custom) => {
                    setPredefinedCategories(predefined);
                    setCustomCategories(custom);
                  }}
                />
              )}
            </div>
          ) : (
            <div className="space-y-5">
              {/* Project Type - Required first */}
              <div className="md:w-1/3">
                <SelectField
                  label="Project Type (for all projects)"
                  required
                  options={projectTypeOptions}
                  value={selectedProjectType || ""}
                  onChange={value => {
                    setSelectedProjectType(value as ProjectItemType);
                    clearError("projectType");
                  }}
                  error={errors.projectType}
                />
              </div>

              {/* Only show bulk URL input after type is selected */}
              {selectedProjectType && (
                <>
                  {/* Bulk URL Input */}
                  <FormField label="Project URLs" required error={errors.bulkUrls ? { error: errors.bulkUrls } : undefined} hint={urlConfig.bulkHint}>
                    <Textarea
                      value={bulkUrls}
                      onChange={e => {
                        setBulkUrls(e.target.value);
                        clearError("bulkUrls");
                      }}
                      placeholder={urlConfig.bulkPlaceholder}
                      rows={8}
                      variant={errors.bulkUrls ? "error" : "default"}
                      className="font-mono text-sm"
                    />
                  </FormField>

                  {/* Parsed Projects Preview - Shows both valid and invalid projects */}
                  {bulkValidationResult && <BulkProjectsPreview validationResult={bulkValidationResult} selectedProjectType={selectedProjectType} />}

                  {/* Shared Categories */}
                  <CategoryInput
                    key="category-input-bulk"
                    predefinedCategories={predefinedCategories}
                    customCategories={customCategories}
                    onChange={(predefined, custom) => {
                      setPredefinedCategories(predefined);
                      setCustomCategories(custom);
                    }}
                    label="Shared Categories (Optional)"
                    hint="These categories will be applied to all projects."
                  />
                </>
              )}
            </div>
          )}
        </BrandModalSection>

        {/* Step 3: Verification Notice - Only visible in local environment */}
        {isVisible("projectVerificationNotice") && ((!isBulkMode && selectedProjectType) || isBulkMode) && (
          <BrandModalSection icon={<ShieldCheck />} title="Verification" description="How we'll confirm your contributions" iconColor="success">
            <BrandModalAlert type="success" icon={<AlertCircle />} title="Verification Process">
              <p className="mb-3">
                {isBulkMode
                  ? "We'll verify your contributions to all projects through your GitHub profile. Please ensure your GitHub contributions are set to public visibility for successful verification."
                  : "We'll verify your project contributions through your GitHub profile. Please ensure your GitHub contributions are set to public visibility for successful verification."}
              </p>
              <ul className="text-xs space-y-1 ml-4 list-disc">
                <li>Verification typically takes 24-48 hours</li>
                <li>You'll receive an email notification once verified</li>
                <li>Public contributions are required for verification</li>
                {isBulkMode && <li>All projects will be verified individually</li>}
              </ul>
            </BrandModalAlert>
          </BrandModalSection>
        )}

        {/* API Error Display */}
        {error && <ServerErrorAlert error={error} variant="compact" />}
      </div>
    </BrandModal>
  );
}
