// CustomDeveloperPage.tsx
import React from "react";
import { PageWrapper } from "../../PageWrapper";
import TheFuture from "src/components/custom-dev/TheFuture";
import CustomDevHero from "src/components/common/CustomDevHero";
import deving from "../../../../assets/deving-2.webp";
import NoBsUser from "src/components/custom-dev/NoBsUser";

const UserPage: React.FC = () => {
  return (
    <PageWrapper>
      <CustomDevHero className="group-text-user-bg" imgPath={deving} heading="Does using open source give you a headache?" headingClassName="max-w-[1000px]" />
      <NoBsUser />
      <TheFuture />
    </PageWrapper>
  );
};

export default UserPage;
