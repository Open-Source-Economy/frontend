import React from "react";

import { PageWrapper } from "src/views/pages/PageWrapper";
import { OpenSourceExpertTitle } from "src/views/pages/app/projects/elements";
import { VirtuousSection } from "./elements";
import { Services } from "src/views/components/service/style2/Services";

interface CompanyProductProps {}

export function CompanyProduct(props: CompanyProductProps) {
  return (
    <PageWrapper>
      <div className="overflow-hidden">
        <OpenSourceExpertTitle />
        <Services />
        <VirtuousSection />
      </div>
    </PageWrapper>
  );
}
