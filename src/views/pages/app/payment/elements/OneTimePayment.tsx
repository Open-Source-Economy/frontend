import React from "react";
import img1 from "src/assets/paymentimg1.png";
import clock from "src/assets/sand-clock.png";
import up from "src/assets/arrowup.png";
import down from "src/assets/arrowdown.png";
import { useDowCounter } from "src/views/hooks";

interface OneTimePaymentProps {}

export function OneTimePayment(props: OneTimePaymentProps) {
  const { counter, handleInputChange, increment, decrement } = useDowCounter();

  return (
    <>
      <h3 className="text-center text-[32px]">
        1000 $ <span className="text-[16px]">/ Dow</span>
      </h3>
      <h4 className="text-[16px] text-center text-[#A1A7B0]">One time payment</h4>
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
            <h3 className="text-[12px]  font-semibold">Coming Soon</h3>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-3">
        <img src={img1} className="w-[32px] h-[32px]" alt="" />
        <h3 className="text-[15px]  text-[#A1A7B0] line-through">Back long-term maintenance</h3>
      </div>
      <div className="mt-4 bg-[rgba(255,255,255,10%)] rounded-[10px] py-3 px-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[#A1A7B0] text-xs">Get:</h2>
            <div className="d-flex items-center gap-2 mt-1">
              {/*TODO: for all pointer Refactor */}
              <input
                type="number"
                value={counter ? counter.toNumber() : undefined}
                placeholder="0.0"
                onChange={handleInputChange}
                className="border-0 outline-none text-[18px] w-20 bg-transparent"
              />

              <div className="d-flex flex-col gap-2">
                <img src={up} className="w-[14px] h-2 cursor-pointer " onClick={increment} alt="" />
                <img
                  src={down}
                  className={`w-[14px] h-2 cursor-pointer ${counter?.isZero() ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={decrement}
                  alt=""
                  style={{
                    pointerEvents: counter?.isZero() ? "none" : "auto",
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="gradient-texts font-bold">DoW</h2>
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
    </>
  );
}
