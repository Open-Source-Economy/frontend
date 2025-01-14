import React, { useEffect, useState } from "react";
import { Currency } from "src/model";
import { displayedCurrencies } from "../../../../data";

interface ProgressProps {
  preferredCurrency: Currency;
  raisedAmount: Record<Currency, number>; // in cents, in the currency of the price
  targetAmount: Record<Currency, number>; // in cents, in the currency of the price
  numberOfBackers?: number;
  numberOfDaysLeft?: number;
}

export function Progress(props: ProgressProps) {
  const displayedCurrency = displayedCurrencies[props.preferredCurrency];

  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progressPercentage = Math.min((props.raisedAmount[props.preferredCurrency] / props.targetAmount[props.preferredCurrency]) * 100, 100);

  useEffect(() => {
    // Start with 0 and animate to the target percentage
    setAnimatedProgress(0);

    // Add a small delay to ensure the initial 0 state is rendered
    const timer = setTimeout(() => {
      setAnimatedProgress(progressPercentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [progressPercentage]);

  return (
    <>
      <div className="overflow-hidden">
        <div className="w-full bg-white bg-opacity-10 relative shadow-[inset_-2px_-2px_6px_rgba(72,100,125,0.10),4px_2px_6px_rgba(72,100,125,0.30)] rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] absolute left-0 z-10 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${animatedProgress}%` }}
            role="progressbar"
            aria-valuenow={animatedProgress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <h2 className="font-montserrat text-xl 2xl:text-[28px] font-medium !mt-2.5 3xl:!mt-4">
        {displayedCurrency.symbol}
        {(props.raisedAmount[props.preferredCurrency] / 100).toLocaleString()}/mo
      </h2>
      <p className="text-base font-montserrat opacity-80 2xl:text-lg 3xl:text-xl !mt-1.5">
        <span className="hidden">{props.raisedAmount[props.preferredCurrency].toLocaleString()} </span> pledged of {displayedCurrency.symbol}
        {(props.targetAmount[props.preferredCurrency] / 100).toLocaleString()}/mo
      </p>
      {(props.numberOfBackers || props.numberOfDaysLeft) && (
        <div className="flex gap-20 !mt-3 2xl:!mt-4 3xl:!mt-6">
          {props.numberOfBackers && (
            <div>
              <h3 className="text-xl 2xl:text-[25px] font-medium !mb-1.5">{props.numberOfBackers.toLocaleString()}</h3>
              <p className="text-sm xl:text-base 2xl:text-lg !leading-none 3xl:text-xl font-montserrat opacity-80">Backers</p>
            </div>
          )}

          {props.numberOfDaysLeft && (
            <div>
              <h3 className="text-xl 2xl:text-[25px] font-medium !mb-1.5">{props.numberOfDaysLeft}</h3>
              <p className="text-sm xl:text-base 2xl:text-lg !leading-none 3xl:text-xl font-montserrat opacity-80">Days to go</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
