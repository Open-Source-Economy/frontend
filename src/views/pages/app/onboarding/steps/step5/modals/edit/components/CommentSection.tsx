import React, { useState } from "react";
import { UnifiedCommentSection } from "./UnifiedCommentSection";

interface CommentSectionProps {
  commentValue: string;
  onCommentChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function CommentSection(props: CommentSectionProps) {
  const [showComment, setShowComment] = useState(false);

  const handleToggle = () => {
    setShowComment(!showComment);
  };

  const handleClose = () => {
    setShowComment(false);
  };

  return (
    <>
      <div className="flex flex-col justify-end items-end gap-2.5 self-stretch p-9 rounded-[30px] bg-primaryBg">
        <div className="flex flex-col items-center gap-1 self-stretch">
          <div className="flex flex-col items-start gap-4 self-stretch">
            <h2 className="self-stretch text-white font-montserrat text-2xl font-normal leading-[1.3]">{props.label || "Comments"}</h2>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 self-stretch">
          <div className="text-white font-montserrat text-base font-normal leading-[1.5] opacity-60">Add any additional comments or context</div>

          <div className="flex items-center gap-2 self-stretch">
            <UnifiedCommentSection
              show={showComment}
              onToggle={handleToggle}
              onClose={handleClose}
              value={props.commentValue}
              onChange={props.onCommentChange}
              label={props.label}
              placeholder={props.placeholder}
              variant="inline"
            />
          </div>
        </div>
      </div>
    </>
  );
}
