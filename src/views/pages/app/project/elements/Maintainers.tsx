import React, { useEffect } from "react";
import { ParticipantCard } from "./ParticipantCard";
import offerLeftLinear from "src/assets/offer-linear.webp";
import rightLinear from "src/assets/right-linear-bg.webp";
import faq from "src/assets/faq-bg.webp";
import { Button } from "src/components";
import { useMaintainers } from "../../../../hooks";
import { RepositoryId } from "src/model";

interface MaintainersProps {
  repositoryId: RepositoryId;
  viewAllButton?: boolean;
}

export function Maintainers(props: MaintainersProps) {
  const { maintainers, isLoading, error, reloadMaintainers } = useMaintainers(props.repositoryId);

  useEffect(() => {
    reloadMaintainers();
  }, []);

  return (
    <section className="pb-20 3xl:pb-40 pt-16 relative">
      <img
        src={rightLinear}
        alt="right linear Background"
        className="absolute pointer-events-none object-cover right-0 max-w-[671px] opacity-80 -z-10 -top-[15%]"
      />
      <img
        src={faq}
        alt="linear Background"
        className="absolute pointer-events-none object-cover -translate-x-1/2 left-1/2 w-full max-h-[850px] -z-10  max-w-[780px] h-full bottom-0"
      />
      <img
        src={offerLeftLinear}
        alt="Linear background"
        className="absolute max-w-[670px] w-full -z-10 pointer-events-none left-[-10%] opacity-70 -top-[15%] xl:-top-[26%] "
      />

      <div className="xl:max-w-[98%] 1400:max-w-[90%] 1500:max-w-[84%] 3xl:!max-w-[1560px] !px-4 xl:!px-0  mx-auto text-center">
        {/* Title */}
        <h2 className="section-heading mx-auto lg:!pb-6 3xl:!pb-8 w-fit relative mb-10 md:mb-14">
          Who is Participating?
          <span className="absolute w-[50%] h-1 3xl:h-[6px] hidden lg:inline left-1/2 -translate-x-1/2  bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] bottom-0"></span>
        </h2>

        {/* Participants List */}
        <div className="flex justify-center  flex-wrap gap-14 sm:gap-8 2xl:justify-between">
          {maintainers.map((maintainer, index) => (
            <ParticipantCard maintainer={maintainer} key={index} />
          ))}
        </div>

        {/* View All Button */}
        {props.viewAllButton && (
          <div className="relative flex justify-center items-center !mt-7 xl:!mt-14 2xl:!mt-16 3xl:!mt-20">
            <Button audience="ALL" className="cursor-pointer" level="SECONDARY" size="LARGE" asChild>
              <span> View All</span>
            </Button>
          </div>
        )}
      </div>

      {/*TODO: error*/}
      {error && <div>{error.message}</div>}
    </section>
  );
}
