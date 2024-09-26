import React, { useState } from "react";
import Sol from "../../../../../assets/images/SOL.png";
import Hero from "../../../../../assets/images/hero.png";
import Money from "../../../../../assets/images/money.png";
import User from "../../../../../assets/images/git-user.png";

interface SplitAmountProps {}

export function SplitAmount(props: SplitAmountProps) {
  // const [manageFundRecipient, setManageFundRecipient] = useState(new ManageFundRecipient());

  const [error, setError] = useState(false);

  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);
  const [price3, setPrice3] = useState(0);
  const [price4, setPrice4] = useState(0);

  const [isShown, setIsShown] = useState(false);

  const handleElementChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setterFunction: {
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (arg0: number): void;
    },
  ) => {
    const value = parseInt(event.target.value);
    setterFunction(value);
  };

  const SumUp = () => {
    const sum = price1 + price2 + price3 + price4;
    console.log("Sum of all elements: " + sum);
    if (sum !== 100) {
      setError(true);
    }
  };
  const handleClick = () => {
    setIsShown(current => !current);
  };

  return (
    <div className="native-card  px-0">
      <div className="top d-flex justify-content-center">
        <h1 className="helvetica text-white text-center fs-3 mb-5"> Split the Reward</h1>
      </div>
      <p className="helvetica text-center color-70">The amount to split:</p>
      <div className="top d-flex align-items-center gap-4 justify-content-center align-items-center mb-4">
        <img src={Sol} alt="" />
        <div className="text-box">
          <p className="m-0 helvetica fs-4 text-white">
            SOL <span className="fw-600"> 400</span>{" "}
          </p>
        </div>
      </div>
      <div className="resp">
        <div className="c-resp ">
          <div className="hero-parent mb-5">
            <div className="d-flex justify-content-between mb-4">
              <div className="d-flex gap-3  align-items-center">
                <img src={Hero} alt="" className="hero-cat" />
                <p className="helvetica text-white m-0">Donation to OSE</p>
              </div>
              <div className="d-flex gap-4 align-items-center">
                <p className="helvetica  m-0 color-70">Est $45.00</p>
                <div className={`percent ${error && "error"}`}>
                  <p className="helvetica d-flex justify-content-center align-items-center color-70 m-0">
                    %
                    <div>
                      <input type="number" onChange={event => handleElementChange(event, setPrice1)} className="ps-2 fs-4 count-2 text-white" placeholder="0" />
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-3  align-items-center">
                <img src={Money} alt="" className="hero-cat" />
                <p className="helvetica text-white m-0">Donation to OSE</p>
              </div>
              <div className="d-flex gap-4 align-items-center">
                <p className="helvetica m-0 color-70">Est $45.00</p>
                <div className={`percent ${error && "error"}`}>
                  <p className="helvetica d-flex justify-content-center align-items-center color-70 m-0">
                    %{" "}
                    <div>
                      <input
                        type="number"
                        onChange={event => handleElementChange(event, setPrice2)}
                        className="ps-2  fs-4 count-2 text-white"
                        placeholder="0"
                      />
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="user-parent">
            <div className="d-flex justify-content-between mb-5">
              <div className="d-flex gap-3  align-items-center">
                <img src={User} alt="" className="hero-cat" />
                <p className="helvetica text-white m-0">Donation to OSE</p>
              </div>
              <div className="d-flex gap-4 align-items-center">
                <p className="helvetica m-0 color-70">Est $45.00</p>

                <div className={`percent ${error && "error"}`}>
                  <p className="helvetica d-flex justify-content-center align-items-center color-70 m-0">
                    %{" "}
                    <div>
                      <input
                        type="number"
                        onChange={event => handleElementChange(event, setPrice3)}
                        className="ps-2  fs-4 count-2 text-white"
                        placeholder="0"
                      />
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between mb-5">
              <div className="d-flex gap-3  align-items-center">
                <img src={User} alt="" className="hero-cat" />
                <p className="helvetica text-white m-0">Donation to OSE</p>
              </div>
              <div className="d-flex gap-4 align-items-center">
                <p className="helvetica m-0 color-70">Est $45.00</p>
                <div className={`percent ${error && "error"}`}>
                  <p className="helvetica d-flex justify-content-center align-items-center color-70 m-0">
                    %{" "}
                    <div>
                      <input
                        type="number"
                        onChange={event => handleElementChange(event, setPrice4)}
                        className="ps-2  fs-4 count-2 text-white"
                        placeholder="0"
                      />
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex  mb-5 user-parent justify-content-between  ">
            <input type="text" placeholder="+Add Github User" className="helvetica color-70 add-git" onClick={handleClick} />

            {/* <a href="#" className='helvetica color-70 text-decoration-none' >+Add Github User </a> */}
            <div className="top d-flex align-items-center gap-4 justify-content-center">
              <div className="text-box">
                <p className="m-0 helvetica fs-6  text-white">Total: $90</p>
              </div>
              <img src={Sol} alt="" />
            </div>
            {isShown && (
              <ul className="git_users">
                <li className="d-flex gap-5 align-items-center user-active mb-2">
                  <img src={User} alt="" /> <p className="helvetica text-white m-0 ">Pydantic</p>
                </li>
                <li className="d-flex gap-5 align-items-center user-active mb-2">
                  <img src={User} alt="" /> <p className="helvetica text-white m-0 ">Gaustav</p>
                </li>
                <li className="d-flex gap-5 align-items-center user-active mb-2">
                  <img src={User} alt="" /> <p className="helvetica text-white m-0 ">Pydantic</p>
                </li>
                <li className="d-flex gap-5 align-items-center user-active mb-2">
                  <img src={User} alt="" /> <p className="helvetica text-white m-0 ">Gaustav</p>
                </li>
                <li className="d-flex gap-5 align-items-center user-active mb-2">
                  <img src={User} alt="" /> <p className="helvetica text-white m-0 ">Pydantic</p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="text-center">
        <a href="#" className="helvetica" style={{ color: "red", fontStyle: "italic" }}>
          Show error info here
        </a>
      </div>
      <div className="text-center mt-5">
        <div className="connect__btn   w-100 helvetica fw-600 fs-5 " onClick={SumUp}>
          Split the Reward
        </div>
      </div>
    </div>
  );
}
