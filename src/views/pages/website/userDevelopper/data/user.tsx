import React from "react";
import img2 from "src/assets/icon/sec2img3.png";
import img3 from "src/assets/icon/userimg2.png";
import img4 from "src/assets/icon/userimg1.png";
import "aos/dist/aos.css";
import { SolutionProps } from "../elements/Solution";
import primaryProblemsSrc from "src/assets/btn.png";
import secondaryProblemsSrc from "src/assets/developerbannertext.png";
import { UserDeveloperProps } from "../UserDeveloper";
import { Audience } from "../../../../Audience";

const audience = Audience.USER;

const solution1 = {
  audience,
  image: img2,
  starPosition: "top-[55px] left-[140px] w-[50px] md:top-[100px] md:left-[220px] md:w-[70px]",
  title: "Get Support",
  subTitle: "From Those Who Know",
  text: (
    <>
      <ul className="px-10">
        <li className={"list-disc"}>Get technical support</li>
        <li className={"list-disc"}>Discuss your features & needs</li>
        <li className={"list-disc"}>Share your requests.</li>
      </ul>

      <p className="mt-6">
        {" "}
        All from the very same guys who coded it. <br /> They are the experts!
      </p>
    </>
  ),
} as SolutionProps;

const solution2 = {
  audience,
  image: img3,
  starPosition: "top-[55px] left-[155px] w-[40px]",
  comingSoon: true,
  title: "Have a Say",
  subTitle: "Forget the Far West!",
  text: (
    <>
      <p>
        Be part of a clear, transparent, and <br /> decentralized governance.
      </p>
      <p className="mt-6">
        Shape the evolution and future of <br /> projects that matter to you.
      </p>
    </>
  ),
} as SolutionProps;

const solution3 = {
  audience,
  image: img4,
  starPosition: "top-16 left-[220px] w-[70px]",
  title: "Fund Your Future",
  subTitle: (
    <>
      Secure your platform, <br /> Secure your business.
    </>
  ),
  text: (
    <>
      <p>
        Support, invest, or donate to projects shaping <br /> your future.
      </p>
      <p className="mt-6">Become confident in using open source.</p>
    </>
  ),
} as SolutionProps;

export const userProps: UserDeveloperProps = {
  audience,
  problemTitle: (
    <>
      Does using open source give
      <br />
      you a headache?
    </>
  ),
  primaryProblemsSrc,
  secondaryProblemsSrc,
  solutions: [solution1, solution2, solution3],
};
