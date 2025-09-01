import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import * as dto from "@open-source-economy/api-types";
import { DeveloperProjectItemEntry, DeveloperRoleType, MergeRightsType, OwnerId, RepositoryId } from "@open-source-economy/api-types";
import { getOnboardingBackendAPI } from "../../../../../../../../services";
import { ApiError } from "../../../../../../../../ultils/error/ApiError";
import { handleApiCall } from "../../../../../../../../ultils";
import { GenericInputRef } from "../../../../../../../components/form";
import { ModalHeader } from "./components/ModalHeader";
import { ProjectSection } from "./components/ProjectSection";
import { ContributionSection } from "./components/ContributionSection";
import { ModalFooter } from "./components/ModalFooter";
import { ProjectItemType } from "../../ProjectItemType";

interface UpsertProjectItemModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  projectItem: DeveloperProjectItemEntry | null;
  onUpsert: (projectItem: DeveloperProjectItemEntry) => void;
}

export function UpsertProjectItemModal(props: UpsertProjectItemModalProps) {
  const api = getOnboardingBackendAPI();

  // Project type selection state
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectItemType | null>(null);

  // Project input states
  const [url, setUrl] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState<string | null>(null);
  const [selectedRepositories, setSelectedRepositories] = useState<string[]>([]);

  const [selectedRole, setSelectedRole] = useState<DeveloperRoleType | null>(
    props.projectItem && props.projectItem.developerProjectItem.roles && props.projectItem.developerProjectItem.roles.length > 0
      ? props.projectItem.developerProjectItem.roles[0]
      : null,
  );
  const [selectedMergeRights, setSelectedMergeRights] = useState<MergeRightsType | null>(
    props.projectItem && props.projectItem.developerProjectItem.mergeRights && props.projectItem.developerProjectItem.mergeRights.length > 0
      ? props.projectItem.developerProjectItem.mergeRights[0]
      : null,
  );

  // Refs for custom input components
  const projectTypeSelectRef = useRef<GenericInputRef>(null);
  const urlInputRef = useRef<GenericInputRef>(null);
  const organizationSelectRef = useRef<GenericInputRef>(null);
  const repositorySelectRef = useRef<GenericInputRef>(null);
  const roleSelectRef = useRef<GenericInputRef>(null);
  const mergeRightsSelectRef = useRef<GenericInputRef>(null);

  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpsertProject = async () => {
    // Validate inputs based on selected project type
    const isProjectTypeValid = projectTypeSelectRef.current?.validate(true) ?? false;
    const isRoleValid = roleSelectRef.current?.validate(true) ?? false;
    const isMergeRightsValid = mergeRightsSelectRef.current?.validate(true) ?? false;

    let isProjectInputValid = false;

    switch (selectedProjectType) {
      case ProjectItemType.URL:
        isProjectInputValid = urlInputRef.current?.validate(true) ?? false;
        break;
      case ProjectItemType.GITHUB_OWNER:
        isProjectInputValid = organizationSelectRef.current?.validate(true) ?? false;
        break;
      case ProjectItemType.GITHUB_REPOSITORY:
        isProjectInputValid = (organizationSelectRef.current?.validate(true) ?? false) && (repositorySelectRef.current?.validate(true) ?? false);
        break;
      default:
        isProjectInputValid = false;
    }

    if (!isProjectTypeValid || !isProjectInputValid || !isRoleValid || !isMergeRightsValid) {
      console.error("Please fill all required fields");
      return;
    }

    const apiCall = async () => {
      const params: dto.UpsertDeveloperProjectItemParams = {};

      let sourceIdentifier: OwnerId | RepositoryId | string;

      switch (selectedProjectType) {
        case ProjectItemType.URL:
          sourceIdentifier = url;
          break;
        case ProjectItemType.GITHUB_OWNER:
          // For organization, create an OwnerId
          if (selectedOrganization) {
            sourceIdentifier = new OwnerId(selectedOrganization);
          } else {
            throw new Error("Organization not selected");
          }
          break;
        case ProjectItemType.GITHUB_REPOSITORY:
          // For repositories, we would need to create RepositoryId instances
          // This is simplified for now - in a real implementation,
          // you'd need the full repository data including owner info
          if (selectedOrganization && selectedRepositories.length > 0) {
            const ownerIdForRepo = new OwnerId(selectedOrganization);
            sourceIdentifier = new RepositoryId(ownerIdForRepo, selectedRepositories[0]);
          } else {
            throw new Error("Repository selection incomplete");
          }
          break;
        default:
          throw new Error("Invalid project type selected");
      }

      const body: dto.UpsertDeveloperProjectItemBody = {
        projectItemType: selectedProjectType as any, // Cast to match API types
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
              selectedProjectType={selectedProjectType}
              onProjectTypeChange={setSelectedProjectType}
              projectTypeSelectRef={projectTypeSelectRef}
              url={url}
              onUrlChange={setUrl}
              urlInputRef={urlInputRef}
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
            <ModalFooter onSubmit={handleUpsertProject} isLoading={isLoading} buttonText={props.projectItem ? "Save Changes" : "Add Project"} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
