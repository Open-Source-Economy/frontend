import React from "react";
import { WeeklyCommitmentInput } from "./WeeklyCommitmentInput";
import { OnboardingSectionWrapper } from "./OnboardingSectionWrapper";

interface WeeklyCommitmentSectionProps {
  value: number | null | undefined;
  onChange: (value: number | undefined) => void;
  commentValue: string;
  onCommentChange: (value: string) => void;
  error?: string;
}

export function WeeklyCommitmentSection(props: WeeklyCommitmentSectionProps) {
  return (
    <OnboardingSectionWrapper
      title="Your Weekly Commitment"
      subtitle="How many hours per week, on average, can you dedicate to client services?"
      commentValue={props.commentValue}
      onCommentChange={props.onCommentChange}
      error={props.error}
    >
      {(showComment, commentButtonComponent) => (
        <div className="flex items-center gap-2.5 self-stretch">
          <WeeklyCommitmentInput value={props.value} onChange={props.onChange} error={props.error} />
          {commentButtonComponent}
        </div>
      )}
    </OnboardingSectionWrapper>
  );
}
