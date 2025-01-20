import React, { useEffect } from "react";
import { ParticipantCard } from "./ParticipantCard";
import offerLeftLinear from "src/assets/offer-linear.webp";
import rightLinear from "src/assets/right-linear-bg.webp";
import faq from "src/assets/faq-bg.webp";
import { Button, DividerTitle } from "src/components";
import { useMaintainers } from "../../../../hooks";
import { ProjectId } from "src/model";

interface MaintainersProps {
  projectId: ProjectId;
  viewAllButton?: boolean;
}

export function Maintainers(props: MaintainersProps) {
  const { maintainers, isLoading, error, reloadMaintainers } = useMaintainers(props.projectId);

  useEffect(() => {
    reloadMaintainers();
  }, []);

  if (maintainers?.length === 0) {
    return null;
  } else {
    return (
      <section className="relative">
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

        <DividerTitle title="Who are We?" />

        <div className="3xl:max-w-[1520px] w-full !px-4 xl:!px-0 xl:max-w-[88%] 2xl:max-w-[80%] mx-auto text-center">
          <div className={`grid grid-cols-1 place-items-center ${maintainers?.length === 1 ? "" : `sm:grid-cols-2 lg:grid-cols-4`} gap-14 sm:gap-8`}>
            {maintainers?.map((maintainer, index) => <ParticipantCard maintainer={maintainer} key={index} />)}
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
}
