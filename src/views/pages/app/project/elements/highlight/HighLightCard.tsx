import React from "react";
import check from "src/assets/checkmark.png";
import { Button } from "src/views/components";
import { SpinningWheel } from "src/Utils/Icons";
import { Credit, credit } from "../../../../../../model";

interface HighLightCardProps {
  card: {
    title: string;
    description: string;
    tasks: string[];
    progress: Credit;
    total: Credit;
    buttonText: string;
    isBorder?: boolean;
  };
}

export function HighLightCard(props: HighLightCardProps) {
  return (
    <div
      className={`${props.card.isBorder ? "virtuous-card" : "border !border-[#2b394d]"}
cursor-pointer h-full !bg-primaryBg text-white rounded-[20px] 2xl:rounded-[28px] box-gradient-border-hover 3xl:rounded-[35px] py-8 !px-5 xl:!px-7 xl:!pt-14 xl:!pb-9 3xl:!px-8 3xl:!pt-16 3xl:!pb-10 flex flex-col hover:shadow-[0px_0px_50px_0px_rgba(208,102,99,0.28)] z-20 duration-300 group ease-linear transition-shadow`}
    >
      {/* Card Title */}
      <h3 className="text-2xl 2xl:text-3xl 3xl:text-[35px] font-medium !mb-3 xl:!mb-4 3xl:!mb-5">{props.card.title}</h3>
      <p className="text-base xl:text-lg text-left 2xl:text-[19px] 3xl:text-[22px] opacity-80 mb-4 xl:mb-5 3xl:mb-7">{props.card.description}</p>

      {/* Task List */}
      <ul className="!mb-4 xl:!mb-7 2xl:!mb-10 3xl:!mb-12 !space-y-5 3xl:!space-y-[30px]">
        {props.card.tasks.map((task, index) => (
          <div key={index} className="flex items-center gap-3">
            <img src={check} className="3xl:w-7 h-5 w-5 3xl:h-7" alt="checkmark" />
            <h2 className="montserrat text-base xl:text-lg 2xl:text-[19px] 3xl:text-[22px] font-normal text-start">{task}</h2>
          </div>
        ))}
      </ul>

      {/* Progress */}
      <div className="mt-auto">
        <div className="flex gap-2 items-center !mb-4 xl:!mb-6 3xl:!mb-7">
          <span className="max-w-5 md:max-w-6 3xl:max-w-8">
            <SpinningWheel />
          </span>
          <p className="text-base md:text-lg lg:text-xl 2xl:text-2xl 3xl:text-[28px] font-semibold">
            {credit.displayAmount(props.card.progress)} /{" "}
            <span className="bg-gradient-to-r pr-1.5 from-[#FF7E4B] to-[#FF518C] w-fit bg-clip-text text-transparent ">
              {credit.displayAmount(props.card.total)}
            </span>
            requested
          </p>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] text-white to-[#66319B] h-2 rounded-full"
            style={{ width: `${credit.percentage(props.card.progress, props.card.total)}%` }}
          ></div>
        </div>

        <div className="relative !mt-6 lg:!mt-7 xl:!mt-8 2xl:!mt-10">
          <Button audience="ALL" parentClassName="w-full" className="w-full cursor-pointer" level="SECONDARY" size="LARGE" asChild>
            <span>{props.card.buttonText}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
