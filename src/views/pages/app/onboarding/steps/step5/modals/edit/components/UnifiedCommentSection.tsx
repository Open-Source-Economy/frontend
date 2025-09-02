import React from "react";
import { TextArea } from "../../../../../../components/form/TextArea";
import { CommentIcon, CloseIcon } from "./CommentIcons";

interface UnifiedCommentSectionProps {
  show: boolean;
  onToggle: () => void;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  variant?: "button" | "inline";
}

export function UnifiedCommentSection(props: UnifiedCommentSectionProps) {
  const defaultLabel = "Comments";
  const defaultPlaceholder = "Comments (only visible to Open Source Economy team)";

  if (props.variant === "button") {
    // Compact button version for use in OnboardingSectionWrapper
    if (!props.show) {
      return (
        <>
          <button
            onClick={props.onToggle}
            className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
            title="Add comment"
            aria-label="Add comment"
          >
            <CommentIcon />
          </button>
        </>
      );
    }

    return (
      <>
        <div className="self-stretch">
          <TextArea
            value={props.value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(e.target.value)}
            placeholder={props.placeholder || defaultPlaceholder}
            rows={3}
            className="w-full"
          />
        </div>
      </>
    );
  }

  // Full section version
  return (
    <>
      <button onClick={props.onToggle} className="bg-[#202f45] p-3 rounded-md hover:bg-[#2a3f56] h-full transition-colors" title="Add comment">
        <CommentIcon />
      </button>

      {props.show && (
        <div className={`bg-[#202f45] box-border flex flex-col gap-3 p-4 rounded-md shrink-0 w-full ${props.className || ""}`}>
          <div className="flex flex-row items-center justify-between w-full">
            <div className="font-montserrat font-normal text-[#ffffff] text-[14px]">
              <p>{props.label || defaultLabel}</p>
            </div>
            <button onClick={props.onClose} className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors" title="Close comment section">
              <CloseIcon />
            </button>
          </div>
          <TextArea
            value={props.value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(e.target.value)}
            placeholder={props.placeholder || defaultPlaceholder}
            rows={4}
            className="w-full bg-[#14233a] px-3 py-2 font-montserrat font-normal text-[#ffffff] text-[14px] rounded-md outline-none placeholder:opacity-60 resize-none"
          />
        </div>
      )}
    </>
  );
}
