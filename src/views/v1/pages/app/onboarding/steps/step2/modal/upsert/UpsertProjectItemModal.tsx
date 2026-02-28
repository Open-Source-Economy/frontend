import { useCallback, useRef, useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { Dialog, DialogContent } from "src/views/components/ui/dialog";
import { DeveloperProjectItemEntry, DeveloperRoleType, MergeRightsType } from "@open-source-economy/api-types";
import { SourceIdentifier } from "src/utils/local-types";
import { GenericInputRef } from "../../../../../../../components/form";
import { ModalHeader } from "./components/ModalHeader";
import { ProjectSection, ProjectSectionRef } from "./components/ProjectSection";
import { ContributionSection } from "./components/ContributionSection";
import { ModalFooter } from "./components/ModalFooter";
import { ProjectItemType } from "../../ProjectItemType";
import { onboardingHooks } from "src/api";

interface UpsertProjectItemModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  entry: DeveloperProjectItemEntry | null;
  onUpsert: (projectItem: DeveloperProjectItemEntry) => void;
}

export function UpsertProjectItemModal(props: UpsertProjectItemModalProps) {
  const upsertProjectItemMutation = onboardingHooks.useUpsertProjectItemMutation();

  const [projectItemData, setProjectItemData] = useState<[ProjectItemType, SourceIdentifier] | null>(null);

  // Contribution-related states
  const [selectedRole, setSelectedRole] = useState<DeveloperRoleType | null>(
    props.entry && props.entry.developerProjectItem.roles && props.entry.developerProjectItem.roles.length > 0
      ? props.entry.developerProjectItem.roles[0]
      : null
  );
  const [selectedMergeRights, setSelectedMergeRights] = useState<MergeRightsType | null>(
    props.entry &&
      props.entry.developerProjectItem.mergeRights &&
      props.entry.developerProjectItem.mergeRights.length > 0
      ? props.entry.developerProjectItem.mergeRights[0]
      : null
  );

  // Refs for custom input components
  const projectSectionRef = useRef<ProjectSectionRef>(null);
  const roleSelectRef = useRef<GenericInputRef>(null);
  const mergeRightsSelectRef = useRef<GenericInputRef>(null);

  // Use useCallback to memoize this function.
  const handleProjectItemChange = useCallback((data: [ProjectItemType, SourceIdentifier] | null) => {
    setProjectItemData(data);
  }, []);

  const handleUpsertProject = async () => {
    // Call the validate method on the projectSectionRef
    const isProjectSectionValid = projectSectionRef.current?.validate(true) ?? false;
    const isRoleValid = roleSelectRef.current?.validate(true) ?? false;
    const isMergeRightsValid = mergeRightsSelectRef.current?.validate(true) ?? false;

    if (!isProjectSectionValid || !isRoleValid || !isMergeRightsValid) {
      console.error("Please fill all required fields");
      return;
    }

    if (!projectItemData) {
      console.error("Project data is missing.");
      return;
    }

    const [projectItemType, sourceIdentifier] = projectItemData;

    try {
      const params: dto.UpsertDeveloperProjectItemParams = {};
      const body: dto.UpsertDeveloperProjectItemBody = {
        projectItems: [
          {
            projectItemType: projectItemType,
            sourceIdentifier:
              typeof sourceIdentifier === "string"
                ? sourceIdentifier
                : "name" in sourceIdentifier
                  ? `${(sourceIdentifier as dto.RepositoryId).ownerId.login}/${(sourceIdentifier as dto.RepositoryId).name}`
                  : (sourceIdentifier as dto.OwnerId).login,
            roles: selectedRole ? [selectedRole] : [],
            mergeRights: selectedMergeRights ? [selectedMergeRights] : [],
          },
        ],
      };
      const query: dto.UpsertDeveloperProjectItemQuery = {};

      const response = await upsertProjectItemMutation.mutateAsync({ params, body, query });

      props.setShow(false);
      // Response now returns results array, get first item
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        props.onUpsert({
          developerProjectItem: result.developerProjectItem,
          projectItem: result.projectItem,
        });
      }
    } catch {
      // error tracked by upsertProjectItemMutation.error
    }
  };

  return (
    <Dialog open={props.show} onOpenChange={(open) => !open && props.setShow(false)}>
      <DialogContent
        className="bg-transparent border-none max-w-[800px] p-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex w-full max-w-[800px] p-9 flex-col justify-end items-end gap-8 rounded-[50px] bg-[#0E1F35]">
          {/* Modal Header */}
          <ModalHeader
            title="Choose Project"
            subtitle="You can choose an entire organisation or a specific repository in an organisation"
            onClose={() => props.setShow(false)}
          />

          {/* Project Section */}
          <ProjectSection
            projectItemType={props.entry ? props.entry.projectItem.projectItemType : null}
            sourceIdentifier={props.entry ? props.entry.projectItem.sourceIdentifier : null}
            onProjectItemChange={handleProjectItemChange}
            ref={projectSectionRef}
          />

          {/* Contribution Section */}
          <ContributionSection
            selectedRole={selectedRole}
            selectedMergeRights={selectedMergeRights}
            onRoleChange={setSelectedRole}
            onMergeRightsChange={setSelectedMergeRights}
            roleSelectRef={roleSelectRef}
            mergeRightsSelectRef={mergeRightsSelectRef}
          />

          {/* Error Display */}
          {upsertProjectItemMutation.error && (
            <div className="self-stretch text-red-400 text-sm font-montserrat">
              API Error: {upsertProjectItemMutation.error.message}
            </div>
          )}

          {/* Footer Button */}
          <ModalFooter
            onSubmit={handleUpsertProject}
            isLoading={upsertProjectItemMutation.isPending}
            buttonText={props.entry ? "Save Changes" : "Add Project"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
