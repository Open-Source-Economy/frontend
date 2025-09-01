import React, { useState } from "react";
import { OpportunitySelector } from "./OpportunitySelector";
import { CommentInput } from "./CommentInput";
import { OpenToOtherOpportunityType } from "@open-source-economy/api-types";

interface LargerOpportunitiesSectionProps {
  value: OpenToOtherOpportunityType | null;
  onChange: (value: OpenToOtherOpportunityType) => void;
  commentValue: string;
  onCommentChange: (value: string) => void;
  error?: string;
}

export function LargerOpportunitiesSection(props: LargerOpportunitiesSectionProps) {
  const [showComment, setShowComment] = useState(false);

  return (
    <div className="flex flex-col justify-end items-end gap-2.5 self-stretch p-9 rounded-[30px] bg-primaryBg">
      <div className="flex flex-col items-center gap-1 self-stretch">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <h2 className="self-stretch text-white font-montserrat text-2xl font-normal leading-[1.3]">
            Larger Opportunities
          </h2>
        </div>
      </div>

      <div className="flex flex-col justify-end items-start gap-4 self-stretch">
        <div className="flex flex-col justify-end items-start gap-4 self-stretch">
          <OpportunitySelector
            id="larger-opportunities"
            label="Should Open Source Economy team privately contact you when a major opportunity arises?"
            value={props.value}
            onChange={props.onChange}
            required={true}
          />
          <div className="flex items-center gap-8 self-stretch">
            <div className="flex-1" />
            <CommentInput
              isExpanded={showComment}
              onToggle={() => setShowComment(!showComment)}
              value={props.commentValue}
              onChange={props.onCommentChange}
            />
          </div>
        </div>
        {props.error && <div className="text-red-400 text-sm">{props.error}</div>}
      </div>
    </div>
  );
}
