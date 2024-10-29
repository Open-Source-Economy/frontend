import React, { ChangeEvent, useRef, useState } from "react";
import bgimage from "src/assets/Group258.svg";
import img1 from "src/assets/issueimg1.png";
import person from "src/assets/personicon.png";
import dow from "src/assets/dow.png";
import down from "src/assets/arrowdown.png";
import up from "src/assets/arrowup.png";
import catimg from "src/assets/catimg.png";
import check from "src/assets/checkmark.png";
import { PageWrapper } from "src/views/pages/PageWrapper";

interface FundAnIssueProps {}

export function FundAnIssue(props: FundAnIssueProps) {
  const [counter, setCounter] = useState(10);
  const [inputValue, setInputValue] = useState(10);
  const inputRef = useRef(null);
  const [modal, setModal] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setInputValue(value);
    setCounter(value);
  };

  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    setCounter(counter - 1);
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        <div
          className="mt-20 py-5 px-3"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundPosition: "top",
            backgroundPositionY: "-310px",
            backgroundSize: "1200px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <h1 className="lg:text-[62px] text-[30px]  text-center font-medium text-white">
            Fund an <span className="text-[#FF7E4B]">Issue</span>
          </h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <div className="xl:w-[600px] md:w-[590px] w-full">
              <div className="padding sm:py-9 sm:px-10   montserrat flex items-center justify-between bg-[#0A1930] rounded-tl-3xl rounded-tr-3xl ">
                <div className="flex items-center gap-3">
                  <img className="w-[55px] h-[55px] cursor-pointer hover:underline" src={img1} alt="" />
                  <h2 className="text-2xl text-[#8693A4] cursor-pointer">
                    <span className="hover:underline">apache</span>{" "}
                    <span className="text-white ">
                      / <span className="hover:underline">pekko</span>
                    </span>
                  </h2>
                </div>
                <div>
                  <img className="w-[52px] h-[52px]" src={person} alt="" />
                </div>
              </div>
              <div className="padding montserrat sm:py-7 sm:px-10   bg-[rgba(20,35,58,60%)] rounded-bl-3xl rounded-br-3xl  ">
                <h1 className="text-lg cursor-pointer hover:underline transition-all duration-500 ease-in-out">
                  There is a problem in the display of the home page
                </h1>
                <h2 className="text-[rgba(255,255,255,70%)] cursor-pointer text-xl mt-1">
                  <span className=" hover:underline ">#3949</span> <span className=" hover:underline  text-[12px] cursor-pointer">updated on 14 Jul 2024</span>
                </h2>
                <div className="flex flex-wrap items-center gap-3 justify-between mt-12">
                  <div>
                    <div className="flex items-center gap-3">
                      <img className="w-[38px] h-[30px] cursor-pointer " src={dow} alt="" />
                      <h3 className="text-[20px] cursor-pointer ">
                        <span className="michroma">4.5</span> <span className="text-[#FF7E4B] michroma">DoW</span> refunded
                      </h3>
                    </div>
                    <h2 className="text-base cursor-pointer  text-[#8693A4] mt-2">
                      <span className="hover:underline">octonato</span> closed the issue
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#14233A] rounded-3xl padding md:py-12 md:px-5 md:w-[590px] xl:w-[595px] w-full">
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
                          onClick={() => (counter > 0 ? () => decrement() : null)}
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
                <button
                  onClick={() => setModal(!modal)}
                  className="bg-[#FF7E4B] md:w-[48.5%] w-full text-nowrap text-[12px]  py-3 border-1 rounded-md border-[#FF7E4B] hover:bg-transparent transition-all duration-500 ease-in-out"
                >
                  FUND THE ISSUE
                </button>
                <button className=" opacity-50 border-1 border-[#FF7E4B]  md:w-[48.5%] w-full text-nowrap rounded-md text-[12px] py-3 hover:bg-[#FF7E4B] transition-all duration-500 ease-in-out">
                  GET MORE DoW
                </button>
              </div>
              {modal && (
                <div id="modal" className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-[#0E1E34] border-1 border-[#292929] rounded-[50px] py-5 md:px-14 px-3 mx-3 flex flex-col w-[100%] sm:w-[40%] lg:w-[32%] relative animate-slideInDown">
                    <h1 className=" text-center text-[30px] ">What is the Spirit?</h1>
                    <img src={catimg} className="w-[153px] montserrat h-[211px] my-4 mx-auto" alt="" />
                    <div className="px-4">
                      <h2 className="montserrat text-[#FF518C] text-[20px]">I understand that:</h2>
                      <div className="montserrat flex items-center gap-2 mt-3">
                        <img src={check} className="w-[14px] h-[14px]" alt="" />
                        <h3>This platform works with trust</h3>
                      </div>
                      <div className="montserrat flex items-center gap-2 mt-3">
                        <img src={check} className="w-[14px] h-[14px]" alt="" />
                        <h3>Maintainer will do their best to solve issues</h3>
                      </div>
                      <div className="montserrat flex items-start gap-2 mt-3">
                        <img src={check} className="w-[14px] h-[14px]" alt="" />
                        <h3>Use of the funds collected works is at the honor of the maintainers</h3>
                      </div>
                      <div className="flex mt-3 items-center justify-center">
                        <button onClick={() => setModal(false)} className="sm:px-14 px-[20px]  py-3 mt-4 findbutton">
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
