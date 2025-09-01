import React, { ReactNode, useState } from "react";
import { CommentInput } from "./CommentInput";

interface OnboardingSectionWrapperProps {
  title: string;
  subtitle?: string;
  children: (showComment: boolean, commentInputComponent: ReactNode) => ReactNode;
  commentValue: string;
  onCommentChange: (value: string) => void;
  error?: string;
}

export function OnboardingSectionWrapper(props: OnboardingSectionWrapperProps) {
  const [showComment, setShowComment] = useState(false);

  const commentInputComponent = (
    <CommentInput
      isExpanded={showComment}
      onToggle={() => setShowComment(!showComment)}
      value={props.commentValue}
      onChange={props.onCommentChange}
    />
  );

  return (
    <div className="flex flex-col justify-end items-end gap-2.5 self-stretch p-9 rounded-[30px] bg-primaryBg">
      {/* Title Section */}
      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <h2 className="self-stretch text-white font-montserrat text-2xl font-normal leading-[1.3]">
            {props.title}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-start gap-3 self-stretch">
        {/* Subtitle */}
        {props.subtitle && (
          <div className="text-white font-montserrat text-base font-normal leading-[1.5] opacity-60">
            {props.subtitle}
          </div>
        )}
        
        {/* Main Content - passed as children render prop */}
        {props.children(showComment, commentInputComponent)}
        
        {/* Error Display */}
        {props.error && <div className="text-red-400 text-sm">{props.error}</div>}
      </div>
    </div>
  );
}
