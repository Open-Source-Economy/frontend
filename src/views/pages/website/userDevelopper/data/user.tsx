import React from "react";
import img2 from "src/assets/icon/sec2img3.png";
import img3 from "src/assets/lock.png";
import img4 from "src/assets/icon/userimg1.png";
import img1 from "src/assets/source.png";
import bgText from "src/assets/bg-text-2.png";
import devBg from "src/assets/developer-bg1.webp";
import "aos/dist/aos.css";
import { SolutionProps } from "../elements/Solution";
import primaryProblemsSrc from "src/assets/btn.png";
import secondaryProblemsSrc from "src/assets/developerbannertext.png";
import { UserDeveloperProps } from "src/views";
import { Audience } from "../../../../Audience"; // not chnage the import to src/, it does not work

const audience = Audience.USER;

const solution1 = {
  audience,
  image: img2,
  starPosition: "lg:top-[23%] sm:top-[21%] top-[17%] md:left-[50%] left-[46%] sm:left-[49%] sm:w-[70px] w-14",
  title: "Get Support",
  subTitle: "From Those Who Know",
  comming: <p className="mb-2 sm:text-start  w-full">AVAILABLE</p>,
  text: (
    <>
      <ul className="px-10 sm:mt-[35px] mt-4 w-fit mx-auto sm:!mx-0 text-start">
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
  image: img4,
  starPosition: "lg:top-[10%] sm:top-[8%] top-[1%] sm:top-[7%] md:left-[49%] left-[40%] sm:left-[49%] sm:w-[70px] w-14",
  comingSoon: true,
  title: "Have a Say",
  comming: <p className="!pb-2.5 mb-2 sm:text-start w-full">COMING SOON</p>,
  subTitle: "Forget the Far West!",
  text: (
    <div className="sm:mt-[45px] mt-4">
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
  image: img3,
  starPosition: "sm:w-[70px] w-14 lg:top-[0%] sm:top-[-2%] top-[-5%]  md:left-[40%] left-[28%] sm:left-[32%]",
  title: "Fund Your Future",
  comming: <p className="!mb-2.5  sm:text-start  w-full">COMING SOON</p>,
  subTitle: (
    <>
      <p className="sm:!text-start text-center">Secure your platform</p> <p className="!mt-2">Secure your business.</p>
    </>
  ),
  text: (
    <div className="xl:mt-16 md:mt-10 mt-7">
      <p>
        Support, invest, or donate to projects shaping <br /> your future.
      </p>
      <p className="sm:mt-6 mt-4">Become confident in using open source.</p>
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
  subTittle1: (
    <p>
      Playground for them
      <br />
      business for me
    </p>
  ),
  subTittle2: <p>Long-lasting project</p>,
  subTittle3: <p>No technical support</p>,
  bgTextImg: bgText,
  mainBg: devBg,
  cartoonImg: img1,
  primaryProblemsSrc,
  secondaryProblemsSrc,
  solutions: [solution1, solution2, solution3],
};
