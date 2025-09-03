import React, { useRef, useState, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import * as dto from "@open-source-economy/api-types";
import { DeveloperProjectItemEntry, DeveloperRoleType, MergeRightsType, OwnerId, RepositoryId, SourceIdentifier } from "@open-source-economy/api-types";
import { getOnboardingBackendAPI } from "../../../../../../../../services";
import { ApiError } from "../../../../../../../../ultils/error/ApiError";
import { handleApiCall } from "../../../../../../../../ultils";
import { GenericInputRef } from "../../../../../../../components/form";
import { ModalHeader } from "./components/ModalHeader";
import { ProjectSection, ProjectSectionRef } from "./components/ProjectSection";
import { ContributionSection } from "./components/ContributionSection";
import { ModalFooter } from "./components/ModalFooter";
import { ProjectItemType } from "../../ProjectItemType";

interface UpsertProjectItemModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  entry: DeveloperProjectItemEntry | null;
  onUpsert: (projectItem: DeveloperProjectItemEntry) => void;
}

export function UpsertProjectItemModal(props: UpsertProjectItemModalProps) {
  const api = getOnboardingBackendAPI();

  const [projectItemData, setProjectItemData] = useState<[ProjectItemType, SourceIdentifier] | null>(null);

  // Contribution-related states
  const [selectedRole, setSelectedRole] = useState<DeveloperRoleType | null>(
    props.entry && props.entry.developerProjectItem.roles && props.entry.developerProjectItem.roles.length > 0
      ? props.entry.developerProjectItem.roles[0]
      : null,
  );
  const [selectedMergeRights, setSelectedMergeRights] = useState<MergeRightsType | null>(
    props.entry && props.entry.developerProjectItem.mergeRights && props.entry.developerProjectItem.mergeRights.length > 0
      ? props.entry.developerProjectItem.mergeRights[0]
      : null,
  );

  // Refs for custom input components
  const projectSectionRef = useRef<ProjectSectionRef>(null);
  const roleSelectRef = useRef<GenericInputRef>(null);
  const mergeRightsSelectRef = useRef<GenericInputRef>(null);

  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

    const apiCall = async () => {
      const params: dto.UpsertDeveloperProjectItemParams = {};

      const body: dto.UpsertDeveloperProjectItemBody = {
        projectItemType: projectItemType,
        sourceIdentifier: sourceIdentifier,
        roles: selectedRole ? [selectedRole] : [],
        mergeRights: selectedMergeRights ? [selectedMergeRights] : [],
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

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.setShow(false)}
        centered
        className="[&_.modal-content]:bg-transparent [&_.modal-content]:border-none [&_.modal-dialog]:max-w-[800px] [&_.modal-backdrop]:bg-black/50"
        backdrop="static"
      >
        <Modal.Body className="p-0">
          <div className="flex w-[800px] p-9 flex-col justify-end items-end gap-8 rounded-[50px] bg-[#0E1F35]">
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
            {error && <div className="self-stretch text-red-400 text-sm font-montserrat">API Error: {error.message}</div>}

            {/* Footer Button */}
            <ModalFooter onSubmit={handleUpsertProject} isLoading={isLoading} buttonText={props.entry ? "Save Changes" : "Add Project"} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
