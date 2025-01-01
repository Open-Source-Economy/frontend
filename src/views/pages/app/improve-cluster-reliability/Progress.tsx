import React, { useState, useEffect } from "react";

interface ProgressSectionProps {
  currentAmount: number;
  targetAmount: number;
  backers: number;
  daysLeft: number;
}

const Progress: React.FC<ProgressSectionProps> = ({ currentAmount, targetAmount, backers, daysLeft }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100);

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

      <h2 className="font-montserrat text-xl 2xl:text-2xl 3xl:text-[28px] font-medium !mt-2.5 3xl:!mt-4">${currentAmount.toLocaleString()}/mo</h2>
      <p className="text-base font-montserrat opacity-80 2xl:text-lg 3xl:text-xl !mt-1.5">
        $ <span className="hidden">{currentAmount.toLocaleString()} </span> pledged of ${targetAmount.toLocaleString()}/mo
      </p>
      <div className="flex gap-20 !mt-3 2xl:!mt-4 3xl:!mt-6">
        <div>
          <h3 className="text-xl 2xl:text-[22px] 3xl:text-[25px] font-medium !mb-1.5">{backers.toLocaleString()}</h3>
          <p className="text-sm xl:text-base 2xl:text-lg !leading-none 3xl:text-xl font-montserrat opacity-80">Backers</p>
        </div>

        <div>
          <h3 className="text-xl 2xl:text-2xl 3xl:text-[25px] font-medium !mb-1.5">{daysLeft}</h3>
          <p className="text-sm xl:text-base 2xl:text-lg !leading-none 3xl:text-xl font-montserrat opacity-80">Days to go</p>
        </div>
      </div>
    </>
  );
};

export default Progress;
