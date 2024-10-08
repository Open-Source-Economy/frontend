// data.js

import React from "react";
import img2 from "src/assets/developerimg1.png";
import img3 from "src/assets/developerimg2.png";
import img4 from "src/assets/sec2img.png";
import primaryProblemsSrc from "src/assets/btn2.png";
import secondaryProblemsSrc from "src/assets/userbannertext.png";
import { SolutionProps } from "../elements/Solution";
import { UserDeveloperProps } from "../UserDeveloper";
import { Audience } from "../../../../Audience";

const audience = Audience.DEVELOPER;
const solution1: SolutionProps = {
  audience,
  image: img2,
  starPosition: "top-[135px] left-[240px] w-[80px]",
  title: "Get Paid",
  subTitle: "Earn, Don’t Burn",
  text: (
    <>
      <p>
        Gain tokens for your involvement. <br /> Get a stake in your project's success
      </p>
    </>
  ),
};

const solution2: SolutionProps = {
  audience,
  image: img3,
  starPosition: "top-[120px] left-[230px] w-[80px]",
  title: "Have a Say",
  subTitle: "Forget the Far West!",
  text: (
    <>
      <p>
        Be part of a clear, transparent, and decentralized <br /> governance.
      </p>
      <p className="mt-6">
        The deeper your insights, the stronger your <br /> influence.
      </p>
    </>
  ),
  comingSoon: true,
};

const solution3: SolutionProps = {
  audience,
  image: img4,
  starPosition: "top-[180px] left-[122px] w-[70px]",
  title: "Fund Your Future",
  subTitle: "Stop begging for donations!",
  text: (
    <>
      <ul className="px-10">
        <li className="list-disc">Easily set up new revenue streams. </li>
        <li className="list-disc">Attract financial backers.</li>
      </ul>
      <h2 className="mt-6">And bring your vision to life!</h2>
    </>
  ),
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
  primaryProblemsSrc: primaryProblemsSrc,
  secondaryProblemsSrc: secondaryProblemsSrc,
  solutions: [solution1, solution2, solution3],
};
