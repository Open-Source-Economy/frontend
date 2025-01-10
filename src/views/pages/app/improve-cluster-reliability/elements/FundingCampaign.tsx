import React, { useEffect } from "react";
import { NonProfitBanner } from "./NonProfitBanner";
import { PaymentControls } from "./payment";
import { Progress } from "./Progress";
import { LinearBg } from "src/Utils/Icons";
import { Currency, RepositoryId } from "src/model";
import { Summary, SummaryType } from "./summary";
import { useAuth } from "../../authenticate/AuthContext";
import { useCampaign } from "../../../../hooks/useCampaign";
import { useParams } from "react-router-dom";

interface FundingCampaignProps {
  repositoryId: RepositoryId;
}

export function FundingCampaign(props: FundingCampaignProps) {
  const { checkout_error } = useParams();
  const checkoutErrorParamName = "checkout_error";
  const paymentSuccessUrl = `${window.location.origin}/checkout/success`;
  const paymentCancelUrl = `${window.location.href}?${checkoutErrorParamName}=true`; // Keep the user on the same page if they cancel

  const auth = useAuth();
  const summaryType: SummaryType = SummaryType.ONE;

  const preferredCurrency: Currency = auth.authInfo?.user?.preferredCurrency || Currency.EUR;

  const { campaign, error, reloadCampaign } = useCampaign(props.repositoryId);

  useEffect(() => {
    reloadCampaign();
  }, []);

  return (
    <section className="mt-14 sm:mt-20 3xl:!mt-[89px] !px-4 2xl:!px-0 relative xl:pb-14 flex flex-col">
      <div className="!bg-sunset-glow-gradient max-w-[548px] w-full h-full min-h-[500px] min-w-[260px] max-h-[1000px] absolute left-[5%] top-[60%] xl:top-[18%] blur-[125px] -z-0 opacity-35 !shrink-0 pointer-events-none -rotate-[103deg] rounded-full"></div>
      <div className="bg-gradient-to-l from-[#5935A1] to-[#AC3556] max-w-[402px] min-h-[500px] min-w-[270px] w-full h-full max-h-[1166px] absolute left-[5%] top-[18%] blur-[125px] -z-0 opacity-45 shrink-0 pointer-events-none  -rotate-[41.351deg] rounded-full"></div>
      <span className="right-0 absolute bottom-[17%] lg:bottom-0 -z-10">
        <LinearBg />
      </span>
      <div className="xl:max-w-[98%] 1400:max-w-[90%] 1500:max-w-[84%] 3xl:!max-w-[1560px] mx-auto flex justify-center xl:justify-between xl:!flex-nowrap flex-wrap gap-7 2xl:gap-10 3xl:gap-14">
        {/* Left Section */}
        <div className="max-w-[800px] relative z-10 w-full xl:!w-[59%] 3xl:max-w-[817px] mx-auto xl:!mx-0">
          <h4 className="py-2.5 flex justify-center mx-auto xl:!mx-0 items-center rounded-full bg-primary-user text-sm md:text-base lg:text-lg font-montserrat 2xl:text-xl 3xl:text-[25px] max-w-[170px] sm:max-w-[200px] lg:max-w-[270px] 3xl:max-w-[315px] w-full">
            Funding Campaign
          </h4>

          <Summary summaryType={summaryType} />
        </div>

        {/* Right Section */}
        <div className="max-w-[800px] xl:w-[40%] 3xl:!w-[672px] w-full relative z-20">
          {/*TODO*/}
          {error && <div className="text-red-500">{error.message}</div>}
          {checkout_error && <div className="text-red-500">Error in the checkout</div>}

          {campaign && (
            <>
              <div className="!bg-secondary py-10 w-full xl:py-11 3xl:py-12 !px-4 sm:!px-7 2xl:!px-10 3xl:!px-16 border !border-[#324053] rounded-2xl lg:rounded-[35px]">
                <Progress
                  preferredCurrency={preferredCurrency}
                  raisedAmount={campaign.raisedAmount}
                  targetAmount={campaign.raisedAmount}
                  numberOfBackers={campaign.numberOfBackers}
                  numberOfDaysLeft={campaign.numberOfDaysLeft}
                />
                <PaymentControls
                  repositoryId={props.repositoryId}
                  preferredCurrency={preferredCurrency}
                  prices={campaign?.prices}
                  paymentSuccessUrl={paymentSuccessUrl}
                  paymentCancelUrl={paymentCancelUrl}
                />
              </div>
              <NonProfitBanner />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
