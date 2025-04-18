import React, { useState } from "react";
import bg from "src/assets/paymentbg.png";
import { Coupon, MonthlySubscription, OneTimePayment, PriceItems } from "src/views/pages/app/payment/elements";
import { PaymentOptions } from "src/views/pages/app/payment/elements/PaymentOptions";

interface PaymentProps {}

export function Payment(props: PaymentProps) {
  const [modal, setModal] = useState(false);
  const [counter, setCounter] = useState(10);

  // const inputRef = useRef<HTMLInputElement>(null);
  // const inputRef2 = useRef<HTMLInputElement>(null);
  // const [activeBox, setActiveBox] = useState(1);
  // useEffect(() => {
  //   if (activeBox === 1 && inputRef.current) {
  //     inputRef.current.focus(); // Focus the input
  //     inputRef.current.select(); // Select the input text
  //   }
  // }, [activeBox]);
  //
  // useEffect(() => {
  //   if (activeBox === 2 && inputRef2.current) {
  //     inputRef2.current.focus(); // Focus the input
  //     inputRef2.current.select(); // Select the input text
  //   }
  // }, [activeBox]);

  return (
    <div className="py-16 px-3 flex items-center mx-auto flex-col max-w-[1638px] w-full">
      <div
        className="w-full"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: "center",
          backgroundSize: "45%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-[45px] sm:text-[45px] md:text-[62px] text-white text-center">Buy Credits</h1>

        <div className=" flex lg:flex-row flex-col lg:items-start items-center justify-center md:mt-24 mt-10  w-full 3xl:!gap-[109px] 2xl:!gap-20 lg:!gap-16 gap-0 ">
          <div className="lg:max-w-[805px] w-full">
            <h2 className="text-3xl md:text-4xl text-white text-center">Payment option</h2>

            <div className="flex flex-column items-center  flex-xxl-row 2xl:items-end  gap-3 mt-5 ">
              <PaymentOptions
                tab1Title={
                  <>
                    Subscribe & <br /> Earn Credits Monthly
                  </>
                }
                tab2Title={"Buy Credits Now"}
                tab1={<MonthlySubscription />}
                tab2={<OneTimePayment />}
              ></PaymentOptions>
            </div>

            <div className="flex w-[340px]  md:w-[85%] gap-2 lg:w-[72%] xl:w-[62%] mx-auto my-5 items-center justify-between bg-[#14233A] rounded-[30px] p-4 ">
              <h2 className="lg:text-[18px] text-sm">
                What Credits are <br /> used for?{" "}
              </h2>
              <button className="border-1 border-[rgba(255,81,140,100%)] rounded-md px-5 py-3 hover:bg-[rgba(255,81,140,100%)] transition-all duration-500 ease-in-out">
                Discover
              </button>
            </div>
          </div>

          <div className="col-lg-5 col-xxl-5 col-sm-8 col-11 ">
            <div className="bg-[#14233A] rounded-[30px] p-4">
              <div className="relative bg-[#223046] p-1 rounded-[10px] border-2 border-[#FF5E1A] border-dashed max-w-full">
                <Coupon />
              </div>

              <PriceItems />
            </div>
            {/*<div className="bg-[#14233A] rounded-[30px] p-4 mt-4">*/}
            {/*  <Card />*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
