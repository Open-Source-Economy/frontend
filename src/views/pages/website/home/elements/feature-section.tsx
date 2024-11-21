import { Link } from "react-router-dom";
import sec2icon2 from "src/assets/icon/sec2img3.png";
import sec2icon1 from "src/assets/sec2img.png";
import sec2icon3 from "src/assets/sec2img2.png";
import startimg from "src/assets/star.png";
import { Button } from "src/components/elements/Button";

export const FeaturesSection = () => {
  return (
    <div className="!z-[10] flex w-full items-center justify-center px-[30px] py-[40px] lg:py-[70px] min-[1279px]:px-0">
      <div className="z-[20] flex w-full max-w-[1250px] flex-wrap justify-center gap-6 1500:gap-[30px] min-[1600px]:max-w-[1305px]">
        {/* 1  */}
        <div
          data-aos="fade-left"
          data-aos-delay="0"
          className="box11 group flex w-full max-w-[550px] flex-col-reverse items-center justify-between gap-[20px] rounded-[30px] bg-[#14233A] px-[40px] py-[20px] max-[1279px]:max-w-[460px] max-[1279px]:py-12 max-[1024px]:max-w-[400px] lg:items-center lg:gap-0 lg:rounded-[50px] lg:px-[40px] lg:py-16 xl:flex-row 1500:max-w-[610px] min-[1600px]:px-[67px] min-[1600px]:py-[73px]"
        >
          <div className="max-[1200px]text-center flex-col items-center max-[1279px]:flex">
            <h1 className="font-mich text-[28px] font-[400] lg:text-[36px]">Get Paid</h1>
            <h2 className="font-most mt-[20px] w-full text-[16px] font-[400] leading-[1.5] max-[1279px]:text-center">
              Stop begging for donations! <br /> Fund your future. Have a Say
            </h2>
            <div className="mt-[42px]">
              <Button level="SECONDARY_DEVELOPER" size="MEDIUM" asChild>
                <Link to="/developer">
                  <span className="relative z-20">DEVELOPERS</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img className="h-[150px] w-[150px] object-cover sm:h-[178x] sm:w-[177px]" src={sec2icon1} alt="Get Paid Icon" />{" "}
            <div className="absolute left-[10px] top-[48px] sm:left-[16px] sm:top-[43px]">
              <img src={startimg} alt="" className="size-[45px] duration-300 group-hover:rotate-90" />
            </div>
          </div>
        </div>
        {/* 2  */}
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="box22 group flex w-full max-w-[550px] flex-col-reverse items-center justify-between rounded-[30px] bg-[#14233A] px-[40px] py-[20px] max-[1279px]:max-w-[460px] max-[1279px]:py-12 max-[1024px]:max-w-[400px] lg:items-center lg:gap-0 lg:rounded-[50px] lg:px-[40px] lg:py-16 xl:flex-row 1500:max-w-[610px] min-[1600px]:px-[67px] min-[1600px]:py-[73px]"
        >
          <div className="flex-col items-center max-[1279px]:flex max-[1200px]:text-center">
            <h1 className="font-mich text-nowrap text-[28px] font-[400] lg:text-[36px]">Get Support</h1>
            <h2 className="font-most mt-[20px] w-full text-[16px] font-[400] leading-[1.5] max-[1279px]:text-center">
              {" "}
              Forget the far west! Secure your <br /> platform, secure your business.
            </h2>
            <div className="mt-[42px]">
              <Button level="SECONDARY_USER" size="MEDIUM" asChild>
                <Link to="/developer">
                  <span className="relative z-20">OPEN SOURCE USERS</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img className="aspect-square h-[160px] w-[170px] sm:!h-[203px] sm:!min-w-[216px]" src={sec2icon2} alt="Get Paid Icon" />{" "}
            <div className="absolute right-[40px] top-[35px] sm:right-[60px] sm:top-[50px]">
              <img src={startimg} alt="" className="size-[45px] duration-300 group-hover:rotate-90" />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center md:col-span-2">
          {/* 3  */}
          <div
            data-aos="fade-left"
            data-aos-delay="400"
            className="box33 group flex max-w-[550px] flex-col-reverse items-center justify-between gap-[20px] rounded-[30px] bg-[#14233A] px-[40px] py-[20px] max-[1279px]:max-w-[460px] max-[1279px]:py-12 max-[1024px]:max-w-[400px] lg:gap-0 lg:rounded-[50px] lg:py-16 xl:flex-row xl:items-center 1500:max-w-[610px] min-[1600px]:max-w-[630px] min-[1600px]:px-[67px] min-[1600px]:py-[73px]"
          >
            <div className="max-[1200px]text-center relative w-fit flex-col items-center max-[1279px]:flex">
              <div className="absolute left-0 top-0 flex h-[102%] w-full items-center justify-start bg-[#14233A] opacity-0 duration-300 group-hover:!opacity-100">
                <h1 className="font-mich w-full text-[28px] font-[400] leading-[1.1] max-[1279px]:text-center lg:text-[45px]">
                  Coming <br /> Soon
                </h1>
              </div>
              <h1 className="font-mich text-[28px] font-[400] max-[1279px]:text-center lg:text-[36px]">Get a Stake</h1>
              <h2 className="font-most mt-[20px] w-full text-[20px] font-[400] leading-[1.4] max-[1279px]:text-center">
                {" "}
                Support, invest, or donate in <br /> projects to get a part of its <br />
                business, governance, and ecosystem.
              </h2>
            </div>
            <div className="relative">
              <img className="aspect-square h-[150px] w-[150px] object-cover sm:!h-[200px] sm:!w-[200px]" src={sec2icon3} alt="Get Paid Icon" />{" "}
              <div className="absolute bottom-[5px] left-[60px]">
                <img src={startimg} alt="" className="size-[45px] duration-300 group-hover:rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
