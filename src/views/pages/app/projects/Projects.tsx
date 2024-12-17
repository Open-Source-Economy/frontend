import React, { useEffect } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { BaseURL } from "src/App";
import { useRepositories } from "src/views/hooks";
import { Cards } from "src/views/pages/website/home/elements";
import { Audience } from "src/views/Audience";
import { repositoryIds } from "src/views/data/repositories";
import backdropSVG from "../../../../assets/backdrop.svg";
import { OpenSourceExpertTitle } from "./elements";

interface ProjectsProps {}

export function Projects(props: ProjectsProps) {
  const { repositories, error, reloadRepositories } = useRepositories(repositoryIds);

  useEffect(() => {
    reloadRepositories();
  }, []);

  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <OpenSourceExpertTitle />

      <div className="relative sm:px-8 max-[540px]:px-[18px] flex w-full items-center justify-center pb-[100px] max-[540px]:pt-12 pt-[40px] lg:pb-[200px] lg:pt-[100px] max-w-[1330px]   mx-auto">
        <div className="dig-into-details relative flex !max-w-[1320px] !w-full flex-col items-center justify-center text-center gap-[80px] lg:gap-[130px]">
          <img src={backdropSVG} className="pointer-events-none absolute top-[0px] z-0" alt="" />
          <div className="flex flex-wrap z-[10]  w-full gap-4 justify-center ">
            {/*TODO*/}
            {error && <div>{error.toSting()}</div>}

            {repositories.map(([owner, repository], index) => (
              <>
                <Cards owner={owner} repository={repository} audience={Audience.USER} action="FUND" to="/issues" />
              </>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
