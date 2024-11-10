import React from "react";
import img1 from "src/assets/get-paid.webp";
import img2 from "src/assets/heavy-say.webp";
import img3 from "src/assets/fund.webp";

const NoBsCards = () => {
  const features = [
    {
      id: 1,
      title: "Get Paid",
      subtitle: "Earn, Don't Burn",
      description: ["Gain tokens for your involvement.", "Get a stake in your project's success"],
      imgPath: img1,
    },
    {
      id: 2,
      title: "Have a Say",
      subtitle: "Forget the Far West!",
      description: ["The deeper your insights, the stronger your influence."],
      imgPath: img2,
    },
    {
      id: 3,
      title: "Fund Your Future",
      subtitle: "Stop begging for donations!",
      description: [
        <div className="flex items-center">
          .<div className="ml-3">Easily set up new revenue streams.</div>
        </div>,
        <div className="flex items-center">
          .<div className="ml-3">Attract financial backers.</div>
        </div>,
        "And bring your vision to life!",
      ],
      imgPath: img3,
    },
  ];

  return (
    <section className="max-w-[1470px] mx-auto w-full px-4">
      <h2 className="text-[74px] text-white leading-[104.054%] ff_michroma">No Bs</h2>
      <p className="text-[51px] text-white leading-[104.054%] ff_michroma">Here’s our solution</p>
      <div className="space-y-[101px] mt-[147px] max-w-[1181px] w-full mx-auto">
        {features.map(feature => (
          <div key={feature.id} className="flex items-center gap-[93px]">
            <div className="flex-shrink-0 px-[63px] py-[29px] max-w-[456px] w-full shadow-c2 bg-[#14233A] rounded-[50px] gap-6 h-[424px] flex items-center justify-center">
              <img src={feature.imgPath} alt={feature.title} className="object-contain max-w-[280px] w-full max-h-[200px]" />
            </div>
            <div className="flex flex-col justify-center mb-[70px]">
              <h3 className="text-primary-developer text-[45px leading-[130%] ff_michroma">{feature.title}</h3>
              <p className="text-white text-[28px] leading-[130%] font-medium ff_michroma">{feature.subtitle}</p>
              <div className="mt-[35px] space-y-1">
                {feature.description.map((item, index) => (
                  <p key={index} className="text-white text-[21px] leading-[150%] ff_michroma">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NoBsCards;
