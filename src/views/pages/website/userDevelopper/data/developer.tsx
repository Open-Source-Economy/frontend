// data.js

import React from "react";
import img2 from "src/assets/developerimg1.png";
import img3 from "src/assets/developerimg2.png";
import img4 from "src/assets/sec2img.png";
import bgText from "src/assets/userbannertext.png";
import secondaryProblemsSrc from "src/assets/userbannertext.png";
import primaryProblemsSrc from "src/assets/btn2.png";
import { SolutionProps } from "../elements/Solution";
import { UserDeveloperProps } from "../UserDeveloper";
import { Audience } from "../../../../Audience";
import devBg from "src/assets/developer-bg.png";
import img1 from "src/assets/source.png";

const audience = Audience.DEVELOPER;
const solution1: SolutionProps = {
  audience,
  image: img2,
  starPosition: "sm:w-[70px] w-14 left-[44%] top-[20%] top-[15%] sm:top-[15%]",
  title: "Get Paid",
  subTitle: "Earn, Don’t Burn",
  text: (
    <>
      <p className="sm:mt-[35px] mt-6">
        Gain tokens for your involvement. <br /> Get a stake in your project's success
      </p>
    </>
  ),
  comming: undefined,
};

const solution2: SolutionProps = {
  audience,
  image: img3,
  starPosition: "sm:w-[70px] w-14 left-[40%] sm:left-[45%] top-[10%] sm:top-[16%]",
  title: "Have a Say",
  subTitle: "Forget the Far West!",
  text: (
    <>
      <p className="xl:py-[96px] lg:py-14 sm:py-8 pt-8">
        The deeper your insights, the stronger your <br /> influence.
      </p>
    </>
  ),
  comming: undefined,
};

const solution3: SolutionProps = {
  audience,
  image: img4,
  starPosition: "sm:w-[70px] w-14 2xl:left-[21%] xl:left-[15%] sm:left-[5%] md:left-[13%] left-[-6%] top-[32%]",
  title: "Fund Your Future",
  subTitle: "Stop begging for donations!",
  text: (
    <>
      <ul className="px-10 2xl:mt-[46px] mt-6">
        <li className="list-disc">Easily set up new revenue streams. </li>
        <li className="list-disc">Attract financial backers.</li>
      </ul>
      <h2 className="xl:py-[51px] lg:py-10 py-6">And bring your vision to life!</h2>
    </>
  ),
  comming: undefined,
};

export const developerProps: UserDeveloperProps = {
  audience,
  problemTitle: (
    <>
      As an open source dev
      <br />
      are you experiencing....
    </>
  ),
  subTittle1: (
    <>
      No availability <br className="mx:block hidden" /> for community
    </>
  ),
  subTittle2: (
    <>
      Others profiting
      <br className="mx:block hidden" />
      off your work
    </>
  ),
  subTittle3: (
    <>
      Project struggling
      <br className="mx:block hidden" />
      to survive
    </>
  ),
  bgTextImg: bgText,
  mainBg: devBg,
  cartoonImg: img1,
  primaryProblemsSrc: primaryProblemsSrc,
  secondaryProblemsSrc: secondaryProblemsSrc,
  solutions: [solution1, solution2, solution3],
};
