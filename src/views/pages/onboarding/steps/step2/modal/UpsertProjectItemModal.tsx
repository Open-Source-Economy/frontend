import React, { useEffect, useMemo, useState } from "react";
import * as dto from "@open-source-economy/api-types";
import {
  DeveloperProjectItemEntry,
  DeveloperRoleType,
  MergeRightsType,
  ProjectCategory,
  ProjectItemType,
} from "@open-source-economy/api-types";
import { onboardingHooks } from "src/api";
import { ApiError } from "src/ultils/error/ApiError";
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
import { useZodForm } from "src/views/components/ui/forms/rhf";
import {
  upsertProjectItemSchema,
  type UpsertProjectItemFormData as _UpsertProjectItemFormData,
} from "src/views/components/ui/forms/schemas";

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
  customCategories: string[]
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
  const upsertProjectItem = onboardingHooks.useUpsertProjectItemMutation();
  const removeProjectItem = onboardingHooks.useRemoveProjectItemMutation();

  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkUrls, setBulkUrls] = useState("");
  const [bulkErrors, setBulkErrors] = useState<string | undefined>();

  // Category states (not in RHF since they're optional arrays with custom UI)
  const [predefinedCategories, setPredefinedCategories] = useState<ProjectCategory[]>(
    props.entry?.developerProjectItem.predefinedCategories || []
  );
  const [customCategories, setCustomCategories] = useState<string[]>(
    props.entry?.developerProjectItem.customCategories || []
  );

  const form = useZodForm(upsertProjectItemSchema, {
    defaultValues: {
      projectType: props.entry?.projectItem.projectItemType || "",
      url: "",
      role: props.entry?.developerProjectItem.roles?.[0] || "",
      mergeRights: props.entry?.developerProjectItem.mergeRights?.[0] || "",
    },
  });

  const selectedProjectType = form.watch("projectType") as ProjectItemType | "";
  const url = form.watch("url");

  const mutationError = upsertProjectItem.error || removeProjectItem.error;
  const error = mutationError
    ? mutationError instanceof ApiError
      ? mutationError
      : ApiError.from(mutationError)
    : null;
  const isLoading = upsertProjectItem.isPending || removeProjectItem.isPending;

  // Memoize validation result to avoid recalculating on every render
  const bulkValidationResult = useMemo(() => {
    if (!isBulkMode || !bulkUrls.trim() || !selectedProjectType) {
      return null;
    }
    return BulkProjectUrlParser.validateBulkUrls(
      bulkUrls,
      selectedProjectType as ProjectItemType,
      props.existingProjects || [],
      props.entry,
      false
    );
  }, [isBulkMode, bulkUrls, selectedProjectType, props.existingProjects, props.entry]);

  // Initialize form data from entry when modal opens
  useEffect(() => {
    if (props.show && props.entry) {
      form.setValue("projectType", props.entry.projectItem.projectItemType);

      // Convert sourceIdentifier to URL
      const si = props.entry.projectItem.sourceIdentifier as any;
      if (typeof si === "object" && si.name && si.ownerId?.login) {
        form.setValue("url", GithubUrls.generateRepositoryUrl(si));
      } else if (typeof si === "object" && si.login) {
        form.setValue("url", GithubUrls.generateOwnerUrl(si));
      } else if (typeof si === "string") {
        form.setValue("url", si);
      }

      form.setValue("role", props.entry.developerProjectItem.roles?.[0] || "");
      form.setValue("mergeRights", props.entry.developerProjectItem.mergeRights?.[0] || "");
      setPredefinedCategories(props.entry.developerProjectItem.predefinedCategories || []);
      setCustomCategories(props.entry.developerProjectItem.customCategories || []);
    } else if (props.show && !props.entry) {
      form.reset({ projectType: "", url: "", role: "", mergeRights: "" });
      setPredefinedCategories([]);
      setCustomCategories([]);
    }
    // Reset bulk mode when modal opens/closes
    if (props.show) {
      setIsBulkMode(false);
      setBulkUrls("");
      setBulkErrors(undefined);
    }
    form.clearErrors();
    upsertProjectItem.reset();
    removeProjectItem.reset();
  }, [props.show, props.entry]);

  const validateUrlForType = (): string | undefined => {
    const urlValue = form.getValues("url");
    const projectType = form.getValues("projectType") as ProjectItemType;

    if (!urlValue?.trim()) return "Project URL is required";

    if (projectType === ProjectItemType.GITHUB_REPOSITORY) {
      const repo = GithubUrls.extractRepositoryId(urlValue, true);
      if (!repo) return "Enter a valid GitHub repository (owner/repo or https://github.com/owner/repo).";
    } else if (projectType === ProjectItemType.GITHUB_OWNER) {
      const owner = GithubUrls.extractOwnerId(urlValue, true);
      if (!owner) return "Enter a valid GitHub organization/user (owner or https://github.com/owner).";
    } else if (projectType === ProjectItemType.URL) {
      try {
        new URL(urlValue);
      } catch {
        return "Please enter a valid URL.";
      }
    }

    // Check for conflicts with existing projects
    const existingProjects = props.existingProjects || [];
    const sourceIdentifier = SourceIdentifierCompanion.fromUrlOrShorthand(urlValue);
    const existingSourceIdentifiers = existingProjects
      .filter((existing) => {
        if (
          props.entry &&
          SourceIdentifierCompanion.equals(
            existing.projectItem.sourceIdentifier,
            props.entry.projectItem.sourceIdentifier
          ) &&
          existing.projectItem.projectItemType === props.entry.projectItem.projectItemType
        ) {
          return false;
        }
        return existing.projectItem.projectItemType === projectType;
      })
      .map((existing) => existing.projectItem.sourceIdentifier);

    const conflictingSourceIdentifiers = SourceIdentifierCompanion.findIncludedUrls(
      [sourceIdentifier],
      existingSourceIdentifiers
    );
    if (conflictingSourceIdentifiers.length > 0) {
      const displayName = SourceIdentifierCompanion.displayName(conflictingSourceIdentifiers[0]);
      return `This project already exists: ${displayName}. Please edit the existing entry or choose a different project.`;
    }

    return undefined;
  };

  const validateBulkForm = (): {
    valid: boolean;
    projects: Array<{ sourceIdentifier: dto.SourceIdentifier; projectType: ProjectItemType }>;
  } => {
    let hasErrors = false;

    // Validate shared fields via RHF
    const roleValue = form.getValues("role");
    const mergeRightsValue = form.getValues("mergeRights");
    const projectTypeValue = form.getValues("projectType");

    if (!roleValue) {
      form.setError("role", { message: "Please select a role for all projects" });
      hasErrors = true;
    }
    if (!mergeRightsValue) {
      form.setError("mergeRights", { message: "Please select merge rights for all projects" });
      hasErrors = true;
    }
    if (!projectTypeValue) {
      form.setError("projectType", { message: "Please select a project type for all projects" });
      return { valid: false, projects: [] };
    }

    if (!bulkValidationResult) {
      setBulkErrors("Please enter at least one project URL");
      return { valid: false, projects: [] };
    }

    if (bulkValidationResult.validProjects.length === 0 && bulkValidationResult.errors.length === 0) {
      setBulkErrors("Please enter at least one project URL");
      return { valid: false, projects: [] };
    }

    if (bulkValidationResult.errors.length > 0) {
      setBulkErrors(BulkProjectUrlParser.formatValidationErrors(bulkValidationResult.errors, 3));
      hasErrors = true;
    }

    return { valid: !hasErrors, projects: bulkValidationResult.validProjects };
  };

  const handleSave = async () => {
    if (isBulkMode) {
      handleBulkSave();
      return;
    }

    // Trigger RHF validation for base fields
    const isValid = await form.trigger();
    if (!isValid) return;

    // Additional URL validation (type-specific + conflict check)
    const urlError = validateUrlForType();
    if (urlError) {
      form.setError("url", { message: urlError });
      return;
    }

    const projectType = form.getValues("projectType") as ProjectItemType;
    const urlValue = form.getValues("url");
    const sourceIdentifier = SourceIdentifierCompanion.fromUrlOrShorthand(urlValue);

    // Check if we're editing and the project identifier has changed
    const isEditingWithChangedProject =
      props.entry &&
      (projectType !== props.entry.projectItem.projectItemType ||
        !SourceIdentifierCompanion.equals(sourceIdentifier, props.entry.projectItem.sourceIdentifier));

    try {
      // If editing and the project identifier changed, delete the old entry first
      if (isEditingWithChangedProject && props.entry) {
        const deleteParams: dto.RemoveDeveloperProjectItemParams = {};
        const deleteBody: dto.RemoveDeveloperProjectItemBody = {
          developerProjectItemId: props.entry.developerProjectItem.id,
        };
        const deleteQuery: dto.RemoveDeveloperProjectItemQuery = {};
        await removeProjectItem.mutateAsync({ params: deleteParams, body: deleteBody, query: deleteQuery });
      }

      const roleValue = form.getValues("role") as DeveloperRoleType;
      const mergeRightsValue = form.getValues("mergeRights") as MergeRightsType;

      const params: dto.UpsertDeveloperProjectItemParams = {};
      const body: dto.UpsertDeveloperProjectItemBody = {
        projectItems: [
          createProjectItemData(
            sourceIdentifier,
            projectType,
            roleValue,
            mergeRightsValue,
            predefinedCategories,
            customCategories
          ),
        ],
      };
      const query: dto.UpsertDeveloperProjectItemQuery = {};
      const response = await upsertProjectItem.mutateAsync({ params, body, query });

      props.setShow(false);
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        props.onUpsert({
          developerProjectItem: {
            ...result.developerProjectItem,
            customCategories: result.developerProjectItem.customCategories || [],
            predefinedCategories: result.developerProjectItem.predefinedCategories || [],
          },
          projectItem: result.projectItem,
        });
      }
    } catch {
      // error tracked by mutation.error
    }
  };

  const handleBulkSave = async () => {
    const { valid, projects } = validateBulkForm();
    if (!valid || projects.length === 0) {
      return;
    }

    const roleValue = form.getValues("role") as DeveloperRoleType;
    const mergeRightsValue = form.getValues("mergeRights") as MergeRightsType;

    const projectItems: dto.ProjectItemData[] = projects.map((projectData) =>
      createProjectItemData(
        projectData.sourceIdentifier,
        projectData.projectType,
        roleValue,
        mergeRightsValue,
        predefinedCategories,
        customCategories
      )
    );

    try {
      const params: dto.UpsertDeveloperProjectItemParams = {};
      const body: dto.UpsertDeveloperProjectItemBody = {
        projectItems: projectItems,
      };
      const query: dto.UpsertDeveloperProjectItemQuery = {};
      const response = await upsertProjectItem.mutateAsync({ params, body, query });

      props.setShow(false);
      if (response.results && response.results.length > 0) {
        response.results.forEach((result) => {
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
    } catch {
      // error tracked by mutation.error
    }
  };

  const formErrors = form.formState.errors;
  const urlConfig = getUrlConfig(selectedProjectType as ProjectItemType | null);
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
            disabled={
              isLoading ||
              (isBulkMode &&
                (!!bulkErrors || !!formErrors.role || !!formErrors.mergeRights || !!formErrors.projectType))
            }
            className="bg-gradient-to-r from-brand-accent to-brand-highlight hover:from-brand-accent-dark hover:to-brand-highlight-dark text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : mode === "add" ? (isBulkMode ? "Add Projects" : "Add Project") : "Save Changes"}
          </Button>
        </>
      }
    >
      <div className="space-y-8 py-2 pb-6">
        {/* Step 1: Your Contribution */}
        <BrandModalSection
          icon={<User />}
          title="Your Contribution"
          description={"Tell us about your role and permissions"}
          iconColor="highlight"
        >
          <RoleAndMergeRightsFields
            isBulkMode={isBulkMode}
            selectedRole={(form.watch("role") as DeveloperRoleType) || null}
            selectedMergeRights={(form.watch("mergeRights") as MergeRightsType) || null}
            onRoleChange={(role) => {
              form.setValue("role", role || "", { shouldValidate: form.formState.isSubmitted });
            }}
            onMergeRightsChange={(mergeRights) => {
              form.setValue("mergeRights", mergeRights || "", { shouldValidate: form.formState.isSubmitted });
            }}
            roleError={formErrors.role?.message}
            mergeRightsError={formErrors.mergeRights?.message}
          />
        </BrandModalSection>

        {/* Step 2: Project Information */}
        <BrandModalSection
          icon={<Github />}
          title="Project Information"
          description={
            isBulkMode
              ? "Paste URLs for all projects where you have this role"
              : "Identify the project and provide a link"
          }
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
                    onChange={(value) => {
                      form.setValue("projectType", value, { shouldValidate: form.formState.isSubmitted });
                    }}
                    error={formErrors.projectType?.message}
                  />
                </div>

                {/* Project URL - Only shown after type is selected */}
                {selectedProjectType && (
                  <div className="md:col-span-2">
                    <ProjectUrlInput
                      projectType={selectedProjectType as ProjectItemType}
                      value={url}
                      onChange={(value) => {
                        form.setValue("url", value, { shouldValidate: form.formState.isSubmitted });
                      }}
                      error={formErrors.url?.message}
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
                  onChange={(value) => {
                    form.setValue("projectType", value, { shouldValidate: form.formState.isSubmitted });
                  }}
                  error={formErrors.projectType?.message}
                />
              </div>

              {/* Only show bulk URL input after type is selected */}
              {selectedProjectType && (
                <>
                  {/* Bulk URL Input */}
                  <FormField
                    label="Project URLs"
                    required
                    error={bulkErrors ? { error: bulkErrors } : undefined}
                    hint={urlConfig.bulkHint}
                  >
                    <Textarea
                      value={bulkUrls}
                      onChange={(e) => {
                        setBulkUrls(e.target.value);
                        setBulkErrors(undefined);
                      }}
                      placeholder={urlConfig.bulkPlaceholder}
                      rows={8}
                      variant={bulkErrors ? "error" : "default"}
                      className="font-mono text-sm"
                    />
                  </FormField>

                  {/* Parsed Projects Preview */}
                  {bulkValidationResult && (
                    <BulkProjectsPreview
                      validationResult={bulkValidationResult}
                      selectedProjectType={selectedProjectType as ProjectItemType}
                    />
                  )}

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
          <BrandModalSection
            icon={<ShieldCheck />}
            title="Verification"
            description="How we'll confirm your contributions"
            iconColor="success"
          >
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
