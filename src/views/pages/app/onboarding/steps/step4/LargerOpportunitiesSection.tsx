import React from "react";
import { OpportunitySelector } from "./OpportunitySelector";
import { OnboardingSectionWrapper } from "./OnboardingSectionWrapper";
import { OpenToOtherOpportunityType } from "@open-source-economy/api-types";

interface LargerOpportunitiesSectionProps {
  value: OpenToOtherOpportunityType | null;
  onChange: (value: OpenToOtherOpportunityType) => void;
  commentValue: string;
  onCommentChange: (value: string) => void;
  error?: string;
}

export function LargerOpportunitiesSection(props: LargerOpportunitiesSectionProps) {
  return (
    <OnboardingSectionWrapper
      title="Larger Opportunities"
      commentValue={props.commentValue}
      onCommentChange={props.onCommentChange}
      error={props.error}
    >
      {(showComment, commentButtonComponent) => (
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
            {commentButtonComponent}
          </div>
        </div>
      )}
    </OnboardingSectionWrapper>
  );
}
