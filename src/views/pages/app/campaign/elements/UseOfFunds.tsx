import useFunds from "src/assets/icon/useFunds.svg";
import { ListItem } from "./ListItem";
import { LinearCenter } from "src/Utils/Icons";
import React from "react";
import { CampaignDescription } from "src/dtos";

interface UseOfFundsProps {
  description: CampaignDescription.Section;
}

export function UseOfFunds(props: UseOfFundsProps) {
  return (
    <div className="relative pb-14 xl:pb-0">
      <div className="hidden xl:block absolute -z-10 w-full h-full -translate-x-1/2 left-1/2 -top-1/2">
        <LinearCenter />
      </div>

      <section className="3xl:max-w-[1613px] relative z-20 !px-4 xl:max-w-[90%] 2xl:max-w-[1370px] mx-auto justify-end gap-14 flex items-center xl:flex-row flex-col-reverse">
        <div className="max-w-[590px] 2xl:max-w-[580px] w-full 3xl:max-w-[700px]">
          <h1 className="text-2xl relative 1400:text-[32px] w-fit 3xl:text-[40px] pb-3 lg:pb-5 3xl:!pb-7 font-semibold sm:text-nowrap">
            <span className="absolute sm:inline hidden left-0 w-[70%] bottom-0 h-[4px] 3xl:h-1.5 bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
            Where Your Money Goes
          </h1>

          {props.description.items && (
            <ul className="space-y-4 2xl:space-y-5 mt-4 xl:!mt-8 !text-left">
              {props.description.paragraph1 && <p className="text-base sm:text-xl font-medium 3xl:text-2xl">{props.description.paragraph1}</p>}
              {props.description.items.map((item, index) => (
                <ListItem key={index}>{item.text}</ListItem>
              ))}
            </ul>
          )}
          {props.description.paragraph2 && (
            <p className="text-base max-w-[620px] 3xl:max-w-[700px] sm:text-xl font-medium 3xl:text-2xl mt-8">{props.description.paragraph2}</p>
          )}
        </div>

        {/* ======= Right Image ====  */}
        <div className="max-w-[590px] 2xl:max-w-[680px] 3xl:max-w-[873px] w-full !bg-secondary !bg-opacity-30 rounded-full flex justify-center items-center  2xl:pl-4 2xl:pt-14 2xl:pr-24 p-10 2xl:pb-16 shadow-imgShadow">
          <img src={useFunds} alt="" className=" object-cover" />
        </div>
      </section>
    </div>
  );
}
