// CustomDeveloperPage.tsx
import React from "react";
import { PageWrapper } from "../../PageWrapper";
import NoBsCards from "src/components/custom-dev/NoBsCards";
import TheFuture from "src/components/custom-dev/TheFuture";
import CustomDevHero from "src/components/common/CustomDevHero";
import deving from "../../../../assets/deving.png";
import bg_img from "../../../../assets/group-text.png";

const CustomDeveloperPage: React.FC = () => {
  return (
    <PageWrapper>
      <CustomDevHero
        bgImgPath={bg_img}
        className="absolute -top-[5%] h-[110%] w-full -z-10 pointer-events-none"
        imgPath={deving}
        heading="As an open source dev. are you experiencing...."
        headingClassName="max-w-[800px]"
      />
      <NoBsCards />
      <TheFuture />
    </PageWrapper>
  );
};

export default CustomDeveloperPage;
