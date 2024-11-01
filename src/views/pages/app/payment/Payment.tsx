import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import bg from "src/assets/paymentbg.png";
import img1 from "src/assets/paymentimg1.png";
import clock from "src/assets/sand-clock.png";
import couponimg from "src/assets/codeimg.png";
import down from "src/assets/arrowdown.png";
import up from "src/assets/arrowup.png";
import danger from "src/assets/danger.png";

interface PaymentProps {}

export function Payment(props: PaymentProps) {
  const [modal, setModal] = useState(false);
  const [counter, setCounter] = useState(10);
  const [inputValue, setInputValue] = useState(10);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value); // Use parseFloat to allow decimal values
    setInputValue(value);
    setCounter(value);
  };

  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    setCounter(counter - 1);
  };

  const [activeBox, setActiveBox] = useState(1);
  const handleBoxClick = (boxNumber: number) => {
    setActiveBox(boxNumber);
  };

  useEffect(() => {
    if (activeBox === 1 && inputRef.current) {
      inputRef.current.focus(); // Focus the input
      inputRef.current.select(); // Select the input text
    }
  }, [activeBox]);

  useEffect(() => {
    if (activeBox === 2 && inputRef2.current) {
      inputRef2.current.focus(); // Focus the input
      inputRef2.current.select(); // Select the input text
    }
  }, [activeBox]);

  return (
    <div className="py-16 px-3 flex items-center justify-center mx-auto flex-col">
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: "center",
          backgroundSize: "45%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-[45px] sm:text-[45px] md:text-[62px] text-white text-center">Buy DoW</h1>
        <div className=" row items-start justify-center md:mt-24 mt-10 ">
          <div className="col-lg-7 col-xxl-7">
            <h2 className="text-3xl md:text-4xl text-white text-center">Payment option</h2>
            <div className="flex flex-column items-center  flex-xxl-row 2xl:items-end  gap-3 mt-5 ">
              <div className="">
                <h2
                  onClick={() => handleBoxClick(1)}
                  className={`text-center text-[25px] cursor-pointer pt-2 ${activeBox === 1 ? " opacity-100" : "opacity-50"}`}
                >
                  Buy Credits Now
                </h2>
                <div
                  onClick={() => handleBoxClick(1)}
                  className={`bg-[#14233A] rounded-[30px] cursor-pointer p-4 mt-12 w-[340px] md:w-96  ${
                    activeBox === 1 ? "shadow-custom-double-left-right transition-all ease-in-out duration-500" : "opacity-50"
                  }`}
                >
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
                          <input
                            type="number"
                            ref={inputRef}
                            value={counter}
                            placeholder="10"
                            onChange={handleInputChange}
                            className="border-0 outline-none text-[18px] w-20 bg-transparent"
                          />

                          <div className="d-flex flex-col gap-2">
                            <img src={up} className="w-[14px] h-2 cursor-pointer " onClick={() => increment()} alt="" />
                            <img
                              src={down}
                              className={`w-[14px] h-2 cursor-pointer ${counter === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                              onClick={counter > 0 ? () => decrement() : undefined}
                              alt=""
                              style={{
                                pointerEvents: counter === 0 ? "none" : "auto",
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
                </div>
              </div>
              <div className="">
                <h2
                  onClick={() => handleBoxClick(2)}
                  className={`text-center text-[25px] cursor-pointer mt-5 mt-lg-0 ${activeBox === 2 ? " opacity-100" : "opacity-50"}`}
                >
                  Subscribe & <br /> Earn Credits Monthly
                </h2>
                <div
                  onClick={() => handleBoxClick(2)}
                  className={`bg-[#14233A] cursor-pointer rounded-[30px] p-4 mt-12 w-[340px] md:w-96  ${
                    activeBox === 2 ? "shadow-custom-double-left-right transition-all ease-in-out duration-500" : "opacity-50"
                  }`}
                >
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

                          <input type="number" ref={inputRef2} placeholder="02" className="borde-0 outline-none text-[18px] w-20 bg-transparent" />
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
                </div>
              </div>
            </div>
            <div className="flex w-[340px]  md:w-[85%] gap-2 lg:w-[60%] xl:w-[55%]  mx-auto my-5 items-center justify-between bg-[#14233A] rounded-[30px] p-4 ">
              <h2 className="lg:text-[18px] text-sm">
                What DoWs are <br /> used for?{" "}
              </h2>
              <button className="border-1 border-[rgba(255,81,140,100%)] rounded-md px-5 py-3 hover:bg-[rgba(255,81,140,100%)] transition-all duration-500 ease-in-out">
                Discover
              </button>
            </div>
          </div>
          <div className="col-lg-5 col-xxl-5 col-sm-8 col-11 ">
            <div className="bg-[#14233A] rounded-[30px] p-4">
              <div className="relative bg-[#223046] p-1 rounded-[10px] border-2 border-[#FF5E1A] border-dashed max-w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <img src={couponimg} className="absolute lg:top-4 md:top-3 top-4 sm:top-3 left-3 lg:w-8 lg:h-8 w-6 h-6" />
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter Coupon Code"
                    className="xl:text-[16px] md:text-[11px] text-[13px] bg-transparent border-0 outline-none text-[#fff] w-full sm:w-2/3 ps-5 py-3  sm:mt-0"
                  />
                  <button className="text-nowrap findbutton w-full py-3 sm:w-fit sm:px-3 sm:py-2 md:px-4 md:py-3 md:text-[11px] lg:text-[13px] sm:text-[10px] text-[12px]">
                    Apply Coupon
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <h2 className="text-[16px]">Subtotal:</h2>
                <h3 className="text-[16px]">10,000 $</h3>
              </div>
              <div className="flex justify-between items-center mt-4">
                <h2 className="text-[16px]">Discount</h2>
                <h3 className="text-[16px]">-10%</h3>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3  border-t border-t-[#fff]">
                <h2 className="text-[16px]">
                  Total <span className="text-[14px] text-[rgba(255,255,255,60%)]">(indl. Taxes)</span>
                </h2>
                <h3 className="text-[16px] text-end">
                  10,000 $ <span className="text-[14px] text-[rgba(255,255,255,60%)]">/ Month</span>
                </h3>
              </div>
            </div>
            <div className="bg-[#14233A] rounded-[30px] p-4 mt-4">
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
                    <option className="text-black" value="Afghanistan">
                      Afghanistan
                    </option>
                    <option className="text-black" value="Åland Islands">
                      Åland Islands
                    </option>
                    <option className="text-black" value="Albania">
                      Albania
                    </option>
                    <option className="text-black" value="Algeria">
                      Algeria
                    </option>
                    <option className="text-black" value="American Samoa">
                      American Samoa
                    </option>
                    <option className="text-black" value="Andorra">
                      Andorra
                    </option>
                    <option className="text-black" value="Angola">
                      Angola
                    </option>
                    <option className="text-black" value="Anguilla">
                      Anguilla
                    </option>
                    <option className="text-black" value="Antarctica">
                      Antarctica
                    </option>
                    <option className="text-black" value="Antigua and Barbuda">
                      Antigua and Barbuda
                    </option>
                    <option className="text-black" value="Argentina">
                      Argentina
                    </option>
                    <option className="text-black" value="Armenia">
                      Armenia
                    </option>
                    <option className="text-black" value="Aruba">
                      Aruba
                    </option>
                    <option className="text-black" value="Australia">
                      Australia
                    </option>
                    <option className="text-black" value="Austria">
                      Austria
                    </option>
                    <option className="text-black" value="Azerbaijan">
                      Azerbaijan
                    </option>
                    <option className="text-black" value="Bahamas">
                      Bahamas
                    </option>
                    <option className="text-black" value="Bahrain">
                      Bahrain
                    </option>
                    <option className="text-black" value="Bangladesh">
                      Bangladesh
                    </option>
                    <option className="text-black" value="Barbados">
                      Barbados
                    </option>
                    <option className="text-black" value="Belarus">
                      Belarus
                    </option>
                    <option className="text-black" value="Belgium">
                      Belgium
                    </option>
                    <option className="text-black" value="Belize">
                      Belize
                    </option>
                    <option className="text-black" value="Benin">
                      Benin
                    </option>
                    <option className="text-black" value="Bermuda">
                      Bermuda
                    </option>
                    <option className="text-black" value="Bhutan">
                      Bhutan
                    </option>
                    <option className="text-black" value="Bolivia">
                      Bolivia
                    </option>
                    <option className="text-black" value="Bosnia and Herzegovina">
                      Bosnia and Herzegovina
                    </option>
                    <option className="text-black" value="Botswana">
                      Botswana
                    </option>
                    <option className="text-black" value="Bouvet Island">
                      Bouvet Island
                    </option>
                    <option className="text-black" value="Brazil">
                      Brazil
                    </option>
                    <option className="text-black" value="British Indian Ocean Territory">
                      British Indian Ocean Territory
                    </option>
                    <option className="text-black" value="Brunei Darussalam">
                      Brunei Darussalam
                    </option>
                    <option className="text-black" value="Bulgaria">
                      Bulgaria
                    </option>
                    <option className="text-black" value="Burkina Faso">
                      Burkina Faso
                    </option>
                    <option className="text-black" value="Burundi">
                      Burundi
                    </option>
                    <option className="text-black" value="Cambodia">
                      Cambodia
                    </option>
                    <option className="text-black" value="Cameroon">
                      Cameroon
                    </option>
                    <option className="text-black" value="Canada">
                      Canada
                    </option>
                    <option className="text-black" value="Cape Verde">
                      Cape Verde
                    </option>
                    <option className="text-black" value="Cayman Islands">
                      Cayman Islands
                    </option>
                    <option className="text-black" value="Central African Republic">
                      Central African Republic
                    </option>
                    <option className="text-black" value="Chad">
                      Chad
                    </option>
                    <option className="text-black" value="Chile">
                      Chile
                    </option>
                    <option className="text-black" value="China">
                      China
                    </option>
                    <option className="text-black" value="Christmas Island">
                      Christmas Island
                    </option>
                    <option className="text-black" value="Cocos (Keeling) Islands">
                      Cocos (Keeling) Islands
                    </option>
                    <option className="text-black" value="Colombia">
                      Colombia
                    </option>
                    <option className="text-black" value="Comoros">
                      Comoros
                    </option>
                    <option className="text-black" value="Congo">
                      Congo
                    </option>
                    <option className="text-black" value="Congo, The Democratic Republic of The">
                      Congo, The Democratic Republic of The
                    </option>
                    <option className="text-black" value="Cook Islands">
                      Cook Islands
                    </option>
                    <option className="text-black" value="Costa Rica">
                      Costa Rica
                    </option>
                    <option className="text-black" value="Cote D'ivoire">
                      Cote D'ivoire
                    </option>
                    <option className="text-black" value="Croatia">
                      Croatia
                    </option>
                    <option className="text-black" value="Cuba">
                      Cuba
                    </option>
                    <option className="text-black" value="Cyprus">
                      Cyprus
                    </option>
                    <option className="text-black" value="Czech Republic">
                      Czech Republic
                    </option>
                    <option className="text-black" value="Denmark">
                      Denmark
                    </option>
                    <option className="text-black" value="Djibouti">
                      Djibouti
                    </option>
                    <option className="text-black" value="Dominica">
                      Dominica
                    </option>
                    <option className="text-black" value="Dominican Republic">
                      Dominican Republic
                    </option>
                    <option className="text-black" value="Ecuador">
                      Ecuador
                    </option>
                    <option className="text-black" value="Egypt">
                      Egypt
                    </option>
                    <option className="text-black" value="El Salvador">
                      El Salvador
                    </option>
                    <option className="text-black" value="Equatorial Guinea">
                      Equatorial Guinea
                    </option>
                    <option className="text-black" value="Eritrea">
                      Eritrea
                    </option>
                    <option className="text-black" value="Estonia">
                      Estonia
                    </option>
                    <option className="text-black" value="Ethiopia">
                      Ethiopia
                    </option>
                    <option className="text-black" value="Falkland Islands (Malvinas)">
                      Falkland Islands (Malvinas)
                    </option>
                    <option className="text-black" value="Faroe Islands">
                      Faroe Islands
                    </option>
                    <option className="text-black" value="Fiji">
                      Fiji
                    </option>
                    <option className="text-black" value="Finland">
                      Finland
                    </option>
                    <option className="text-black" value="France">
                      France
                    </option>
                    <option className="text-black" value="French Guiana">
                      French Guiana
                    </option>
                    <option className="text-black" value="French Polynesia">
                      French Polynesia
                    </option>
                    <option className="text-black" value="French Southern Territories">
                      French Southern Territories
                    </option>
                    <option className="text-black" value="Gabon">
                      Gabon
                    </option>
                    <option className="text-black" value="Gambia">
                      Gambia
                    </option>
                    <option className="text-black" value="Georgia">
                      Georgia
                    </option>
                    <option className="text-black" value="Germany">
                      Germany
                    </option>
                    <option className="text-black" value="Ghana">
                      Ghana
                    </option>
                    <option className="text-black" value="Gibraltar">
                      Gibraltar
                    </option>
                    <option className="text-black" value="Greece">
                      Greece
                    </option>
                    <option className="text-black" value="Greenland">
                      Greenland
                    </option>
                    <option className="text-black" value="Grenada">
                      Grenada
                    </option>
                    <option className="text-black" value="Guadeloupe">
                      Guadeloupe
                    </option>
                    <option className="text-black" value="Guam">
                      Guam
                    </option>
                    <option className="text-black" value="Guatemala">
                      Guatemala
                    </option>
                    <option className="text-black" value="Guernsey">
                      Guernsey
                    </option>
                    <option className="text-black" value="Guinea">
                      Guinea
                    </option>
                    <option className="text-black" value="Guinea-bissau">
                      Guinea-bissau
                    </option>
                    <option className="text-black" value="Guyana">
                      Guyana
                    </option>
                    <option className="text-black" value="Haiti">
                      Haiti
                    </option>
                    <option className="text-black" value="Heard Island and Mcdonald Islands">
                      Heard Island and Mcdonald Islands
                    </option>
                    <option className="text-black" value="Holy See (Vatican City State)">
                      Holy See (Vatican City State)
                    </option>
                    <option className="text-black" value="Honduras">
                      Honduras
                    </option>
                    <option className="text-black" value="Hong Kong">
                      Hong Kong
                    </option>
                    <option className="text-black" value="Hungary">
                      Hungary
                    </option>
                    <option className="text-black" value="Iceland">
                      Iceland
                    </option>
                    <option className="text-black" value="India">
                      India
                    </option>
                    <option className="text-black" value="Indonesia">
                      Indonesia
                    </option>
                    <option className="text-black" value="Iran, Islamic Republic of">
                      Iran, Islamic Republic of
                    </option>
                    <option className="text-black" value="Iraq">
                      Iraq
                    </option>
                    <option className="text-black" value="Ireland">
                      Ireland
                    </option>
                    <option className="text-black" value="Isle of Man">
                      Isle of Man
                    </option>
                    <option className="text-black" value="Israel">
                      Israel
                    </option>
                    <option className="text-black" value="Italy">
                      Italy
                    </option>
                    <option className="text-black" value="Jamaica">
                      Jamaica
                    </option>
                    <option className="text-black" value="Japan">
                      Japan
                    </option>
                    <option className="text-black" value="Jersey">
                      Jersey
                    </option>
                    <option className="text-black" value="Jordan">
                      Jordan
                    </option>
                    <option className="text-black" value="Kazakhstan">
                      Kazakhstan
                    </option>
                    <option className="text-black" value="Kenya">
                      Kenya
                    </option>
                    <option className="text-black" value="Kiribati">
                      Kiribati
                    </option>
                    <option className="text-black" value="Korea, Democratic People's Republic of">
                      Korea, Democratic People's Republic of
                    </option>
                    <option className="text-black" value="Korea, Republic of">
                      Korea, Republic of
                    </option>
                    <option className="text-black" value="Kuwait">
                      Kuwait
                    </option>
                    <option className="text-black" value="Kyrgyzstan">
                      Kyrgyzstan
                    </option>
                    <option className="text-black" value="Lao People's Democratic Republic">
                      Lao People's Democratic Republic
                    </option>
                    <option className="text-black" value="Latvia">
                      Latvia
                    </option>
                    <option className="text-black" value="Lebanon">
                      Lebanon
                    </option>
                    <option className="text-black" value="Lesotho">
                      Lesotho
                    </option>
                    <option className="text-black" value="Liberia">
                      Liberia
                    </option>
                    <option className="text-black" value="Libyan Arab Jamahiriya">
                      Libyan Arab Jamahiriya
                    </option>
                    <option className="text-black" value="Liechtenstein">
                      Liechtenstein
                    </option>
                    <option className="text-black" value="Lithuania">
                      Lithuania
                    </option>
                    <option className="text-black" value="Luxembourg">
                      Luxembourg
                    </option>
                    <option className="text-black" value="Macao">
                      Macao
                    </option>
                    <option className="text-black" value="Macedonia, The Former Yugoslav Republic of">
                      Macedonia, The Former Yugoslav Republic of
                    </option>
                    <option className="text-black" value="Madagascar">
                      Madagascar
                    </option>
                    <option className="text-black" value="Malawi">
                      Malawi
                    </option>
                    <option className="text-black" value="Malaysia">
                      Malaysia
                    </option>
                    <option className="text-black" value="Maldives">
                      Maldives
                    </option>
                    <option className="text-black" value="Mali">
                      Mali
                    </option>
                    <option className="text-black" value="Malta">
                      Malta
                    </option>
                    <option className="text-black" value="Marshall Islands">
                      Marshall Islands
                    </option>
                    <option className="text-black" value="Martinique">
                      Martinique
                    </option>
                    <option className="text-black" value="Mauritania">
                      Mauritania
                    </option>
                    <option className="text-black" value="Mauritius">
                      Mauritius
                    </option>
                    <option className="text-black" value="Mayotte">
                      Mayotte
                    </option>
                    <option className="text-black" value="Mexico">
                      Mexico
                    </option>
                    <option className="text-black" value="Micronesia, Federated States of">
                      Micronesia, Federated States of
                    </option>
                    <option className="text-black" value="Moldova, Republic of">
                      Moldova, Republic of
                    </option>
                    <option className="text-black" value="Monaco">
                      Monaco
                    </option>
                    <option className="text-black" value="Mongolia">
                      Mongolia
                    </option>
                    <option className="text-black" value="Montenegro">
                      Montenegro
                    </option>
                    <option className="text-black" value="Montserrat">
                      Montserrat
                    </option>
                    <option className="text-black" value="Morocco">
                      Morocco
                    </option>
                    <option className="text-black" value="Mozambique">
                      Mozambique
                    </option>
                    <option className="text-black" value="Myanmar">
                      Myanmar
                    </option>
                    <option className="text-black" value="Namibia">
                      Namibia
                    </option>
                    <option className="text-black" value="Nauru">
                      Nauru
                    </option>
                    <option className="text-black" value="Nepal">
                      Nepal
                    </option>
                    <option className="text-black" value="Netherlands">
                      Netherlands
                    </option>
                    <option className="text-black" value="Netherlands Antilles">
                      Netherlands Antilles
                    </option>
                    <option className="text-black" value="New Caledonia">
                      New Caledonia
                    </option>
                    <option className="text-black" value="New Zealand">
                      New Zealand
                    </option>
                    <option className="text-black" value="Nicaragua">
                      Nicaragua
                    </option>
                    <option className="text-black" value="Niger">
                      Niger
                    </option>
                    <option className="text-black" value="Nigeria">
                      Nigeria
                    </option>
                    <option className="text-black" value="Niue">
                      Niue
                    </option>
                    <option className="text-black" value="Norfolk Island">
                      Norfolk Island
                    </option>
                    <option className="text-black" value="Northern Mariana Islands">
                      Northern Mariana Islands
                    </option>
                    <option className="text-black" value="Norway">
                      Norway
                    </option>
                    <option className="text-black" value="Oman">
                      Oman
                    </option>
                    <option className="text-black" value="Pakistan">
                      Pakistan
                    </option>
                    <option className="text-black" value="Palau">
                      Palau
                    </option>
                    <option className="text-black" value="Palestinian Territory, Occupied">
                      Palestinian Territory, Occupied
                    </option>
                    <option className="text-black" value="Panama">
                      Panama
                    </option>
                    <option className="text-black" value="Papua New Guinea">
                      Papua New Guinea
                    </option>
                    <option className="text-black" value="Paraguay">
                      Paraguay
                    </option>
                    <option className="text-black" value="Peru">
                      Peru
                    </option>
                    <option className="text-black" value="Philippines">
                      Philippines
                    </option>
                    <option className="text-black" value="Pitcairn">
                      Pitcairn
                    </option>
                    <option className="text-black" value="Poland">
                      Poland
                    </option>
                    <option className="text-black" value="Portugal">
                      Portugal
                    </option>
                    <option className="text-black" value="Puerto Rico">
                      Puerto Rico
                    </option>
                    <option className="text-black" value="Qatar">
                      Qatar
                    </option>
                    <option className="text-black" value="Reunion">
                      Reunion
                    </option>
                    <option className="text-black" value="Romania">
                      Romania
                    </option>
                    <option className="text-black" value="Russian Federation">
                      Russian Federation
                    </option>
                    <option className="text-black" value="Rwanda">
                      Rwanda
                    </option>
                    <option className="text-black" value="Saint Helena">
                      Saint Helena
                    </option>
                    <option className="text-black" value="Saint Kitts and Nevis">
                      Saint Kitts and Nevis
                    </option>
                    <option className="text-black" value="Saint Lucia">
                      Saint Lucia
                    </option>
                    <option className="text-black" value="Saint Pierre and Miquelon">
                      Saint Pierre and Miquelon
                    </option>
                    <option className="text-black" value="Saint Vincent and The Grenadines">
                      Saint Vincent and The Grenadines
                    </option>
                    <option className="text-black" value="Samoa">
                      Samoa
                    </option>
                    <option className="text-black" value="San Marino">
                      San Marino
                    </option>
                    <option className="text-black" value="Sao Tome and Principe">
                      Sao Tome and Principe
                    </option>
                    <option className="text-black" value="Saudi Arabia">
                      Saudi Arabia
                    </option>
                    <option className="text-black" value="Senegal">
                      Senegal
                    </option>
                    <option className="text-black" value="Serbia">
                      Serbia
                    </option>
                    <option className="text-black" value="Seychelles">
                      Seychelles
                    </option>
                    <option className="text-black" value="Sierra Leone">
                      Sierra Leone
                    </option>
                    <option className="text-black" value="Singapore">
                      Singapore
                    </option>
                    <option className="text-black" value="Slovakia">
                      Slovakia
                    </option>
                    <option className="text-black" value="Slovenia">
                      Slovenia
                    </option>
                    <option className="text-black" value="Solomon Islands">
                      Solomon Islands
                    </option>
                    <option className="text-black" value="Somalia">
                      Somalia
                    </option>
                    <option className="text-black" value="South Africa">
                      South Africa
                    </option>
                    <option className="text-black" value="South Georgia and The South Sandwich Islands">
                      South Georgia and The South Sandwich Islands
                    </option>
                    <option className="text-black" value="Spain">
                      Spain
                    </option>
                    <option className="text-black" value="Sri Lanka">
                      Sri Lanka
                    </option>
                    <option className="text-black" value="Sudan">
                      Sudan
                    </option>
                    <option className="text-black" value="Suriname">
                      Suriname
                    </option>
                    <option className="text-black" value="Svalbard and Jan Mayen">
                      Svalbard and Jan Mayen
                    </option>
                    <option className="text-black" value="Swaziland">
                      Swaziland
                    </option>
                    <option className="text-black" value="Sweden">
                      Sweden
                    </option>
                    <option className="text-black" value="Switzerland" selected>
                      Switzerland
                    </option>
                    <option className="text-black" value="Syrian Arab Republic">
                      Syrian Arab Republic
                    </option>
                    <option className="text-black" value="Taiwan">
                      Taiwan
                    </option>
                    <option className="text-black" value="Tajikistan">
                      Tajikistan
                    </option>
                    <option className="text-black" value="Tanzania, United Republic of">
                      Tanzania, United Republic of
                    </option>
                    <option className="text-black" value="Thailand">
                      Thailand
                    </option>
                    <option className="text-black" value="Timor-leste">
                      Timor-leste
                    </option>
                    <option className="text-black" value="Togo">
                      Togo
                    </option>
                    <option className="text-black" value="Tokelau">
                      Tokelau
                    </option>
                    <option className="text-black" value="Tonga">
                      Tonga
                    </option>
                    <option className="text-black" value="Trinidad and Tobago">
                      Trinidad and Tobago
                    </option>
                    <option className="text-black" value="Tunisia">
                      Tunisia
                    </option>
                    <option className="text-black" value="Turkey">
                      Turkey
                    </option>
                    <option className="text-black" value="Turkmenistan">
                      Turkmenistan
                    </option>
                    <option className="text-black" value="Turks and Caicos Islands">
                      Turks and Caicos Islands
                    </option>
                    <option className="text-black" value="Tuvalu">
                      Tuvalu
                    </option>
                    <option className="text-black" value="Uganda">
                      Uganda
                    </option>
                    <option className="text-black" value="Ukraine">
                      Ukraine
                    </option>
                    <option className="text-black" value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option className="text-black" value="United Kingdom">
                      United Kingdom
                    </option>
                    <option className="text-black" value="United States">
                      United States
                    </option>
                    <option className="text-black" value="United States Minor Outlying Islands">
                      United States Minor Outlying Islands
                    </option>
                    <option className="text-black" value="Uruguay">
                      Uruguay
                    </option>
                    <option className="text-black" value="Uzbekistan">
                      Uzbekistan
                    </option>
                    <option className="text-black" value="Vanuatu">
                      Vanuatu
                    </option>
                    <option className="text-black" value="Venezuela">
                      Venezuela
                    </option>
                    <option className="text-black" value="Viet Nam">
                      Viet Nam
                    </option>
                    <option className="text-black" value="Virgin Islands, British">
                      Virgin Islands, British
                    </option>
                    <option className="text-black" value="Virgin Islands, U.S.">
                      Virgin Islands, U.S.
                    </option>
                    <option className="text-black" value="Wallis and Futuna">
                      Wallis and Futuna
                    </option>
                    <option className="text-black" value="Western Sahara">
                      Western Sahara
                    </option>
                    <option className="text-black" value="Yemen">
                      Yemen
                    </option>
                    <option className="text-black" value="Zambia">
                      Zambia
                    </option>
                    <option className="text-black" value="Zimbabwe">
                      Zimbabwe
                    </option>
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
                <button onClick={() => setModal(!modal)} className="sm:px-14 px-[20px]  py-3 mt-4 findbutton">
                  Buy Now
                </button>
                {modal && (
                  <div id="modal" className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[#0E1E34] rounded-[50px] py-5 md:px-14 px-3 mx-3 flex items-center justify-center flex-col w-[100%] sm:w-[40%] lg:w-[32%] relative animate-slideInDown">
                      <img src={danger} className="w-[91px] h-[85px]" alt="" />
                      <h2 className="text-[32px] my-4 text-center">Payment Error</h2>
                      <p className="text-[14px] text-center">
                        Unfortunately there was an error while processing <br /> your payment.{" "}
                      </p>

                      <button onClick={() => setModal(false)} className="sm:px-14 px-[20px]  py-3 mt-4 findbutton">
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
