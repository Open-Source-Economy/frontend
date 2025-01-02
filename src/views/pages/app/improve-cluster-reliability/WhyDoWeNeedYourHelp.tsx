import needHelp from "src/assets/whyneedhelp.webp";
import ListItem from "./ListItem";

const WhyDoWeNeedYourHelp = () => {
  const reliableData = [
    { id: 1, text: "Advanced expertise" },
    { id: 2, text: "Dedicated testing infrastructure" },
    { id: 3, text: "Significant time investment" },
    { id: 4, text: "Dedication" },
  ];
  return (
    <section className="3xl:max-w-[1528px] !px-4 xl:max-w-[90%] 2xl:max-w-[1380px] mx-auto justify-between gap-10 xl:gap-14 flex items-center xl:flex-row flex-col 3xl:gap-[112px] pb-12 xl:pb-0">
      {/* ======= Left Image ====  */}
      <div className="max-w-[640px] 2xl:max-w-[590px] 3xl:max-w-[666px] w-full relative">
        <div className="!bg-secondary !bg-opacity-35 rounded-full xl:pt-10 w-full h-full absolute max-w-[89%] lg:-top-5 shadow-[5px_8px_10px_0px_rgba(255,255,255,0.08)_inset] right-0 lg:-right-7"></div>
        <img src={needHelp} alt="" className="object-cover relative z-20" />
      </div>
      <div className="max-w-[640px] 2xl:max-w-[600px] w-full 3xl:max-w-[728px] relative z-20">
        <h1 className="text-2xl 2xl:text-[32px] 3xl:text-[40px] font-semibold font-montserrat sm:text-nowrap">
          <span className="relative pb-3 lg:pb-5">
            Why Do We
            <span className="absolute sm:block hidden left-0 w-[90%] bottom-0 h-[4px] bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B]"></span>
          </span>{" "}
          Need Your Help?
        </h1>
        <p className="font-montserrat text-base sm:text-xl font-medium 3xl:text-2xl !mt-5 md:!mt-8 3xl:!mt-9">
          Apache Pekko is an independent open-source project powered by volunteers in their free time.
        </p>
        <ul className="space-y-4 2xl:space-y-5 3xl:space-y-6 mt-9 !text-left">
          <h3 className="font-montserrat text-base sm:text-xl font-medium 3xl:text-[25px]">Ensuring a reliable Pekko cluster requires:</h3>
          {reliableData.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </ul>
        <p className="font-montserrat text-base xl:max-w-[520px] 3xl:max-w-[628px] sm:text-xl font-medium 3xl:text-2xl !mt-5 md:!mt-8">
          To make Pekko’s cluster reliability our top priority, we need your support.
        </p>
      </div>
    </section>
  );
};

export default WhyDoWeNeedYourHelp;
