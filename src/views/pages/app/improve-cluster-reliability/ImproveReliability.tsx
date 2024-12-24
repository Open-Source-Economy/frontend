import React from "react";
import Hero from "./Hero";
import { BaseURL } from "src/App";
import { PageWrapper } from "../../PageWrapper";
import WhyDoWeNeedYourHelp from "./WhyDoWeNeedYourHelp";
import UseOfFunds from "./UseOfFunds";
import WhyTrustUs from "./WhyTrustUs";
import AQuestion from "./AQuestion";
import FundingCampaign from "./FundingCampaign";
interface ImproveReliabilityProps {}
export function ImproveReliability(props: ImproveReliabilityProps) {
  return (
    <>
      <PageWrapper baseURL={BaseURL.APP}>
        <Hero />
        <FundingCampaign />
        <AQuestion />
        <WhyDoWeNeedYourHelp />
        <UseOfFunds />
        <WhyTrustUs />
      </PageWrapper>
    </>
  );
}
