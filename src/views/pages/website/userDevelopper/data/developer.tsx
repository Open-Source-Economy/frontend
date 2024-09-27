// data.js

import React from "react";
import img2 from "../../../../../assets/developerimg1.png";
import img3 from "../../../../../assets/developerimg2.png";
import img4 from "../../../../../assets/sec2img.png";
import primaryProblemsSrc from "../../../../../assets/btn2.png";
import secondaryProblemsSrc from "../../../../../assets/userbannertext.png";
import { SolutionProps } from "../elements/Solution";
import { UserDeveloperProps } from "../UserDeveloper";

const solution1: SolutionProps = {
  image: img2,
  starPosition: "top-[135px] left-[240px] w-[80px]",
  title: "Get Paid",
  subTitle: "Earn, Don’t Burn",
  text: (
    <>
      <h3 className="text-[16px] xl:text-[28px] xl:leading-9 text-gray-200 leading-6 mt-8">
        Gain tokens for your involvement. <br /> Get a stake in your project's success
      </h3>
    </>
  ),
};

const solution2: SolutionProps = {
  image: img3,
  starPosition: "top-[120px] left-[230px] w-[80px]",
  title: "Have a Say",
  subTitle: "Forget the Far West!",
  text: (
    <>
      <h3 className="text-[12px] xl:text-[21px] xl:leading-7 leading-4 mt-8 text-gray-200">
        Be part of a clear, transparent, and decentralized <br /> governance.
      </h3>
      <h3 className="text-[14px]  xl:text-[21px] xl:leading-7  leading-4 text-gray-200 mt-4">
        The deeper your insights, the stronger your <br /> influence.
      </h3>
    </>
  ),
  comingSoon: true,
};

const solution3: SolutionProps = {
  image: img4,
  starPosition: "top-[180px] left-[122px] w-[70px]",
  title: "Fund Your Future",
  subTitle: "Stop begging for donations!",
  text: (
    <>
      <ul className="mt-2 px-4">
        <li className="list-disc text-[14px] xl:text-[27px] xl:leading-9 ">Easily set up new revenue streams. </li>
        <li className="list-disc text-[14px] xl:text-[27px] xl:leading-9 ">Attract financial backers.</li>
      </ul>
      <h2 className=" text-[14px] xl:text-[27px] xl:leading-7  mt-3">And bring your vision to life!</h2>
    </>
  ),
};

export const developerProps: UserDeveloperProps = {
  primaryProblemsSrc: primaryProblemsSrc,
  secondaryProblemsSrc: secondaryProblemsSrc,
  solutions: [solution1, solution2, solution3],
};
