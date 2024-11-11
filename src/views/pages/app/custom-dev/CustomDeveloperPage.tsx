import React from "react";
import { PageWrapper } from "../../PageWrapper";
import CustomDevHero from "src/components/custom-dev/CustomDevHero";
import NoBsCards from "src/components/custom-dev/NoBsCards";
import TheFuture from "src/components/custom-dev/TheFuture";

const CustomDeveloperPage = () => {
  return (
    <>
      <PageWrapper>
        <CustomDevHero />
        <NoBsCards />
        <TheFuture />
      </PageWrapper>
    </>
  );
};

export default CustomDeveloperPage;
