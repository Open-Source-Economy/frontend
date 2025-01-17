import React from "react";
import { BaseURL } from "../../../../App";
import { PageWrapper } from "../../PageWrapper";
import { Link, useLocation } from "react-router-dom";
import catimg from "src/assets/catimg.png";
import FeatureItem from "./Feature";
import { Button } from "src/components";
import chatbox from "src/assets/chat-box.png";
import bg from "src/assets/checkout-bg.png";
import { Audience } from "../../../Audience";
import { config, Env } from "../../../../ultils";

interface CheckoutSuccessProps {}

export function CheckoutSuccess(props: CheckoutSuccessProps) {
  const audience: Audience = Audience.ALL;

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const session_id = queryParams.get("session_id");
  const mode = queryParams.get("mode");

  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <div className="py-28 min-h-screen grid place-items-center  relative overflow-hidden">
        <img src={bg} className="absolute -top-[5%] left-1/2 -translate-x-1/2 object-contain  size-[120%]" alt="" />
        <div className="1200:max-w-[957px] max-w-[85%] relative z-20 flex flex-col items-center  mx-auto  bg-primaryBg rounded-[50px]">
          <div className="800:w-[58%] w-full ml-auto flex 800:justify-start justify-end pt-6 md:pr-5 pr-2 sm:pr-12">
            <div className="flex justify-end -mr-6 800:mr-0 lg:w-[176px] lg:mt-24 500:mt-20 mt-[55px]  h-[160px] w-[160px] md:w-[180px] 900:w-[156px] md:h-[200px] lg:h-[242px]">
              <img src={catimg} className="w-full h-full object-contain" alt="" />
            </div>
            <div className="relative mt-1 flex justify-center pt-[30px] lg:w-[270px] 800:w-[380px] sm:w-[190px] w-[140px] 400:w-[170px] h-[65px] 600:h-auto 500:w-[180px] ">
              <img src={chatbox} className="object-contain absolute top-0 left-0" alt="" />
              <h4 className="text-center sm:-mt-2 md:-mt-4 800:-mt-1 500:-mt-2 350:-mt-2 -mt-3  lg:text-xl sm:text-sm text-[11px] 400:text-[13px] md:text-base">
                Open Source
                <span className="mb-1 -mt-1 block">Independence:</span>
                <span className="font-semibold mr-2 ">Supported</span>
                <span className="text-transparent bg-clip-text gradient-bg font-semibold">by You</span>
              </h4>
            </div>
          </div>

          <div className="lg:px-20 lg:pb-20 pb-9 sm:px-9 px-7 w-full mt-6 600:mt-0  flex flex-col items-center text-center">
            <h1 className="text-white lg:text-[40px] text-[30px]   font-michroma mb-4 font-space">Thank you so much!</h1>
            <p className="text-white lg:text-2xl text-lg md:text-xl mb-8 font-semibold">
              {config.env === Env.Production ? (
                <>
                  You're making a <span className="text-transparent bg-clip-text dow-gradient">real </span>impact!
                </>
              ) : (
                <>
                  You will receive <span className="text-transparent bg-clip-text dow-gradient">0.3 DoW/mo</span>
                </>
              )}
            </p>
            {config.env !== Env.Production && (
              <>
                <div className="border 900:min-w-[726px] sm:min-w-[95%] min-w-[100%] mt-1 border-white rounded-[20px] p-4 sm:p-8 mb-8">
                  <h2 className="text-white lg:text-2xl text-lg md:text-xl mb-6 text-left">You can use them to:</h2>
                  <div className="space-y-6">
                    <FeatureItem title="Get a new feature" audience={audience} />
                    <FeatureItem title="Prioritise bug fix" audience={audience} />
                    <FeatureItem title="Get support" audience={audience} isComingSoon={true} />
                  </div>
                  <button className="text-[#FF4785] hover:underline lg:text-2xl text-base sm:text-lg md:text-xl mt-6 block text-left transition-colors font-medium ">
                    See more details...
                  </button>
                </div>
              </>
            )}

            <Button audience={audience} level="PRIMARY" size="MEDIUM" asChild>
              <Link to="/fund-issues">GET STARTED</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
