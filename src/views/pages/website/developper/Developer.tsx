import React, { useEffect, useState } from "react";
import img1 from "../../../../assets/devimg.png";
import img2 from "../../../../assets/developerimg1.png";
import img3 from "../../../../assets/developerimg2.png";
import bg2 from "../../../../assets/bgimg.png";
import img4 from "../../../../assets/sec2img.png";
import star from "../../../../assets/star.png";
import bg from "../../../../assets/bg.png";
import bgtext from "../../../../assets/userbannertext.png";
import btn2 from "../../../../assets/btn2.png";
import AOS from "aos";
import "aos/dist/aos.css";
import "animate.css/animate.compat.css";
import ScrollAnimation from "react-animate-on-scroll";
import {PageWrapper} from "../../PageWrapper";


interface DeveloperProps {

}

export function Developer(props: DeveloperProps) {
    const [bgSize, setBgSize] = useState("70%");
    const [bgSize2, setBgSize2] = useState("60%");
    const [isOpenDropdown1, setIsOpenDropdown1] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState("Your Profile");

    const [isOpenDropdown2, setIsOpenDropdown2] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState(
        "In which open source project? (if applicable)"
    );

    // Toggle functions for each dropdown
    const toggleDropdown1 = () => {
        setIsOpenDropdown2(false);
        setIsOpenDropdown1(!isOpenDropdown1);
    };

    const toggleDropdown2 = () => {
        setIsOpenDropdown1(false);
        setIsOpenDropdown2(!isOpenDropdown2);
    };

    // Handle selection for each dropdown
    const handleSelect1 = (option: string) => {
        setSelectedOption1(option);
        setIsOpenDropdown1(false);
    };

    const handleSelect2 = (option: string) => {
        setSelectedOption2(option);
        setIsOpenDropdown2(false);
    };
    // Initialize AOS
    useEffect(() => {
        AOS.init({
            duration: 58500,
            easing: "ease-in-out",
            once: true,
        });
        // If your content updates dynamically, you can refresh AOS
        AOS.refresh();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 2500 && window.innerWidth <= 7000) {
                setBgSize("30%");
            } else {
                setBgSize("60%");
            }
        };

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Initial check
        handleResize();

        // Cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 3000 && window.innerWidth <= 7000) {
                setBgSize2("40%");
            } else {
                setBgSize2("60%");
            }
        };

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Initial check
        handleResize();

        // Cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [hasScrolled, setHasScrolled] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setPageLoaded(true);
        }, 2000);

        // Handle scroll event
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <PageWrapper>
            <div className="">
                <div className="flex flex-col lg:my-20 my-8  items-center justify-center text-center px-4 md:px-8 lg:px-16">
                    <ScrollAnimation animateIn="fadeInDown">
                        <h1
                            // data-aos="fade-down"
                            className="text-lg md:text-3xl lg:text-4xl xl:text-[60px] xl:leading-[65px] text-white"
                        >
                            As an open source dev.
                            <br />
                            Are you experiencing....
                        </h1>
                    </ScrollAnimation>
                    <div className="relative">
                        <ScrollAnimation animateIn="fadeInUp">
                            <div>
                                <img
                                    src={img1}
                                    alt=""
                                    className="md:w-[65%] px-5  mx-auto h-full"
                                />
                            </div>
                        </ScrollAnimation>
                        <img
                            id="bgImage"
                            src={bgtext}
                            alt="Background"
                            className={`animated-image ${
                                pageLoaded ? (hasScrolled ? "fade-down" : "fade-left") : ""
                            }`}
                        />
                        {/*TODO: to clean: to put in a css file*/}
                        <style>{`
              .animated-image {
                width: 100%;
                height: 100%;
                object-fit: contain;
                position: absolute;
                top: 0px;
                left: 0;
                right: 0;
                transition: transform 3s ease, opacity 1s ease;
                opacity: 0;
                transform: translateX(5%);
              }

              .fade-left {
                opacity: 1;
                transform: translateX(0%);
              }

              .fade-down {
                opacity: 0;
                transform: translateY(20%);
              }
            `}</style>
                        <img
                            src={btn2}
                            alt=""
                            className="w-[60%] mx-auto object-contain h-full absolute top-0 left-0 right-0"
                        />
                    </div>
                </div>
                <div
                    className="bg-no-repeat bg-bottom"
                    data-aos="fade-in"
                    data-aos-duration="35000"
                    style={{
                        backgroundImage: `url(${bg2})`,
                        backgroundPositionY: "center",
                        backgroundSize: "contain"
                    }}
                >
                    <div data-aos="fade-in" className="2xl:px-0 lg:px-52 container">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-[70px] xl:leading-[75px] leading-4">
                            No BS. <br />
                            Here’s our solution.
                        </h1>
                    </div>
                    <div
                        data-aos="fade-in"
                        data-aos-duration="35000"
                        style={{
                            backgroundImage: `url(${bg})`,
                            backgroundPosition: "right",
                            backgroundSize: bgSize,
                        }}
                        className=" bg-no-repeat py-5 "
                    >
                        <div>
                            <div
                                data-aos="fade-in"
                                data-aos-duration="35000"
                                className="px-4 mt-12 flex flex-col justify-center items-center gap-16"
                            >
                                <div
                                    className="flex flex-wrap  items-center justify-center gap-12"
                                    data-aos="fade-in"
                                    data-aos-duration="35000"
                                >
                                    <div
                                        data-aos="fade-in"
                                        data-aos-duration="35000"
                                        className="bg-[#14233A] relative shadow-xl cursor-pointer rounded-[30px] py-[20px] px-[32px] lg:py-[40px] lg:px-[48px] xl:py-[60px] xl:px-[80px] transition-shadow duration-300 hover:shadow-xl group"
                                    >
                                        <img src={img2} className="" alt="" />
                                        <img
                                            src={star}
                                            className="absolute top-[135px] left-[240px] w-[80px] object-cover transition-transform duration-300 group-hover:rotate-90"
                                            alt=""
                                        />
                                    </div>

                                    <div
                                        className="px-2"
                                        data-aos="fade-in"
                                        data-aos-duration="35000"
                                    >
                                        <h1 className="text-[#FF7E4B] text:xl lg:text-4xl xl:text-5xl">
                                            Get Paid
                                        </h1>
                                        <h2 className="md:text-[20px] xl:text-[24px] xl:leading-7  text-[14px] mt-3 text-gray-200">
                                            Earn, Don’t Burn
                                        </h2>
                                        <h3 className="text-[16px] xl:text-[28px] xl:leading-9 text-gray-200 leading-6 mt-8">
                                            Gain tokens for your involvement. <br /> Get a stake in
                                            your project's success
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex flex-wrap  items-center justify-center gap-12">
                                    <div
                                        data-aos="fade-in"
                                        data-aos-duration="35000"
                                        className="bg-[#14233A] relative shadow-xl cursor-pointer rounded-[30px] py-[20px] px-[32px] lg:py-[40px] lg:px-[48px] xl:py-[60px] xl:px-[80px] transition-shadow duration-300 hover:shadow-xl group"
                                    >
                                        <img src={img3} className="" alt="" />
                                        <img
                                            src={star}
                                            className="absolute top-[120px] left-[230px] w-[80px] object-cover transition-transform duration-300 group-hover:rotate-90"
                                            alt=""
                                        />
                                    </div>
                                    <div
                                        data-aos="fade-in"
                                        data-aos-duration="35000"
                                        className="px-2"
                                    >
                                        <h1 className="text-[#FF7E4B] text:xl lg:text-4xl xl:text-5xl">
                                            Have a Say
                                        </h1>
                                        <h2 className="md:text-[20px] xl:text-[24px] xl:leading-7  text-[14px] mt-3 text-gray-200">
                                            Forget the Far West!
                                        </h2>
                                        <h3 className="text-[12px] xl:text-[21px] xl:leading-7 leading-4 mt-8 text-gray-200">
                                            Be part of a clear, transparent, and decentralized <br />{" "}
                                            governance.
                                        </h3>
                                        <h3 className="text-[14px]  xl:text-[21px] xl:leading-7  leading-4 text-gray-200 mt-4">
                                            The deeper your insights, the stronger your <br />{" "}
                                            influence.
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex flex-wrap  items-center justify-center gap-12">
                                    <div
                                        data-aos="fade-in"
                                        data-aos-duration="35000"
                                        className="bg-[#14233A] relative shadow-xl cursor-pointer rounded-[30px] py-[20px] px-[32px] lg:py-[40px] lg:px-[48px] xl:py-[60px] xl:px-[80px] transition-shadow duration-300 hover:shadow-xl group"
                                    >
                                        <img src={img4} className="" alt="" />
                                        <img
                                            src={star}
                                            className="absolute top-[180px] left-[122px] w-[70px] object-cover transition-transform duration-300 group-hover:rotate-90"
                                            alt=""
                                        />
                                    </div>
                                    <div
                                        data-aos="fade-in"
                                        data-aos-duration="35000"
                                        className="px-2"
                                    >
                                        <h1 className="text-[#FF7E4B] text:xl lg:text-4xl xl:text-5xl">
                                            Fund Your Future
                                        </h1>
                                        <h2 className="md:text-[20px] xl:text-[24px] xl:leading-7  text-md mt-3 text-gray-200">
                                            Stop begging for donations!
                                        </h2>
                                        <ul className="mt-2 px-4">
                                            <li className="list-disc text-[14px] xl:text-[27px] xl:leading-9 ">
                                                Easily set up new revenue streams.{" "}
                                            </li>
                                            <li className="list-disc text-[14px] xl:text-[27px] xl:leading-9 ">
                                                Attract financial backers.
                                            </li>
                                        </ul>
                                        <h2 className=" text-[14px] xl:text-[27px] xl:leading-7  mt-3">
                                            And bring your vision to life!
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="lg:py-96 md:py-16"
                        data-aos="fade-in"
                        data-aos-duration="25000"
                    >
                        <h1
                            data-aos="fade-in"
                            data-aos-duration="25000"
                            className="text-center lg:text-[29px] lg:leading-[90px] md:text-[19px] xl:text-[65px] text-[17px] "
                        >
                            The future of open source is here <br />{" "}
                            <span className="lg:text-[20px] md:text-[15px] xl:text-[50px] text-[14px]">
                JOIN THE MOVEMENT.
              </span>
                        </h1>
                        <h1
                            data-aos="fade-in"
                            data-aos-duration="25000"
                            className="text-center text-3xl md:text-4xl lg:text-6xl lg:mt-32 md:mt-22 xl:mt-96 mt-14"
                            style={{
                                background:
                                    "linear-gradient(90deg, #66319B 0%, #FF518C 50%, #FF7E4B 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Register your <br /> interest now.
                        </h1>
                        <div
                            data-aos="fade-in"
                            className="container mx-auto flex flex-col pt-14 lg:pt-44  lg:px-42 2xl:px-64 md:px-32 sm:px-10"
                        >
                            <div>
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    placeholder="Your Email*"
                                    className="email border-bottom border-[#fff] bg-transparent text-[16px] lg:text-[24px] pb-3 outline-none text-[#fff] w-100"
                                />
                                <div className="flex align-items-center mt-3 gap-2">
                                    <input type="checkbox" name="" id="" />
                                    <h2 className="text-[15px] text-[rgba(252,254,253,27%)]">
                                        Sign up for news & updates
                                    </h2>
                                </div>
                                <div className="mt-5 relative inline-block text-left w-100">
                                    <button
                                        onClick={toggleDropdown1}
                                        className="flex text-left items-center justify-between  border-bottom border-[#fff] bg-transparent text-[16px] lg:text-[24px] pb-3 outline-none text-[#FCFEFD] w-100"
                                    >
                                        {selectedOption1}
                                        <svg
                                            className="w-8 h-8 p-1 ml-2 border border-[#fff] rounded-full text-[#fff]"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {isOpenDropdown1 && (
                                        <div className="absolute z-[999] top-12 cursor-pointer left-0  mb-2 w-48 bg-[#0e1f35] border border-gray-300 rounded-md shadow-lg">
                                            <div className="p-2">
                                                <h1
                                                    onClick={() => handleSelect1("Profile 1")}
                                                    className="block px-4 py-2 text-white "
                                                >
                                                    Profile 1
                                                </h1>
                                                <h1
                                                    onClick={() => handleSelect1("Profile 2")}
                                                    className="block px-4 py-2 text-white "
                                                >
                                                    Profile 2
                                                </h1>
                                                <h1
                                                    onClick={() => handleSelect1("Profile 3")}
                                                    className="block px-4 py-2 text-white "
                                                >
                                                    Profile 3
                                                </h1>
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-5 relative inline-block text-left w-100">
                                        <button
                                            onClick={toggleDropdown2}
                                            className="flex items-center text-left justify-between border-bottom border-[#fff] bg-transparent text-[16px] lg:text-[24px] pb-3 outline-none text-[#FCFEFD] w-100"
                                        >
                                            {selectedOption2}
                                            <svg
                                                className="w-8 h-8 p-1 ml-2 border border-[#fff] rounded-full text-[#fff]"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {isOpenDropdown2 && (
                                        <div className="absolute z-50 cursor-pointer left-0 mt-2 w-48 bg-[#0e1f35]  border border-gray-300 rounded-md shadow-lg">
                                            <div className="p-2 ">
                                                <h1
                                                    onClick={() => handleSelect2("Yes")}
                                                    className="block px-4 py-2 text-white"
                                                >
                                                    Yes
                                                </h1>
                                                <h1
                                                    onClick={() => handleSelect2("No")}
                                                    className="block px-4 py-2 text-white"
                                                >
                                                    No
                                                </h1>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div data-aos="fade-in" className="mt-5 ">
                                    <h1 className=" text-[23px]">Message</h1>
                                    <input
                                        placeholder="Share your motivation..."
                                        type="text"
                                        className="mt-3 message border-bottom border-[#fff] bg-transparent lg:text-[17px] text-[14px] lg:pb-48 pb-20 md:pb-32 outline-none text-[#fff] w-100"
                                    />
                                </div>
                                <div
                                    data-aos="fade-in"
                                    className="flex items-center justify-center"
                                >
                                    {/* <button className="px-6 py-3 mt-3 text-white font-bold rounded-lg border-1 border-transparent bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] transition-all duration-300 ease-in-out hover:bg-transparent hover:border hover:text-white">
                    SUBMIT
                  </button> */}
                                    <button className="px-6 py-3 mt-5 findbutton">SUBMIT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}