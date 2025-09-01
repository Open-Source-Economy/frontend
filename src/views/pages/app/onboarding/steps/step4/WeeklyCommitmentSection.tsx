import React, { useState } from "react";
import { WeeklyCommitmentInput } from "./WeeklyCommitmentInput";
import { CommentInput } from "./CommentInput";

interface WeeklyCommitmentSectionProps {
  value: number | null | undefined;
  onChange: (value: number | undefined) => void;
  commentValue: string;
  onCommentChange: (value: string) => void;
  error?: string;
}

export function WeeklyCommitmentSection(props: WeeklyCommitmentSectionProps) {
  const [showComment, setShowComment] = useState(false);

  return (
    <div className="flex flex-col justify-end items-end gap-2.5 self-stretch p-9 rounded-[30px] bg-primaryBg">
      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <h2 className="self-stretch text-white font-montserrat text-2xl font-normal leading-[1.3]">
            Your Weekly Commitment
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 self-stretch">
        <div className="text-white font-montserrat text-base font-normal leading-[1.5] opacity-60">
          How many hours per week, on average, can you dedicate to client services?
        </div>
        <div className="flex items-center gap-2.5 self-stretch">
          <WeeklyCommitmentInput
            value={props.value}
            onChange={props.onChange}
            error={props.error}
          />
          <CommentInput
            isExpanded={showComment}
            onToggle={() => setShowComment(!showComment)}
            value={props.commentValue}
            onChange={props.onCommentChange}
          />
        </div>
        {props.error && <div className="text-red-400 text-sm">{props.error}</div>}
      </div>
    </div>
  );
}
