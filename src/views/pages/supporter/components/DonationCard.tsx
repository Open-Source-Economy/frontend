import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/ui/forms/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/forms/select";
import { ToggleGroup, ToggleGroupItem } from "../../../components/ui/toggle-group";
import { CheckboxField } from "../../../components/ui/forms/checkbox-field";
import { type InputRef, ValidatedInputWithRef } from "../../../components/ui/forms/validated-input";
import { validateGitHubOwnerUrl, validatePositiveInteger } from "../../../components/ui/forms/validators";
import { AlertCircle, Github, Heart, Shield, TrendingUp } from "lucide-react";
import { getBackendAPI } from "src/services";
import * as dto from "@open-source-economy/api-types";
import { CampaignPriceType, CampaignProductType, CheckoutBody, CheckoutParams, CheckoutQuery, Currency, Price } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { paths } from "src/paths";
import { displayedCurrencies } from "src/views/v1/data";
import { NumberUtils } from "src/ultils/NumberUtils";
import { handleApiCall } from "src/ultils/handleApiCall";
import { openSourceEconomyProjectId } from "../../../../services/data/projects";
import { GithubUrls } from "src/ultils/GithubUrls";
import { useCurrency } from "../../../../context/CurrencyContext";

interface DonationCardProps {
  className?: string;
}

export function DonationCard({ className }: DonationCardProps) {
  const backendAPI = getBackendAPI();
  const { checkout_error } = useParams();
  const { preferredCurrency, setPreferredCurrency } = useCurrency();
  const displayedCurrency = displayedCurrencies[preferredCurrency];

  // Campaign state
  const [campaign, setCampaign] = useState<dto.GetCampaignResponse | null>(null);
  const [loadCampaignError, setLoadCampaignError] = useState<ApiError | null>(null);
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(false);

  // Fetch campaign on mount
  useEffect(() => {
    const apiCall = async () => {
      const params: dto.GetCampaignParams = {
        owner: openSourceEconomyProjectId.login,
        repo: undefined,
      };
      const query: dto.GetCampaignQuery = {};
      return await backendAPI.getCampaign(params, query);
    };

    const onSuccess = (response: dto.GetCampaignResponse) => {
      setCampaign(response);
    };

    handleApiCall(apiCall, setIsLoadingCampaign, setLoadCampaignError, onSuccess);
  }, []);

  // Donation form state
  const [priceType, setPriceType] = useState<CampaignPriceType>(CampaignPriceType.MONTHLY);
  const campaignProductType = CampaignProductType.DONATION;
  const [selectedPriceIndex, setSelectedPriceIndex] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  const [listPublicly, setListPublicly] = useState<boolean>(false);
  const [githubProfile, setGithubProfile] = useState<string>("");
  const githubProfileInputRef = useRef<InputRef>(null);
  const [selectedPrice, setSelectedPrice] = useState<Price | null>(null);

  // Create validator function that always has access to current listPublicly state
  const githubProfileValidator = React.useCallback(
    (value: string) => {
      if (listPublicly) {
        return validateGitHubOwnerUrl(value, true);
      }
      return undefined;
    },
    [listPublicly],
  );

  // Checkout state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  // Handle custom amount change - only allow positive integers
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only digits, no decimals
    // Clear selected price index when custom amount is entered
    if (value) {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue > 0) {
        setCustomAmount(numValue);
        setSelectedPriceIndex(null);
      } else {
        setCustomAmount(null);
      }
    } else {
      setCustomAmount(null);
    }
  };

  // Update selected price when selection changes - following PaymentControls pattern
  useEffect(() => {
    if (campaign?.prices && selectedPriceIndex !== null) {
      setSelectedPrice(campaign.prices[priceType][preferredCurrency][campaignProductType][selectedPriceIndex]);
      // Clear custom amount when a predefined price is selected
      setCustomAmount(null);
    } else if (customAmount && customAmount > 0) {
      // For custom amounts, we'd need to create a price dynamically
      // For now, we'll need to find the closest price or use a base price
      // This is a placeholder - you may need to adjust based on your Stripe setup
      setSelectedPrice(null);
    } else {
      setSelectedPrice(null);
    }
  }, [campaign?.prices, priceType, preferredCurrency, campaignProductType, selectedPriceIndex, customAmount]);

  const checkoutErrorParamName = "checkout_error";
  const paymentSuccessUrl = `${window.location.origin}${paths.CHECKOUT_SUCCESS}`;
  const paymentCancelUrl = `${window.location.href.split("?")[0]}?${checkoutErrorParamName}=true`;

  const handleCheckout = async () => {
    // Validate custom amount if entered
    if (customAmount !== null) {
      const customAmountError = validatePositiveInteger(customAmount);
      if (customAmountError) {
        setError(new ApiError(undefined, undefined, customAmountError.error || "Invalid amount"));
        return;
      }
    }

    // Check if either a price is selected or a custom amount is entered
    if (!selectedPrice && (!customAmount || customAmount <= 0)) {
      setError(new ApiError(undefined, undefined, "Please select an amount or enter a custom amount"));
      return;
    }

    // For custom amounts, we need to handle them differently
    // This is a placeholder - you may need to create a custom price or use a different Stripe flow
    if (customAmount && customAmount > 0 && !selectedPrice) {
      setError(new ApiError(undefined, undefined, "Custom amounts are not yet supported. Please select a predefined amount."));
      return;
    }

    if (!selectedPrice) {
      setError(new ApiError(undefined, undefined, "Please select an amount"));
      return;
    }

    // Validate GitHub profile if listPublicly is true - MUST pass before backend call
    if (listPublicly) {
      // Validate using the input ref validator - this will show errors in the input field
      const isGithubProfileValid = githubProfileInputRef.current?.validate(true) ?? false;
      if (!isGithubProfileValid) {
        return;
      }
    }

    // Only proceed to backend if all validations pass
    setIsLoading(true);
    setError(null);

    try {
      // Extract OwnerId from GitHub profile if listPublicly is true
      let metadata: Record<string, string> | undefined = undefined;
      if (listPublicly && githubProfile) {
        const githubOwnerId = GithubUrls.extractOwnerId(githubProfile, true);
        if (githubOwnerId) {
          metadata = { githubOwnerLogin: githubOwnerId.login };
        }
      }

      const params: CheckoutParams = {};
      const body: CheckoutBody = {
        mode: priceType === CampaignPriceType.MONTHLY ? "subscription" : "payment",
        priceItems: [
          {
            priceId: selectedPrice.price.stripeId,
            quantity: selectedPrice.quantity,
          },
        ],
        countryCode: null, // TODO: Add country code based on user's location
        successUrl: paymentSuccessUrl,
        cancelUrl: paymentCancelUrl,
        metadata: metadata,
      };
      const query: CheckoutQuery = {};

      const response = await backendAPI.checkout(params, body, query);
      if (response instanceof ApiError) {
        setError(response);
      } else {
        // Redirect to Stripe Checkout
        window.location.href = response.redirectUrl;
      }
    } catch (err) {
      console.error("Failed to initiate checkout:", err);
      setError(ApiError.from(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      {/* Checkout Error Banner */}
      {checkout_error && (
        <div className="mb-6">
          <div className="bg-brand-error/10 border border-brand-error/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-brand-error flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-brand-error font-medium">Payment was cancelled or failed</p>
              <p className="text-brand-neutral-600 text-sm mt-1">
                Your payment could not be processed. Please try again or contact support if the problem persists.
              </p>
            </div>
          </div>
        </div>
      )}

      <Card className="border-2 border-brand-neutral-300 bg-gradient-to-br from-brand-card-blue to-brand-card-blue-dark shadow-2xl">
        <CardContent className="p-6 space-y-5">
          <div className="text-center border-b border-brand-neutral-300 pb-4">
            <h3 className="text-brand-neutral-900 mb-1">Choose Your Support Level</h3>
            <p className="text-brand-neutral-600 text-sm">Every contribution helps sustain the open source ecosystem</p>
          </div>

          {/* Frequency Toggle */}
          <div className="text-center">
            <div className="space-y-2.5">
              <ToggleGroup
                type="single"
                value={priceType}
                onValueChange={value => value && setPriceType(value as CampaignPriceType)}
                className="inline-flex p-1.5 bg-brand-card-blue border border-brand-neutral-300 rounded-lg"
              >
                <ToggleGroupItem
                  value={CampaignPriceType.MONTHLY}
                  className="relative px-5 py-2 data-[state=on]:bg-brand-accent data-[state=on]:text-brand-secondary cursor-pointer"
                >
                  Monthly
                  {priceType === CampaignPriceType.MONTHLY && (
                    <span className="absolute -top-2 -right-2 bg-brand-success text-brand-secondary px-1.5 py-0.5 rounded-md text-xs">Best</span>
                  )}
                </ToggleGroupItem>
                <ToggleGroupItem
                  value={CampaignPriceType.ONE_TIME}
                  className="px-5 py-2 data-[state=on]:bg-brand-accent data-[state=on]:text-brand-secondary cursor-pointer"
                >
                  One-time
                </ToggleGroupItem>
              </ToggleGroup>
              <p className="text-brand-neutral-600 text-xs flex items-center justify-center gap-1.5">
                <TrendingUp className="h-3 w-3 text-brand-success" />
                Monthly donations help us plan long-term
              </p>
            </div>
          </div>

          {/* Suggested Amounts */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-sm text-brand-neutral-700">Select Amount {priceType === CampaignPriceType.MONTHLY && "(per month)"}</label>
              <div className="inline-flex items-center opacity-50">
                <Select value={preferredCurrency} onValueChange={value => setPreferredCurrency(value as Currency)}>
                  <SelectTrigger className="h-7 w-28 text-xs border-brand-neutral-300/30 bg-transparent cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(displayedCurrencies).map(([key, curr]) => (
                      <SelectItem key={key} value={key}>
                        {curr.symbol} {curr.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amount Selection - Using prices from backend */}
            {campaign?.prices &&
              campaign.prices[priceType] &&
              campaign.prices[priceType][preferredCurrency] &&
              campaign.prices[priceType][preferredCurrency][campaignProductType] && (
                <div className="grid grid-cols-3 gap-2.5">
                  {campaign.prices[priceType][preferredCurrency][campaignProductType].map((price: Price, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedPriceIndex(index);
                        setCustomAmount(null);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                        selectedPriceIndex === index && !customAmount
                          ? "border-brand-accent bg-brand-accent/10 text-brand-accent shadow-lg shadow-brand-accent/20"
                          : "border-brand-neutral-300 text-brand-neutral-700 hover:border-brand-accent/50 hover:bg-brand-accent/5"
                      }`}
                    >
                      <div className="text-xl">{NumberUtils.toLocaleStringPrice(price.totalAmount, preferredCurrency)}</div>
                    </button>
                  ))}
                  {/* Custom Amount Input */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-neutral-600 z-10">{displayedCurrency.symbol}</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={customAmount !== null ? customAmount.toString() : ""}
                      onChange={handleCustomAmountChange}
                      onKeyDown={e => {
                        if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === ".") {
                          e.preventDefault();
                        }
                      }}
                      placeholder="Custom"
                      className="w-full h-full p-3 pl-8 pr-4 bg-brand-secondary border-2 border-brand-neutral-300 rounded-lg text-brand-neutral-900 placeholder:text-brand-neutral-500 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition-all"
                    />
                  </div>
                </div>
              )}

            {/* Fallback: Show placeholder when no prices available */}
            {(!campaign?.prices || !campaign.prices[priceType]?.[preferredCurrency]?.[campaignProductType]?.length) && (
              <div className="bg-brand-warning/10 border border-brand-warning/30 rounded-lg p-4 text-center">
                <p className="text-brand-neutral-700 text-sm">Sponsorship options are being configured. Please check back soon.</p>
              </div>
            )}

            {/* Error handling for campaign loading */}
            {loadCampaignError && (
              <div className="bg-brand-error/10 border border-brand-error/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-brand-error flex-shrink-0 mt-0.5" />
                <p className="text-brand-error text-sm">{loadCampaignError.message}</p>
              </div>
            )}
          </div>

          {/* Public Recognition Option */}
          <div>
            <CheckboxField
              id="list-publicly"
              checked={listPublicly}
              onCheckedChange={checked => {
                setListPublicly(checked);
                // Validate GitHub profile when checkbox is checked
                if (checked && githubProfile) {
                  githubProfileInputRef.current?.validate(true);
                }
              }}
              label="List me publicly for recognition"
              description="Your GitHub profile will be featured on our sponsors page"
            >
              <ValidatedInputWithRef
                ref={githubProfileInputRef}
                label="GitHub Profile URL"
                name="github-profile"
                type="url"
                value={githubProfile}
                onChange={setGithubProfile}
                placeholder="https://github.com/yourusername"
                leftIcon={Github}
                validator={githubProfileValidator}
              />
            </CheckboxField>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-brand-error/10 border border-brand-error/30 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-brand-error flex-shrink-0 mt-0.5" />
              <p className="text-brand-error text-sm">{error.message}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            size="lg"
            className="w-full"
            leftIcon={Heart}
            disabled={(!selectedPrice && (!customAmount || customAmount <= 0)) || isLoading}
            loading={isLoading}
            loadingText="Processing..."
            onClick={handleCheckout}
          >
            {(() => {
              const formattedPrice = selectedPrice
                ? `${NumberUtils.toLocaleStringPrice(selectedPrice.totalAmount, preferredCurrency)}${priceType === CampaignPriceType.MONTHLY ? "/mo" : ""}`
                : "";

              return selectedPrice
                ? campaignProductType === CampaignProductType.DONATION
                  ? `Donate ${formattedPrice}`
                  : `Support with ${formattedPrice}`
                : "Select an amount to donate";
            })()}
          </Button>

          {/* Trust Indicator */}
          <div className="text-center text-xs text-brand-neutral-500 pt-3 border-t border-brand-neutral-300">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-3.5 w-3.5 text-brand-success" />
              <span>Secure payment • Supporting platform operations</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
