import React from "react";
import { PageWrapper } from "../../PageWrapper";
import { DividerTitle, Services } from "src/views/v1/components";
import { BookACallButton } from "../../../components/elements/BookACallButton";
import { Audience } from "../../../../Audience";
import { Owner, Repository, ServiceType } from "@open-source-economy/api-types";
import { isOwnerId, type ProjectId } from "src/utils/local-types";
import { Cards2 } from "../home/elements";
import { repositoryIds } from "../../../../../services/data";
import { H1WithSubtitle } from "../../../components/title/H1WithSubtitle";
import { ServiceButton } from "../../../components/service/ServiceButton";
import { useQueries } from "@tanstack/react-query";
import { projectService } from "src/services";

interface DashboardProps {}

export function Dashboard(_props: DashboardProps) {
  const _audience = Audience.USER;
  const buttons: { [key in ServiceType]?: ServiceButton } = {
    [ServiceType.DEVELOPMENT]: {
      to: "/fund-issues",
      placeholder: "Get Support",
    },
  };

  const repositoryQueries = useQueries({
    queries: repositoryIds.map((repositoryId) => ({
      queryKey: ["project", "repository", { owner: repositoryId.ownerId.login, repo: repositoryId.name }, {}],
      queryFn: () => projectService.getRepository({ owner: repositoryId.ownerId.login, repo: repositoryId.name }, {}),
    })),
  });

  const repositories: [Owner, Repository][] = repositoryQueries
    .filter((q) => q.isSuccess && q.data)
    .map((q) => [q.data!.owner, q.data!.repository]);
  const error = repositoryQueries.find((q) => q.error)?.error ?? null;

  return (
    <PageWrapper>
      <H1WithSubtitle
        title={
          <>
            <span className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] w-fit text-transparent bg-clip-text">
              Open Source
            </span>
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
          <BookACallButton
            audience={Audience.USER}
            level={"SECONDARY"}
            className="hover:!text-white !text-primary-user !capitalize"
          />
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
              {error && <div>{error.message}</div>}

              {/* {repositories.map(([owner, repository], index) => (
                <>
                  <Cards2 owner={owner} repository={repository} audience={Audience.USER} action="FUND" to="..." />
                </>
              ))} */}
              {repositories.map(([owner, repository], index) => (
                <Cards2
                  key={`${repository.id}-${index}`}
                  owner={owner}
                  repository={repository}
                  audience={Audience.USER}
                  action="FUND"
                  to={
                    isOwnerId(repository.id as ProjectId)
                      ? `/projects/${repository.id}`
                      : `/projects/${repository.id.ownerId}/${repository.id.name}`
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
