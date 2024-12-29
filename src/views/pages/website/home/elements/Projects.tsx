import React, { useEffect } from "react";
import backdropSVG from "src/assets/backdrop.svg";
import { Cards } from "src/views/pages/website/home/elements/Cards";
import { useRepositories } from "src/views/hooks";
import { repositoryIds } from "src/views/data/repositories";
import { Audience } from "../../../../Audience";

interface ProjectsProps {}

export function Projects(props: ProjectsProps) {
  const { repositories, error, reloadRepositories, loading } = useRepositories(repositoryIds);

  useEffect(() => {
    reloadRepositories();
  }, []);

  return (
    <>
      <div className="relative sm:px-8 max-[540px]:px-[18px] flex w-full justify-center pb-[100px] max-[540px]:pt-12 pt-[40px] lg:pb-[200px] lg:pt-[100px] max-w-[1330px] mx-auto overflow-hidden min-h-[1000px]">
        <div className="dig-into-details relative flex !max-w-[1320px] !w-full flex-col items-center justify-center text-center gap-[80px] lg:gap-[130px]">
          <img src={backdropSVG} className="pointer-events-none absolute top-[0px] z-0" alt="backdrop" />
          <h1 className="text-center font-mich text-[28px] font-[400] lg:text-[42px]">Latest Open Source Projects</h1>
          <div className="flex flex-wrap z-[10]  w-full gap-4 justify-center ">
            {/*TODO*/}
            {error && <div>{error.toSting()}</div>}

            {loading ? (
							<>
								{Array(6).fill(null).map((_, i) => (
									<Cards key={i} isLoading />
								))}
							</>
						) : (
							repositories.map(([owner, repository]) => (
								<Cards
									key={`${owner.id.login}-${repository.id.githubId}`}
									owner={owner}
									repository={repository}
									audience={Audience.ALL}
								/>
							))
						)}
          </div>
        </div>
      </div>
    </>
  );
}
