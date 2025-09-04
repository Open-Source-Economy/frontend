import React, { ReactNode, useState } from "react";
import { CommentInput } from "./CommentInput";

interface OnboardingSectionWrapperProps {
  title: string;
  subtitle?: string;
  children: (showComment: boolean, commentButtonComponent: ReactNode) => ReactNode;
  commentValue: string;
  onCommentChange: (value: string) => void;
}

export function OnboardingSectionWrapper(props: OnboardingSectionWrapperProps) {
  const [showComment, setShowComment] = useState(false);

  const commentButtonComponent = (
    <CommentInput isExpanded={false} onToggle={() => setShowComment(!showComment)} value={props.commentValue} onChange={props.onCommentChange} />
  );

  return (
    <div className="flex flex-col justify-end items-end gap-2.5 self-stretch p-9 rounded-[30px] bg-primaryBg">
      {/* Title Section */}
      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <h2 className="self-stretch text-white font-montserrat text-2xl font-normal leading-[1.3]">{props.title}</h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-start gap-3 self-stretch">
        {/* Subtitle */}
        {props.subtitle && <div className="text-white font-montserrat text-base font-normal leading-[1.5] opacity-60">{props.subtitle}</div>}

        {/* Main Content - passed as children render prop with comment button */}
        {props.children(showComment, commentButtonComponent)}

        {/* Expanded Comment Section - Full width below inputs */}
        {showComment && (
          <div className="flex min-h-12 items-start gap-2 self-stretch rounded-md bg-[#202F45] p-3 relative">
            <textarea
              value={props.commentValue}
              onChange={e => props.onCommentChange(e.target.value)}
              placeholder="Comments (only visible to Open Source Economy team)"
              className="w-full bg-transparent text-white font-montserrat text-base font-normal leading-[150%] outline-none placeholder:text-white placeholder:opacity-60 border-none resize-y"
              style={{
                minHeight: "24px",
                overflow: "auto",
              }}
              rows={1}
            />
            {/* Custom resize handle - positioned like in Figma */}
            <div className="absolute bottom-2 right-2 opacity-20 pointer-events-none">
              <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L1 1" stroke="white" strokeLinecap="round" />
                <path d="M4 6L1 3" stroke="white" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
