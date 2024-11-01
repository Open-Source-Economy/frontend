import React, { ChangeEvent, useRef, useState } from "react";
import up from "src/assets/arrowup.png";
import down from "src/assets/arrowdown.png";
import { DOW_INCREMENT } from "src/ultils";

interface DowCreditsProps {
  onCreditsSuccess: (credits: number) => void;
}

export function DowCredits(props: DowCreditsProps) {
  const [counter, setCounter] = useState(10);
  const [inputValue, setInputValue] = useState(10);
  const inputRef = useRef(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setInputValue(value);
    setCounter(value);
  };

  const increment = () => {
    setCounter(counter + DOW_INCREMENT);
  };
  const decrement = () => {
    setCounter(counter - DOW_INCREMENT);
  };

  const fundIssue = () => {
    props.onCreditsSuccess(counter);
  };

  return (
    <>
      <h2 className="text-end montserrat text-[20px]">
        Your Credits <span className="text-[#8693A4] text-[20px]">-</span> <span className="text-[#FF518C] cursor-pointer hover:underline">10 DoW</span>
      </h2>
      <div className="mt-4 bg-[rgba(255,255,255,10%)] rounded-[10px] py-[15px] px-3 w-[100%]">
        <div className="flex items-center gap-4 justify-between">
          <div>
            <h2 className="text-[#A1A7B0] text-lg">Fund</h2>
            <div className="d-flex items-center gap-3 mt-1">
              <input
                type="number"
                ref={inputRef}
                value={counter}
                placeholder="10"
                onChange={handleInputChange}
                className="border-0 outline-none md:text-[33px] text-[20px] md:w-44 sm:w-28 w-20 bg-transparent"
              />

              <div className="d-flex flex-col gap-2">
                <img src={up} className="md:w-[22px] w-[18px] h-3 cursor-pointer " onClick={() => increment()} alt="" />
                <img
                  src={down}
                  className={`md:w-[22px] w-[18px] h-3 cursor-pointer ${counter === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => {
                    if (counter > 0) decrement();
                  }}
                  alt=""
                  style={{
                    pointerEvents: counter === 0 ? "none" : "auto",
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="gradient-texts font-bold md:text-[33px] text-[20px] mt-4">DoW</h2>
            <style>{`
                    .gradient-texts {
                      background: linear-gradient(90deg, #ff7e4b, #ff518c);
                      -webkit-background-clip: text;
                      -webkit-text-fill-color: transparent;
                    }
                  `}</style>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-center items-center gap-3">
        {/*TODO: replace by generic button*/}
        <button
          onClick={fundIssue}
          className="bg-[#FF7E4B] md:w-[48.5%] w-full text-nowrap text-[12px]  py-3 border-1 rounded-md border-[#FF7E4B] hover:bg-transparent transition-all duration-500 ease-in-out"
        >
          FUND THE ISSUE
        </button>
        <button className=" opacity-50 border-1 border-[#FF7E4B]  md:w-[48.5%] w-full text-nowrap rounded-md text-[12px] py-3 hover:bg-[#FF7E4B] transition-all duration-500 ease-in-out">
          GET MORE DoW
        </button>
      </div>
    </>
  );
}
