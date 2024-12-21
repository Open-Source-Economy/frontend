import React, { useEffect } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { BaseURL } from "src/App";
import { useRepositories } from "src/views/hooks";
import { Cards } from "src/views/pages/website/home/elements";
import { Audience } from "src/views/Audience";
import { repositoryIds } from "src/views/data/repositories";
import backdropSVG from "../../../../assets/backdrop.svg";

interface ProjectsProps {}

export function Projects(props: ProjectsProps) {
  const { repositories, error, reloadRepositories } = useRepositories(repositoryIds);

  useEffect(() => {
    reloadRepositories();
  }, []);

  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <div className="flex flex-col items-center justify-center pt-32">
        <h3 className="lg:text-6xl text-4xl sm:text-5xl font-michroma">
          Fund an
          <span className="gradient-bg bg-clip-text text-transparent ml-2">Issue</span>
        </h3>
        <div className="h-1 w-[149px] mx-auto gradient-bg my-6"></div>
        <p className="max-w-[900px] lg:text-2xl sm:text-xl text-base  text-center px-2">
          Build highly concurrent, distributed, and resilient message-driven applications using Java/Scala
        </p>
      </div>
      <img src={backdropSVG} className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-full top-[37%] sm:top-[26%] lg:top-[70px] z-0" alt="" />
      {/* <OpenSourceExpertTitle /> */}

      <div className="relative sm:px-8 max-[540px]:px-[18px] flex w-full items-center justify-center pb-[100px] max-[540px]:pt-12 pt-[40px] lg:pb-[200px] lg:pt-[100px] max-w-[1330px]   mx-auto">
        <div className="dig-into-details relative flex !max-w-[1320px] !w-full flex-col items-center justify-center text-center gap-[80px] lg:gap-[130px]">
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
