import React from "react";
import img2 from "src/assets/icon/sec2img3.png";
import img3 from "src/assets/icon/userimg2.png";
import img4 from "src/assets/icon/userimg1.png";
import img1 from "src/assets/source.png";
import bgText from "src/assets/bg-text-2.png";
import devBg from "src/assets/developer-bg.png";
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
  comming: <p className="mb-2">AVAILABLE</p>,
  text: (
    <>
      <ul className="px-10 mt-[35px]">
        <li className={"list-disc"}>Get technical support</li>
        <li className={"list-disc"}>Discuss your features & needs</li>
        <li className={"list-disc"}>Share your requests.</li>
      </ul>

      <p className="mt-6">
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
  comming: <p className="!pb-2.5 flex">COMING SOON</p>,
  subTitle: "Forget the Far West!",
  text: (
    <div className="mt-[45px]">
      <p>
        Be part of a clear, transparent, and <br /> decentralized governance.
      </p>
      <p className="mt-6">
        Shape the evolution and future of <br /> projects that matter to you.
      </p>
    </div>
  ),
} as SolutionProps;

const solution3 = {
  audience,
  image: img4,
  starPosition: "top-16 left-[220px] w-[70px]",
  title: "Fund Your Future",
  comming: <p className="!mb-2.5 flex">COMING SOON</p>,
  subTitle: (
    <>
      <p>Secure your platform</p> <p className="!mt-2">Secure your business.</p>
    </>
  ),
  text: (
    <div className="xl:mt-16 md:mt-10 mt-7">
      <p>
        Support, invest, or donate to projects shaping <br /> your future.
      </p>
      <p className="mt-6">Become confident in using open source.</p>
    </div>
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
  subtittle1: <p className="bg-[#FF518C] lg:!p-[15px] mx:p-2 p-1 rounded-[10px] max-w-[319px] w-full">Long-lasting project</p>,
  subtittle2: <p className="bg-[#FF518C] lg:!p-[15px] mx:p-2 p-1 rounded-[10px] max-w-[319px] w-full">No technical support</p>,
  subtittle3: (
    <p className="bg-[#FF518C] lg:!p-[15px] mx:p-2 p-1 rounded-[10px] max-w-[319px] w-full">
      Playground for them
      <br />
      business for me
    </p>
  ),
  bgTextImg: bgText,
  mainBg: devBg,
  cartoonImg: img1,
  primaryProblemsSrc,
  secondaryProblemsSrc,
  solutions: [solution1, solution2, solution3],
};
