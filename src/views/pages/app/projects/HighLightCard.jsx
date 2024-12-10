import React from "react";
import check from "src/assets/checkmark.png";
import { Button } from "src/components";
import { SpinningWheel } from "src/Utils/Icons";

const HighLightCard = ({ card }) => {
  return (
    <div
      className={`${
        card.isBorder ? "virtuous-card" : ""
      } !bg-secondary text-white rounded-[35px] p-6  flex flex-col hover:shadow-[0px_0px_50px_0px_rgba(208,102,99,0.28)]`}
    >
      {/* Card Title */}
      <h3 className="text-xl lg:text-2xl 2xl:text-3xl 3xl:text-[35px] font-montserrat font-medium mb-2">{card.title}</h3>
      <p className="text-base 2xl:text-lg text-left  3xl:text-[22px] font-montserrat opacity-80 mb-4">{card.description}</p>

      {/* Task List */}
      <ul className="mb-4 !space-y-5">
        {card.tasks.map((task, index) => (
          <div key={index} className="flex items-center gap-3">
            <img src={check} className="3xl:w-7 h-5 w-5 3xl:h-7" alt="checkmark" />
            <h2 className="montserrat text-base lg:text-lg 2xl:text-xl 3xl:text-2xl font-normal text-start">{task}</h2>
          </div>
        ))}
      </ul>

      {/* Progress */}
      <div className="mt-auto">
        <div className="flex gap-2 items-center !mb-7">
          <span className="max-w-5 md:max-w-6 3xl:max-w-8">
            <SpinningWheel />
          </span>
          <p className="font-montserrat text-base md:text-lg lg:text-xl xl:text-2xl 3xl:text-[28px] font-semibold">
            {card.progress} /{" "}
            <span className="bg-gradient-to-r pr-1.5 from-[#FF7E4B] to-[#FF518C] w-fit bg-clip-text text-transparent "> {card.total} DoW</span>
            requested
          </p>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div
            className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] text-white to-[#66319B] h-2 rounded-full"
            style={{ width: `${(card.progress / card.total) * 100}%` }}
          ></div>
        </div>

        <div className="relative !mt-7 lg:!mt-10 3xl:!mt-12">
          <Button audience="ALL" parentClassName="w-full" className="w-full cursor-pointer" level="SECONDARY" size="LARGE" asChild>
            <span> {card.buttonText}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HighLightCard;
