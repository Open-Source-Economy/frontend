import React from "react";
import background from "../../assets/hero-bg.webp";
import { Owner, Repository } from "src/model";
import { capitalize } from "lodash";

interface RepositoryTitleProps {
  owner: Owner;
  repository: Repository;
  subtitle?: string;
  displayProjectDescription?: boolean;
}

export function RepositoryTitle(props: RepositoryTitleProps) {
  return (
    <section className="relative w-full !pt-10 !px-4 xl:!pt-20 flex flex-col items-center">
      {" "}
      <img
        src={background}
        alt=""
        className="absolute pointer-events-none sm:max-w-[80%] w-full lg:max-w-[75%] xl:max-w-[802px] 3xl:max-w-[1020px] object-contain -translate-x-1/2 left-1/2 -z-10 top-[4%] opacity-40 md:opacity-30"
      />
      <img src={props.owner.avatarUrl} alt="Logo" className="w-16 rounded-full md:h-20 md:w-20 xl:w-[109px] h-16 xl:h-[109px]" />
      <h1 className="relative text-center mx-auto main-heading !mt-3">
        {capitalize(props.owner.id.login)}/
        <span className="bg-gradient-to-r from-[#FF518C] to-[#66319B]  text-transparent bg-clip-text">{capitalize(props.repository.id.name)}</span>
      </h1>
      {/*TODO: refactor*/}
      {props.subtitle && (
        <h5 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-center max-w-[320px] 500:max-w-[470px] md:max-w-[936px] mx-auto opacity-70 !mt-4">
          <span className="relative w-fit inline md:block mx-auto !pb-3 lg:!pb-5">
            {props.subtitle}
            <span className="absolute w-[53%] bottom-0 hidden lg:block left-1/2 -translate-x-1/2 h-1 xl:h-1.5 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>
        </h5>
      )}
      {props.displayProjectDescription && (
        <h5 className="text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-center max-w-[320px] 500:max-w-[470px] md:max-w-[936px] mx-auto opacity-70 !mt-4">
          <span className="relative w-fit inline md:block mx-auto !pb-3 lg:!pb-5">
            {props.repository.description}
            <span className="absolute w-[53%] bottom-0 hidden lg:block left-1/2 -translate-x-1/2 h-1 xl:h-1.5 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>
        </h5>
      )}
    </section>
  );
}
