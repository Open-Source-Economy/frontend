import { useParams } from "react-router-dom";
import { Currency, ProjectId } from "src/api/model";
import { GetCampaignResponse } from "../../../../../api/dto";
import { config, Env } from "../../../../../ultils";
import { PreferredCurrency } from "../../../../../ultils/PreferredCurrency";
import { useAuth } from "../../../authenticate";
import { CompanyNumberBanner } from "./CompanyNumberBanner";
import { NonProfitBanner } from "./NonProfitBanner";
import { PaymentControls } from "./payment";
import { Progress } from "./Progress";
import { Summary } from "./summary";
import { paths } from "src/paths";
import { CampaignDescription } from "../../../../../model";

interface FundingCampaignProps {
  projectId: ProjectId;
  campaign: GetCampaignResponse & CampaignDescription;
}

export function FundingCampaign(props: FundingCampaignProps) {
  const { checkout_error } = useParams();
  const checkoutErrorParamName = "checkout_error";
  const paymentSuccessUrl = `${window.location.origin}${paths.CHECKOUT_SUCCESS}`;
  const paymentCancelUrl = `${window.location.href}?${checkoutErrorParamName}=true`;

  const auth = useAuth();

  const preferredCurrency: Currency = PreferredCurrency.get(auth);

  return (
    <section className="mt-14 sm:mt-20 3xl:!mt-[89px] !px-4 2xl:!px-0 relative xl:pb-14 pb-16 flex flex-col">
      <div className="bg-sunset-glow-gradient max-w-[548px] w-full h-full min-h-[500px] min-w-[260px] max-h-[1000px] absolute left-[5%] top-[60%] xl:top-[18%] blur-xl sm:blur-[125px] z-0 opacity-20 sm:opacity-35 !shrink-0 pointer-events-none -rotate-[103deg] rounded-full"></div>
      <div className="bg-gradient-to-l from-[#5935A1] to-[#AC3556] max-w-[402px] min-h-[500px] min-w-[270px] w-full h-full max-h-[1166px] absolute left-[5%] top-[18%] blur-[50px] sm:blur-[125px] z-0 opacity-25 sm:opacity-45 shrink-0 pointer-events-none -rotate-[41.351deg] rounded-full"></div>

      <div className="xl:max-w-[98%] 1400:max-w-[90%] 1500:max-w-[84%] 3xl:!max-w-[1560px] mx-auto flex justify-center xl:justify-between xl:!flex-nowrap flex-wrap gap-7 2xl:gap-10 3xl:gap-14">
        {/* Left Section */}
        <div className="max-w-[800px] relative z-10 w-full xl:!w-[59%] 3xl:max-w-[817px] mx-auto xl:!mx-0">
          <h4 className="py-2 flex justify-center mx-auto xl:!mx-0 items-center rounded-full bg-primary-user text-xs md:text-sm lg:text-base 2xl:text-lg 3xl:text-[18px] max-w-[160px] sm:max-w-[180px] lg:max-w-[240px] 3xl:max-w-[280px] w-full">
            Funding Campaign
          </h4>
          {props.campaign.summary && <Summary {...props.campaign.summary} />}
        </div>

        {/* Right Section */}
        <div className="max-w-[800px] xl:w-[40%] 3xl:!w-[672px] w-full relative z-20">
          {/*TODO*/}
          {checkout_error && <div className="text-red-500">Error in the checkout</div>}

          {props.campaign && (
            <>
              <div className="!bg-secondary py-10 w-full xl:py-11 3xl:py-12 !px-4 sm:!px-7 2xl:!px-10 3xl:!px-16 border !border-[#324053] rounded-2xl lg:rounded-[35px]">
                <Progress
                  preferredCurrency={preferredCurrency}
                  raisedAmount={props.campaign.raisedAmount}
                  targetAmount={props.campaign.targetAmount}
                  numberOfBackers={props.campaign.numberOfBackers}
                  numberOfDaysLeft={props.campaign.numberOfDaysLeft}
                />
                <PaymentControls
                  projectId={props.projectId}
                  preferredCurrency={preferredCurrency}
                  prices={props.campaign?.prices}
                  paymentSuccessUrl={paymentSuccessUrl}
                  paymentCancelUrl={paymentCancelUrl}
                />
              </div>
              <NonProfitBanner />
              {config.env !== Env.Production && <CompanyNumberBanner leftButtonText="Only $100/mo" rightButtonText="for 100 Companies" />}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
