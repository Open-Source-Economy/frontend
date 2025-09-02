import React from "react";
import { ResponseTimeType } from "@open-source-economy/api-types/dist/model";
import { ResponseTimeTypeSelectInput } from "../../../../../components/form/select/enum/ResponseTimeTypeSelectInput";
import { OnboardingSectionWrapper } from "../../step4/OnboardingSectionWrapper";

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
