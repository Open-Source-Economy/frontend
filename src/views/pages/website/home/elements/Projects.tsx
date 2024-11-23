import React from "react";
import backdropSVG from "src/assets/backdrop.svg";
import { Cards, CardsProps } from "src/views/pages/website/home/elements/Cards";

interface ProjectsProps {}

export function Projects(props: ProjectsProps) {
  const cardsProps: CardsProps[] = [
    // https://api.github.com/repos/apache/pekko
    {
      ownerLogin: "apache",
      repositoryName: "pekko",
      img: "https://avatars.githubusercontent.com/u/47359?v=4",
      description: "Build highly concurrent, distributed, and resilient message-driven applications using Java/Scala",
    },
    // https://api.github.com/repos/join-the-flock/flock
    {
      ownerLogin: "",
      repositoryName: "flock",
      img: "https://avatars.githubusercontent.com/u/187067599?v=4",
      description: "Flutter, by the community, for the community",
    },
    // https://api.github.com/repos/kubesphere/kubesphere
    {
      ownerLogin: "",
      repositoryName: "kubesphere",
      img: "https://avatars.githubusercontent.com/u/37326490?v=4",
      description: "The container platform tailored for Kubernetes multi-cloud, datacenter, and edge management ⎈ 🖥 ☁️",
    },
  ];
  return (
    <>
      <div className="relative sm:px-8 max-[540px]:px-[18px] flex w-full items-center justify-center pb-[100px] max-[540px]:pt-12 pt-[40px] lg:pb-[200px] lg:pt-[100px] max-w-[1330px]   mx-auto">
        <div className="dig-into-details relative flex !max-w-[1320px] !w-full flex-col items-center justify-center text-center gap-[80px] lg:gap-[130px]">
          <img src={backdropSVG} className="pointer-events-none absolute top-[0px] z-0" alt="" />
          <h1 className="text-center font-mich text-[28px] font-[400] lg:text-[42px]">Latest Open Source Projects</h1>
          <div className="flex flex-wrap z-[10]  w-full gap-4 justify-center ">
            {cardsProps.map((cardProps, index) => (
              <>
                <Cards key={index} {...cardProps} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
