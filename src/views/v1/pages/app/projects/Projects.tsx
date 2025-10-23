import React, { useEffect } from "react";
import { PageWrapper } from "src/views/v1/pages/PageWrapper";
import { paths } from "src/paths";
import { useRepositories } from "src/views/v1/hooks";
import { Cards2 } from "src/views/v1/pages/app/home/elements";
import { Audience } from "src/views/Audience";
import { repositoryIds } from "src/services/data/repositories";
import { H1WithSubtitle } from "../../../components/title/H1WithSubtitle";

interface ProjectsProps {}

export function Projects(props: ProjectsProps) {
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

      <div className="relative sm:px-8 max-[540px]:px-[18px] flex w-full items-center justify-center pb-[100px] max-[540px]:pt-12 pt-[40px] lg:pb-[200px] lg:pt-[40px] max-w-[1330px]   mx-auto">
        <div className="dig-into-details relative flex !max-w-[1320px] !w-full flex-col items-center justify-center text-center gap-[80px] lg:gap-[130px]">
          <div className="flex flex-wrap z-[10]  w-full gap-4 justify-center ">
            {/*TODO*/}
            {error && <div>{error.toSting()}</div>}

            {repositories.map(([owner, repository], index) => (
              <>
                <Cards2 owner={owner} repository={repository} audience={Audience.USER} action="FUND" to={paths.campaign(repository.id)} />
              </>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
