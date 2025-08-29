import React from "react";
import Modal from "react-bootstrap/Modal";
import { DeveloperProjectItemEntry } from "@open-source-economy/api-types";
import { ProjectItemId } from "@open-source-economy/api-types/dist/model";
import { ProjectItemIdCompanion } from "../../../../../data";

interface DeleteProjectModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  project: DeveloperProjectItemEntry | null;
  onConfirmDelete: (projectId: ProjectItemId) => void;
  isDeleting: boolean;
}

export function DeleteProjectModal(props: DeleteProjectModalProps) {
  const handleDelete = () => {
    if (props.project) {
      props.onConfirmDelete(props.project.developerProjectItem.id);
    }
  };

  const handleCancel = () => {
    props.setShow(false);
  };

  if (!props.project) return null;

  return (
    <>
      <Modal
        show={props.show}
        onHide={handleCancel}
        centered
        className="[&_.modal-content]:bg-transparent [&_.modal-content]:border-none [&_.modal-dialog]:max-w-[600px] [&_.modal-backdrop]:bg-black/60"
        backdrop="static"
      >
        <Modal.Body className="p-0">
          <div className="flex w-[600px] p-12 flex-col justify-center items-center gap-12 rounded-[50px] bg-[#0E1F35]">
            {/* Section Title */}
            <div className="flex flex-col items-center gap-1 self-stretch">
              <div className="flex flex-col items-start gap-4 self-stretch">
                <div className="flex justify-center items-center gap-2.5 self-stretch">
                  <div className="flex-1 text-white text-center font-michroma text-[28px] font-normal leading-[130%]">
                    Remove Project
                  </div>
                </div>
                <div className="self-stretch text-white text-center font-montserrat text-lg font-normal leading-[150%] opacity-60">
                  Are you sure you want to delete this item?
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="text-white text-center font-montserrat text-base font-normal">
              <strong>{ProjectItemIdCompanion.displayName(props.project.projectItem.sourceIdentifier)}</strong>
            </div>

            {/* Buttons */}
            <div className="flex items-start gap-6">
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                disabled={props.isDeleting}
                className="flex justify-center items-center gap-2.5 rounded-md border border-white px-5 py-3 hover:bg-white hover:bg-opacity-10 transition-colors disabled:opacity-50"
              >
                <div className="text-white font-michroma text-base font-normal leading-[150%]">
                  Cancel
                </div>
              </button>

              {/* Delete Button */}
              <button
                onClick={handleDelete}
                disabled={props.isDeleting}
                className="flex justify-center items-center gap-2.5 rounded-md px-5 py-3 bg-[#FF7E4B] hover:bg-[#e6703f] transition-colors disabled:opacity-50"
              >
                <div className="text-white font-michroma text-base font-normal leading-[150%]">
                  {props.isDeleting ? "Deleting..." : "Delete"}
                </div>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
