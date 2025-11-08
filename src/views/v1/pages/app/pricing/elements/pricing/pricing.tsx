import React, { useState } from "react";
import { CheckoutBody, CheckoutParams, CheckoutQuery, Currency, PlanPriceType, StripePrice } from "@open-source-economy/api-types";
import { Check, X } from "lucide-react";
import { InfoTooltip } from "../tooltip";
import { PlanDescription } from "../data/data";
import { PricingDetails } from "./PricingDetails";
import { NumberUtils } from "../../../../../../../ultils/NumberUtils";
import { ApiError } from "../../../../../../../ultils/error/ApiError";
import { getBackendAPI } from "../../../../../../../services";
import { paths } from "../../../../../../../paths";
import { PreferredCurrency } from "../../../../../../../ultils/PreferredCurrency";
import { useAuth } from "../../../../../../auth";

export enum PricingCategory {
  GET_STARTED, // user can select this plan (they don't have a plan yet)
  SELECTED, // user has this plan selected
  UPGRADE, // user can upgrade to this plan
  DOWNGRADE, // user can downgrade to this plan
}

interface PricingProps {
  planDescription: PlanDescription;
  priceType: PlanPriceType;
  prices: Record<Currency, Record<PlanPriceType, StripePrice>> | null;
  pricingCategory: PricingCategory;
  aosDelay: number;
}

export function Pricing(props: PricingProps) {
  const auth = useAuth();
  const preferredCurrency: Currency = PreferredCurrency.get(auth);

  const backendAPI = getBackendAPI();

  const checkoutErrorParamName = "checkout_error";
  const paymentSuccessUrl = `${window.location.origin}${paths.CHECKOUT_SUCCESS}`;
  const paymentCancelUrl = `${window.location.href}?${checkoutErrorParamName}=true`;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null); // TODO: Display error

  const handleCheckout = async (price: StripePrice) => {
    setIsLoading(true);
    try {
      const params: CheckoutParams = {};
      const body: CheckoutBody = {
        mode: "subscription",
        priceItems: [
          {
            priceId: price.stripeId,
            quantity: 1,
          },
        ],
        countryCode: null, // TODO: Add country code base on user's location
        successUrl: paymentSuccessUrl,
        cancelUrl: paymentCancelUrl,
      };
      const query: CheckoutQuery = {};

      const response = await backendAPI.checkout(params, body, query);
      if (response instanceof ApiError) {
        setError(response);
      } else {
        window.location.href = response.redirectUrl;
      }
    } catch (error) {
      console.error("Failed to initiate checkout:", error);
      setError(ApiError.from(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        key={props.planDescription.name}
        data-aos="fade-up"
        data-aos-delay={props.aosDelay}
        data-aos-duration="1000"
        className={`group relative p-0.5 rounded-[20px] transition-all duration-300 ease-in-out bg-gradient-to-r ${
          props.planDescription.featured
            ? "from-gradient-1 to-gradient-1"
            : "from-theme-blue to-theme-blue hover:from-gradient-1 hover:via-gradient-2 hover:to-gradient-3"
        }`}
      >
        <div
          className={`absolute inset-0 z-0 h-full w-full bg-theme-blue ${
            props.planDescription.featured ? "bg-opacity-0" : "bg-opacity-100"
          } group-hover:bg-opacity-0 shadow-[0_0_25px] shadow-[#D06663]/0 group-hover:shadow-[#D06663]/25 rounded-[20px] transition-all duration-300`}
        />
        <div
          className={`
              relative h-full rounded-[20px] px-6 py-9 bg-theme-blue transition-all
            `}
        >
          {props.planDescription.featured && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-1 text-white text-xs font-semibold rounded-full">
              MOST POPULAR
            </div>
          )}

          <div className="space-y-3">
            <div className="text-center space-y-3">
              <h3 className="text-2xl md:text-[26px] font-light font-michroma text-theme-pink">{props.planDescription.name}</h3>
              <p className="text-sm text-white">{props.planDescription.description}</p>
            </div>

            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2">
                {props.prices && (
                  <>
                    {props.priceType === PlanPriceType.ANNUALLY && (
                      <span className="text-gray-500 line-through text-sm md:text-[22px]">
                        {NumberUtils.toLocaleStringPrice(props.prices[preferredCurrency][PlanPriceType.MONTHLY].unitAmount, preferredCurrency)}
                      </span>
                    )}
                    <span className="text-4xl md:text-[38px] font-bold">
                      {props.priceType === PlanPriceType.ANNUALLY &&
                        NumberUtils.toLocaleStringPrice(props.prices[preferredCurrency][props.priceType].unitAmount / 12, preferredCurrency)}
                      {props.priceType === PlanPriceType.MONTHLY &&
                        NumberUtils.toLocaleStringPrice(props.prices[preferredCurrency][props.priceType].unitAmount, preferredCurrency)}
                    </span>
                  </>
                )}
              </div>
              <div className="text-xs text-gray-400">per month{props.priceType === PlanPriceType.ANNUALLY ? ", paid annually" : ""}</div>
            </div>

            {props.pricingCategory === PricingCategory.SELECTED ? (
              <div className="p-[18px] text-center text-theme-pink text-sm font-medium">Current Plan</div>
            ) : (
              <div className="p-0.5 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 rounded-lg">
                {props.prices && (
                  <button
                    type="button"
                    onClick={() => {
                      handleCheckout(props.prices![preferredCurrency][props.priceType]);
                    }}
                    className={`
                    w-full p-[14px] rounded-lg bg-theme-blue hover:bg-opacity-80 transition-all duration-300 group/btn ${
                      props.pricingCategory === PricingCategory.UPGRADE || props.pricingCategory === PricingCategory.GET_STARTED
                        ? "bg-opacity-0"
                        : "bg-opacity-100" // PricingCategory.DOWNGRADE
                    } ${isLoading ? "opacity-50" : ""}`}
                    disabled={isLoading}
                  >
                    <span
                      className={`group-hover/btn:text-white w-full transition font-semibold text-sm bg-clip-text bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 ${
                        props.pricingCategory === PricingCategory.UPGRADE || props.pricingCategory === PricingCategory.GET_STARTED
                          ? "text-white"
                          : "text-transparent" // PricingCategory.DOWNGRADE
                      }`}
                    >
                      {props.pricingCategory === PricingCategory.UPGRADE && "UPGRADE PLAN"}
                      {props.pricingCategory === PricingCategory.DOWNGRADE && "SELECT PLAN"}
                      {props.pricingCategory === PricingCategory.GET_STARTED && "GET STARTED"}
                    </span>
                  </button>
                )}
              </div>
            )}

            <div className="grid gap-3">
              {props.planDescription.features.map((feature, i) => (
                <>
                  <hr key={feature.name} className="border-white/20 border-2" />
                  {feature.title && <div className="font-semibold text-center text-theme-pink">{feature.title}</div>}
                  <div key={feature.name} className={`flex items-start gap-1.5 ${!feature.included && "opacity-30"} ${i === 2 ? "md:min-h-[140px]" : ""}`}>
                    {feature.included ? <Check className="h-6 w-6 text-theme-pink shrink-0" /> : <X className="h-5 w-5 text-theme-pink shrink-0 mt-0.5" />}
                    <div className="space-y-1">
                      <div className="inline-block space-x-2">
                        <span className="font-semibold">{feature.name}</span>
                        {feature.info && feature.included && <InfoTooltip content={feature.info} />}
                      </div>
                      <PricingDetails description={feature.detailsDescription} details={feature.details} />
                      {feature.extrasDescription && <PricingDetails description={feature.extrasDescription} details={feature.extras} />}
                      {feature.subtext && <p className="text-xs text-gray-400">{feature.subtext}</p>}
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
