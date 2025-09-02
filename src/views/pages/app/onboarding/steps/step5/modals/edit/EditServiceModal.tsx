import React, { useState } from "react";
import { ResponseTimeType } from "@open-source-economy/api-types/dist/model";
import { Tooltip, CommentSection, FirstResponseTimeSection, UnifiedCommentSection } from "./components";

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  responseTime: ResponseTimeType | null;
  onResponseTimeChange: (value: ResponseTimeType | null) => void;
  commentValue: string;
  onCommentChange: (value: string) => void;
}

export function EditServiceModal(props: EditServiceModalProps) {
  const [responseTimeComment, setResponseTimeComment] = useState("");

  if (!props.isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Edit Service</h2>
            <button onClick={props.onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close modal">
              ×
            </button>
          </div>

          <div className="space-y-6">
            <FirstResponseTimeSection
              value={props.responseTime}
              onChange={props.onResponseTimeChange}
              commentValue={responseTimeComment}
              onCommentChange={setResponseTimeComment}
            />

            <CommentSection
              commentValue={props.commentValue}
              onCommentChange={props.onCommentChange}
              label="Additional Comments"
              placeholder="Add any additional comments about this service"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={props.onClose} className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-100">
              Cancel
            </button>
            <button onClick={props.onClose} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Re-export components for external use if needed
export { Tooltip, CommentSection, FirstResponseTimeSection, UnifiedCommentSection };
