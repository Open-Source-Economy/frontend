import React from "react";
import { PageWrapper } from "../../PageWrapper";
import CustomDevHero from "src/components/custom-dev/CustomDevHero";
import NoBsCards from "src/components/custom-dev/NoBsCards";

const CustomDeveloperPage = () => {
  return (
    <>
      <PageWrapper>
        <CustomDevHero />
        <NoBsCards />
      </PageWrapper>
    </>
  );
};

export default CustomDeveloperPage;
