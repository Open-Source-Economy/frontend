import React from "react";
import { PageWrapper } from "../../PageWrapper";
import { BaseURL } from "../../../../App";

interface ProjectsProps {}

export function Projects(props: ProjectsProps) {
  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <section className="relative w-full !pt-10 px-4 xl:!pt-20 flex flex-col items-center">
        <h1 className="relative text-center mx-auto  main-heading !mt-3">
          Apache/<span className="bg-gradient-to-r from-[#FF518C] to-[#66319B]  text-transparent bg-clip-text">Pekko</span>
        </h1>
        <h5 className="font-montserrat text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-center max-w-[936px] mx-auto opacity-70 !mt-4">
          Build highly concurrent, distributed, and resilient message-driven{" "}
          <span className="relative w-fit block mx-auto !pb-3 lg:!pb-5">
            applications using Java/Scala{" "}
            <span className="absolute w-[53%] bottom-0 left-1/2 -translate-x-1/2 h-1 xl:h-1.5 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>
        </h5>
      </section>
    </PageWrapper>
  );
}
