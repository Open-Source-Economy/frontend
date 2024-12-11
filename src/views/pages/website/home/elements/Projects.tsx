import React from "react";
import backdropSVG from "src/assets/backdrop.svg";
import { Cards } from "src/views/pages/website/home/elements/Cards";
import { OwnerId, RepositoryId } from "../../../../../model";
import { getBackendAPI } from "../../../../../services";
import { useRepositories } from "../../../../hooks";

interface ProjectsProps {}

export function Projects(props: ProjectsProps) {
  const backendAPI = getBackendAPI();

  const repositoryNames: [string, string][] = [
    ["apache", "pekko"],
    ["join-the-flock", "flock"],
    ["kubesphere", "kubesphere"],
  ];

  const { repositories, error } = useRepositories(repositoryNames.map(([owner, repository]) => new RepositoryId(new OwnerId(owner), repository)));

  return (
    <>
      <div className="relative sm:px-8 max-[540px]:px-[18px] flex w-full items-center justify-center pb-[100px] max-[540px]:pt-12 pt-[40px] lg:pb-[200px] lg:pt-[100px] max-w-[1330px]   mx-auto">
        <div className="dig-into-details relative flex !max-w-[1320px] !w-full flex-col items-center justify-center text-center gap-[80px] lg:gap-[130px]">
          <img src={backdropSVG} className="pointer-events-none absolute top-[0px] z-0" alt="" />
          <h1 className="text-center font-mich text-[28px] font-[400] lg:text-[42px]">Latest Open Source Projects</h1>
          <div className="flex flex-wrap z-[10]  w-full gap-4 justify-center ">
            {repositories.map(([owner, repository], index) => (
              <>
                <Cards key={index} owner={owner} repository={repository} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
