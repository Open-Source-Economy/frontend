import React from "react";

import { PageWrapper } from "src/views/v1/pages/PageWrapper";
import { VirtuousSection } from "./elements";
import { Services } from "src/views/v1/components/service/style2/Services";
import { H1WithSubtitle } from "../../../components/title/H1WithSubtitle";
import { ServiceType } from "@open-source-economy/api-types";
import { BookACallButton } from "../../../components/elements/BookACallButton";
import { Audience } from "../../../../Audience";
import { Button } from "../../../components";
import { Link } from "react-router-dom";
import { paths } from "../../../../../paths";

interface CompanyProductProps {}

export function CompanyProduct(props: CompanyProductProps) {
  const buttonPaths: { [key in ServiceType]?: string } = {
    [ServiceType.DEVELOPMENT]: paths.DASHBOARD,
    // [ServiceType.OPERATION]: paths.DASHBOARD,
    [ServiceType.ADVISORY]: paths.DASHBOARD,
    [ServiceType.SUPPORT]: paths.DASHBOARD,
    // TODO: make the compiler complain if an option is mission
  };

  return (
    <PageWrapper>
      <div className="overflow-hidden">
        <H1WithSubtitle
          title={
            <>
              <span className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] w-fit text-transparent bg-clip-text">Open Source</span>
              <br />
              From the Experts <br />
              Who Built It
            </>
          }
          subtitle="Need help with Open Source projects?"
          subSubtitle="We're the experts who build, debug, and maintain it"
        />
        <Services buttonPaths={buttonPaths} />

        <section className="max-w-[1164px] relative 3xl:max-w-[1376px] px-4 mx-auto">
          {" "}
          <h4 className="text-base sm:text-xl md:text-[22px] 3xl:text-[28px] opacity-80 border-t border-[#233959] w-full text-center pt-9">
            {/*Never get stuck again. Never fork again. Meet your deadline.*/}
            Eliminate bottlenecks. Accelerate delivery. Ensure success.
          </h4>
        </section>

        <section className="!px-4 relative flex flex-col">
          <div className="flex justify-center z-20 relative flex-wrap items-center !gap-4 !mt-7 md:!mt-12">
            <BookACallButton audience={Audience.USER} level={"SECONDARY"} className="hover:!text-white !text-primary-user !capitalize" />
            <Button audience="ALL" level="PRIMARY" size="LARGE" className="!capitalize" asChild>
              <Link to={paths.SIGN_UP}>Register</Link>
            </Button>
          </div>
        </section>

        <div className="mb-4 2xl:!mb-[100px] xl:!mb-[80px] lg:!mb-8 md:!mb-6 sm:!mb-8"></div>

        <VirtuousSection />
      </div>
    </PageWrapper>
  );
}
