import img1 from "../../assets/get-paid.webp";
import img2 from "../../assets/heavy-say.webp";
import img3 from "../../assets/fund.webp";
import img4 from "../../assets/sec2img3.png";
import img5 from "../../assets/userimg2.png";
import img6 from "../../assets/userimg1.png";

export const dropdownOptions = {
  profile: [
    { id: 1, label: "Profile 1", value: "Profile 1" },
    { id: 2, label: "Profile 2", value: "Profile 2" },
    { id: 3, label: "Profile 3", value: "Profile 3" },
  ],
  project: [
    { id: 1, label: "Yes", value: "Yes" },
    { id: 2, label: "No", value: "No" },
  ],
};
export const features = [
  {
    id: 1,
    title: "Get Paid",
    subtitle: "Earn, Don't Burn",
    description: ["Gain tokens for your involvement.", "Get a stake in your project's success"],
    imgPath: img1,
    subTitle2: "",
  },
  {
    id: 2,
    title: "Have a Say",
    subtitle: "Forget the Far West!",
    description: [""],
    imgPath: img2,
    subTitle2: "The deeper your insights, the stronger your influence.",
  },
  {
    id: 3,
    title: "Fund Your Future",
    subtitle: "Stop begging for donations!",
    description: [
      <div key="desc-1" className="flex items-center">
        .<p className="ml-3">Easily set up new revenue streams.</p>
      </div>,
      <div key="desc-2" className="flex items-center">
        .<p className="ml-3">Attract financial backers.</p>
      </div>,
      "And bring your vision to life!",
    ],
    subTitle2: "",
    imgPath: img3,
  },
];
export const userFeatures = [
  {
    id: 1,
    title: "Get Support",
    subtitle: "From Those Who Know",
    description: [
      <>
        <span className="mr-3">.</span> Get technical support
      </>,
      <>
        <span className="mr-3">.</span> Process your business needs
      </>,
      <>
        <span className="mr-3">.</span> Shop our Express
      </>,
    ],
    subtitle2: "All from the very same guys who coded it.They are like experts!",
    imgPath: img4,
    status: "AVAILABLE",
  },
  {
    id: 2,
    title: "Have a Say",
    subtitle: "Forget the Far West!",
    description: ["Be part of a clear, transparent, and decentralized governance"],
    subtitle2: "Shape the evolution and future of projects that matter to you.",
    imgPath: img5,
    status: "COMING SOON",
  },
  {
    id: 3,
    title: "Fund Your Future",
    subtitle: "Secure your platform\nSecure your business",
    description: ["Support, invest, or donate to projects shaping your future."],
    subtitle2: "Become confident in using open source.",
    imgPath: img6,
    status: "COMING SOON",
  },
];
