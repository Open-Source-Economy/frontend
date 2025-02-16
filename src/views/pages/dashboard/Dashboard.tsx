import React, { useEffect } from "react";
import { PageWrapper } from "../PageWrapper";
import { DividerTitle, Services } from "src/views/components";
import { BookACallButton } from "../../components/elements/BookACallButton";
import { Audience } from "../../Audience";
import { paths } from "../../../paths";
import { ServiceType } from "../../../model";
import { Cards2 } from "../website/home/elements";
import { useRepositories } from "../../hooks";
import { repositoryIds } from "../../../services/data";
import { H1WithSubtitle } from "../../components/title/H1WithSubtitle";
import { ServiceButton } from "../../components/service/ServiceButton";

interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const audience = Audience.USER;
  const buttons: { [key in ServiceType]?: ServiceButton } = {
    [ServiceType.DEVELOPMENT]: {
      to: paths.FUND_ISSUES,
      placeholder: "Get Support",
    },
  };

  const { repositories, error, reloadRepositories } = useRepositories(repositoryIds);

  useEffect(() => {
    reloadRepositories();
  }, []);

  return (
    <PageWrapper>
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
      <Services buttons={buttons} />

      <section className="!px-4 relative flex flex-col">
        <div className="flex justify-center z-20 relative flex-wrap items-center !gap-4 !mt-5 md:!mt-7 xl:mt-11">
          <BookACallButton audience={Audience.USER} level={"SECONDARY"} className="hover:!text-white !text-primary-user !capitalize" />
        </div>
      </section>

      <div className="mt-[130px] md:mt-[160px] lg:mt-[200px]"></div>

      <div className="max-w-[1330px] mx-auto">
        <div className="mt-[130px] md:mt-[180px] lg:mt-[230px]"></div>

        <DividerTitle title="Lastest Projects" />

        <div className="relative sm:px-8 max-[540px]:px-[18px] flex w-full items-center justify-center pb-[100px] max-[540px]:pt-12 pt-[40px] lg:pb-[200px] lg:pt-[40px]">
          <div className="dig-into-details relative flex !max-w-[1320px] !w-full flex-col items-center justify-center text-center gap-[80px] lg:gap-[130px]">
            <div className="flex flex-wrap z-[10]  w-full gap-4 justify-center ">
              {/*TODO*/}
              {error && <div>{error.toSting()}</div>}

              {repositories.map(([owner, repository], index) => (
                <>
                  <Cards2 owner={owner} repository={repository} audience={Audience.USER} action="FUND" to={paths.project(repository.id)} />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
