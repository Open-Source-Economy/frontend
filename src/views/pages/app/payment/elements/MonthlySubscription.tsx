import React from "react";
import img1 from "src/assets/paymentimg1.png";
import clock from "src/assets/sand-clock.png";
import { useDowCounter } from "src/views/hooks";

interface MonthlySubscriptionProps {}

export function MonthlySubscription(props: MonthlySubscriptionProps) {
  const { counter, handleInputChange, increment, decrement } = useDowCounter();

  return (
    <>
      <h3 className="text-center text-[32px]">
        800 $ <span className="text-[16px]">/ Dow</span>
      </h3>
      <h4 className="text-[16px] text-center text-[#A1A7B0]">Monthly subscription</h4>
      <div className="mt-6">
        <div className="flex items-center gap-3">
          <img src={img1} className="w-[32px] h-[32px]" alt="" />
          <h3 className="text-[18px] text-white">Prioritise you Bug Fix</h3>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <img src={img1} className="w-[32px] h-[32px]" alt="" />
          <h3 className="text-[14px] text-white">Get support</h3>
          <button className="flex items-center gap-2 bg-gradient-to-r from-[#FF7E4B] to-[#FF518C] text-white px-3 py-[10px] rounded-[50px]">
            <img src={clock} className="w-5 h-5" alt="clock" />
            <h3 className="text-[12px] font-semibold">Coming Soon</h3>
          </button>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <img src={img1} className="w-[32px] h-[32px]" alt="" />
          <h3 className="text-[15px] text-[#A1A7B0] line-through">Save on future extra Dows</h3>
        </div>
        <div className="mt-4 bg-[rgba(255,255,255,10%)] rounded-[10px] py-[18px] px-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[#A1A7B0] text-xs">Receive:</h2>

              {/*TODO: refactor all counters*/}
              <input
                type="number"
                value={counter ? counter.toNumber() : undefined}
                placeholder="0.0"
                onChange={handleInputChange}
                className="borde-0 outline-none text-[18px] w-20 bg-transparent"
              />
            </div>
            <div>
              <h2 className="gradient-texts font-bold text-[18px]">
                DoW <span className="text-[14px]">/ month</span>
              </h2>
              <style>{`
                            .gradient-texts {
                              background: linear-gradient(
                                90deg,
                                #ff7e4b,
                                #ff518c
                              );
                              -webkit-background-clip: text;
                              -webkit-text-fill-color: transparent;
                            }
                          `}</style>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
