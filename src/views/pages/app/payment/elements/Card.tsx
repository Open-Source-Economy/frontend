import React, { useState } from "react";
import { Countries } from "src/views/pages/app/payment/elements/Countries";
import danger from "src/assets/danger.png";

interface CardProps {}

export function Card(props: CardProps) {
  const [error, setError] = useState<Error | null>(null);
  return (
    <>
      <div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Card number</label>
          <input type="text" placeholder="1234 1234 12234 1234" className="bg-[rgba(255,255,255,10%)] rounded-[10px] border-0 outline-0 p-3" />
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex flex-col gap-3">
            <label htmlFor="">Expiry Date</label>
            <input type="number" placeholder="DD/MM/YY" className="bg-[rgba(255,255,255,10%)] rounded-[10px] border-0 outline-0 p-3 w-100" />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="">CVC</label>
            <input type="number" placeholder="763" className="bg-[rgba(255,255,255,10%)] rounded-[10px] border-0 outline-0 p-3 w-100" />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-3">
          <label htmlFor="country">Country</label>

          <select id="country" name="country" className="bg-[rgba(255,255,255,10%)] rounded-[10px] border-0 p-3 form-select cursor-pointer  ">
            <Countries></Countries>
          </select>
        </div>
        <div className="flex items-start justify-center gap-3  mt-4">
          <input style={{ width: "28px" }} type="checkbox" id="customCheckbox" className="customCheckbox" />
          <p className="text-[14px] leading-6 text-[#ffffff]">
            By placing an order you agree with the{" "}
            <a href="javascript:void(0)" className="gradient-text fw-bold hover-effect">
              Terms of Use
            </a>{" "}
            and <a className="gradient-text fw-bold hover-effect cursor-pointer"> Terms of Sales</a>
          </p>

          <style>{`
                    .gradient-text {
                      background: linear-gradient(90deg, #ff7e4b, #ff518c);
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                    }
                    .hover-effect {
                      border-bottom: 1px solid transparent; /* Set a transparent border to allow border-image to show */
                      transition: border-bottom 0.3s ease;
                    }
                    .hover-effect:hover {
                      border-image: linear-gradient(90deg, #ff7e4b, #ff518c);
                      border-image-slice: 1;
                    }
                  `}</style>
        </div>
        <button onClick={() => undefined} className="sm:px-14 px-[20px]  py-3 mt-4 findbutton">
          Buy Now
        </button>
        {error && (
          <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#0E1E34] rounded-[50px] py-5 md:px-14 px-3 mx-3 flex items-center justify-center flex-col w-[100%] sm:w-[40%] lg:w-[32%] relative animate-slideInDown">
              <img src={danger} className="w-[91px] h-[85px]" alt="" />
              <h2 className="text-[32px] my-4 text-center">Payment Error</h2>
              <p className="text-[14px] text-center">
                Unfortunately there was an error while processing <br /> your payment.{" "}
              </p>

              <button onClick={() => setError(null)} className="sm:px-14 px-[20px]  py-3 mt-4 findbutton">
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
