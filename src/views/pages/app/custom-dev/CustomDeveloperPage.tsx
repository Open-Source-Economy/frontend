// CustomDeveloperPage.tsx
import React from "react";
import { PageWrapper } from "../../PageWrapper";
import NoBsCards from "src/components/custom-dev/NoBsCards";
import TheFuture from "src/components/custom-dev/TheFuture";
import CustomDevHero from "src/components/common/CustomDevHero";
import deving from "../../../../assets/deving.png";

const CustomDeveloperPage: React.FC = () => {
  return (
    <PageWrapper>
      <CustomDevHero className="group-text-bg" imgPath={deving} heading="As an open source dev, are you experiencing...." headingClassName="max-w-[800px]" />
      <NoBsCards />
      <TheFuture />
    </PageWrapper>
  );
};

export default CustomDeveloperPage;
