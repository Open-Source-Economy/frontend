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
        <OpportunitySelector
          id="larger-opportunities"
          label="Should Open Source Economy team privately contact you when a major opportunity arises?"
          value={props.value}
          onChange={props.onChange}
          required={true}
          commentButton={commentButtonComponent}
        />
      )}
    </OnboardingSectionWrapper>
  );
}
