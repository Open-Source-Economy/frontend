import React, { useState } from "react";
import { ResponseTimeType } from "@open-source-economy/api-types/dist/model";
import { ResponseTimeTypeSelectInput } from "../../../../../components/form/select/enum/ResponseTimeTypeSelectInput";
import { OnboardingSectionWrapper } from "../../step4/OnboardingSectionWrapper";
import { TextArea } from "../../../../../components/form/TextArea";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export function Tooltip(props: TooltipProps) {
  return (
    <>
      <div className="relative inline-block group">
        {props.children}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
          {props.text}
        </div>
      </div>
    </>
  );
}

interface FirstResponseTimeSectionProps {
  value: ResponseTimeType | null;
  onChange: (value: ResponseTimeType | null) => void;
  commentValue: string;
  onCommentChange: (value: string) => void;
  error?: string;
}

// Unified Comment Icons
const CommentIcon = () => (
  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20 15.0017V25.0017M15 20.0017H25M20 35C22.9667 35 25.8668 34.1203 28.3336 32.4721C30.8003 30.8238 32.7229 28.4811 33.8582 25.7403C34.9935 22.9994 35.2906 19.9834 34.7118 17.0737C34.133 14.1639 32.7044 11.4912 30.6066 9.3934C28.5088 7.29562 25.8361 5.86701 22.9264 5.28823C20.0166 4.70945 17.0006 5.0065 14.2597 6.14181C11.5189 7.27713 9.17618 9.19972 7.52796 11.6665C5.87973 14.1332 5 17.0333 5 20C5 22.48 5.6 24.8167 6.66667 26.8783L5 35L13.1217 33.3333C15.1817 34.3983 17.5217 35 20 35Z"
      stroke="white"
      strokeWidth="1.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface UnifiedCommentSectionProps {
  show: boolean;
  onToggle: () => void;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  variant?: 'button' | 'inline';
}

export function UnifiedCommentSection(props: UnifiedCommentSectionProps) {
  const defaultLabel = "Comments";
  const defaultPlaceholder = "Comments (only visible to Open Source Economy team)";

  if (props.variant === 'button') {
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
      <button
        onClick={props.onToggle}
        className="bg-[#202f45] p-3 rounded-md hover:bg-[#2a3f56] h-full transition-colors"
        title="Add comment"
      >
        <CommentIcon />
      </button>

      {props.show && (
        <div className={`bg-[#202f45] box-border flex flex-col gap-3 p-4 rounded-md shrink-0 w-full ${props.className || ''}`}>
          <div className="flex flex-row items-center justify-between w-full">
            <div className="font-montserrat font-normal text-[#ffffff] text-[14px]">
              <p>{props.label || defaultLabel}</p>
            </div>
            <button
              onClick={props.onClose}
              className="text-[#ffffff] hover:text-[#ff7e4b] transition-colors"
              title="Close comment section"
            >
              <CloseIcon />
            </button>
          </div>
          <TextArea
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            placeholder={props.placeholder || defaultPlaceholder}
            rows={4}
            className="w-full bg-[#14233a] px-3 py-2 font-montserrat font-normal text-[#ffffff] text-[14px] rounded-md outline-none placeholder:opacity-60 resize-none"
          />
        </div>
      )}
    </>
  );
}

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
            <h2 className="self-stretch text-white font-montserrat text-2xl font-normal leading-[1.3]">
              {props.label || "Comments"}
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 self-stretch">
          <div className="text-white font-montserrat text-base font-normal leading-[1.5] opacity-60">
            Add any additional comments or context
          </div>

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

export function FirstResponseTimeSection(props: FirstResponseTimeSectionProps) {
  return (
    <>
      <OnboardingSectionWrapper
        title="First Response Time"
        subtitle="How quickly can you typically respond to initial client inquiries?"
        commentValue={props.commentValue}
        onCommentChange={props.onCommentChange}
        error={props.error}
      >
        {(showComment, commentButtonComponent) => (
          <div className="flex h-12 items-center gap-2 self-stretch">
            <ResponseTimeTypeSelectInput
              value={props.value}
              onChange={props.onChange}
              required={false}
            />
            {commentButtonComponent}
          </div>
        )}
      </OnboardingSectionWrapper>
    </>
  );
}
