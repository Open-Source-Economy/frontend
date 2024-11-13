// CustomDeveloperPage.tsx
import React from "react";
import { PageWrapper } from "../../PageWrapper";
import TheFuture from "src/components/custom-dev/TheFuture";
import CustomDevHero from "src/components/common/CustomDevHero";
import deving from "../../../../assets/deving-2.webp";
import NoBsUser from "src/components/custom-dev/NoBsUser";
import headache from "../../../../assets/headache-bg.webp";
import bg_img from "../../../../assets/group-text-user-bg.png";

const UserPage: React.FC = () => {
  return (
    <PageWrapper>
      <div className="relative overflow-hidden">
        <img className="absolute lg:-right-[25%] -right-1/2 -top-0 max-w-[1190px] opacity-[0.3] pointer-events-none -z-10" src={headache} alt="headache" />
        <CustomDevHero
          bgImgPath={bg_img}
          className="absolute -top-[20%] h-[100%] w-full -z-10 pointer-events-none"
          imgPath={deving}
          heading="Does using open source give you a headache?"
          headingClassName="max-w-[1000px]"
        />
        <NoBsUser />
      </div>
      <TheFuture />
    </PageWrapper>
  );
};

export default UserPage;
