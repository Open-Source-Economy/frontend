import { AimIcon, OurMissionIcon, PromiseIcon, WinIcon } from "src/Utils/Icons";

// Define the feature type
interface Feature {
  icon: React.ReactNode;
  heading: string;
  text: string;
}

// Dummy data with type annotations
const features: Feature[] = [
  {
    icon: <AimIcon />,
    heading: "Our Aim",
    text: "From benevolence to professionalism.",
  },
  {
    icon: <WinIcon />,
    heading: "Win-Win",
    text: "Support us; prioritize your needs.",
  },
  {
    icon: <PromiseIcon />,
    heading: "Our Promise",
    text: "Reliable. Bug-free. Built to serve you.",
  },
  {
    icon: <OurMissionIcon />,
    heading: "Our Mission",
    text: "100% non-profit. 100% for you.",
  },
];

// Component with TypeScript annotations
const FeatureList: React.FC = () => (
  <div className="space-y-4 xl:space-y-[19px]">
    {features.map(({ icon, heading, text }, index) => (
      <div key={index} className="flex items-center gap-4 px-6 py-4 rounded-2xl xl:rounded-[35px] !bg-primaryBg">
        <div className="max-w-24 3xl:max-w-[112px] max-h-24 3xl:max-h-[112px] object-cover">{icon}</div>
        <div>
          <h2 className="font-montserrat text-base sm:text-xl font-semibold xl:text-[22px] 3xl:text-2xl">{heading}</h2>
          <span className="h-1 my-2.5 block bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] max-w-[95px]"></span>
          <p className="text-base xl:text-lg 3xl:text-xl font-montserrat !leading-[130%]">{text}</p>
        </div>
      </div>
    ))}
  </div>
);

export default FeatureList;
