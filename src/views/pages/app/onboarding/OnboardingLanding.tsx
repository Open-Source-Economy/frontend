import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "src/views/pages/authenticate/AuthContext";
<<<<<<< HEAD
import { getAuthBackendAPI } from "src/services";
import { paths } from "src/paths";
=======
import { paths } from "../../../../paths";
import { PageWrapper } from "../../PageWrapper";
>>>>>>> stage

// TODO: Move icons to come icon folder - so that we can reuse them across the app
// Inline SVG components replacing localhost assets
const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 0C4.475 0 0 4.475 0 10C0 14.425 2.8625 18.1625 6.8375 19.4875C7.3375 19.575 7.525 19.275 7.525 19.0125C7.525 18.775 7.5125 17.9875 7.5125 17.15C5 17.6125 4.35 16.5375 4.15 15.975C4.0375 15.6875 3.55 14.8 3.125 14.5625C2.775 14.375 2.275 13.9125 3.1125 13.9C3.9 13.8875 4.4625 14.625 4.65 14.925C5.55 16.4375 6.9875 16.0125 7.5625 15.75C7.65 15.1 7.9125 14.6625 8.2 14.4125C5.975 14.1625 3.65 13.3 3.65 9.475C3.65 8.3875 4.0375 7.4875 4.675 6.7875C4.575 6.5375 4.225 5.5125 4.775 4.1375C4.775 4.1375 5.6125 3.875 7.525 5.1625C8.325 4.9375 9.175 4.825 10.025 4.825C10.875 4.825 11.725 4.9375 12.525 5.1625C14.4375 3.8625 15.275 4.1375 15.275 4.1375C15.825 5.5125 15.475 6.5375 15.375 6.7875C16.0125 7.4875 16.4 8.375 16.4 9.475C16.4 13.3125 14.0625 14.1625 11.8375 14.4125C12.2 14.725 12.5125 15.325 12.5125 16.2625C12.5125 17.6 12.5 18.675 12.5 19.0125C12.5 19.275 12.6875 19.5875 13.1875 19.4875C17.1375 18.1625 20 14.4125 20 10C20 4.475 15.525 0 10 0Z"
      fill="currentColor"
    />
  </svg>
);

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66667 5L13.3333 10L6.66667 15V5Z" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function OnboardingLandingPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleGitHubSignIn = () => {
<<<<<<< HEAD
    // Check if user is already authenticated
    if (auth.authInfo) {
      // User is already logged in, go directly to onboarding
      navigate(paths.DEV_ONBOARDING_PROFILE);
    } else {
      // User needs to authenticate first
      // Trigger GitHub OAuth with redirect path
      authAPI.loginWithGitHub(paths.DEV_ONBOARDING_PROFILE);
=======
    if (auth.authInfo?.user) {
      navigate(paths.DEV_ONBOARDING_START);
    } else {
      auth.loginWithGitHub(paths.DEV_ONBOARDING_START);
>>>>>>> stage
    }
  };

  return (
    <PageWrapper>
      <div className="bg-[#0e1f35] box-border content-stretch flex flex-col gap-[100px] items-center justify-start pb-[100px] pt-0 px-0 relative size-full min-h-screen">
        {/* Main Hero Section */}
        <div className="box-border content-stretch flex flex-col gap-12 items-start justify-center px-[200px] py-0 relative shrink-0 w-full mt-[200px]">
          <div className="box-border content-stretch flex flex-col gap-7 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-full">
            <div className="font-michroma max-w-[900px] not-italic relative shrink-0 text-[64px] w-full">
              <p className="block leading-[1.3]">Fuel Your Open Source Passion</p>
            </div>
            <div className="font-montserrat font-normal relative shrink-0 text-[32px] w-full">
              <p className="block leading-[1.3]">Earn recurring income, your way.</p>
            </div>
          </div>

          {/* Sign in with GitHub Button */}
          <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-full">
            <button
              onClick={handleGitHubSignIn}
              className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-8 py-3 relative rounded-md shrink-0 transition-all hover:scale-105"
            >
              <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center overflow-clip p-0 relative shrink-0 size-6">
                <GitHubIcon />
              </div>
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                <p className="block leading-[normal] whitespace-pre">Sign in with Github</p>
              </div>
            </button>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center px-[200px] py-0 relative shrink-0 w-full">
          <div className="aspect-[1040/585] bg-[#14233a] box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative rounded-[50px] shrink-0 w-full">
            <div className="h-[49.2px] relative shrink-0 w-12 cursor-pointer transition-all hover:scale-110">
              <div className="absolute inset-0 overflow-clip">
                <div className="absolute contents inset-0">
                  <div className="absolute bottom-[1.07%] left-0 right-0 top-0">
                    <PlayIcon />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 top-[1.07%]">
                    <PlayIcon />
                  </div>
                  <div className="absolute inset-[26.7%_28.3%_25.62%_37%]">
                    <PlayIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Spirit Section */}
        <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-start px-[200px] py-0 relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-col gap-[100px] items-center justify-start p-0 relative rounded-md shrink-0 w-full">
            <div className="box-border content-stretch flex flex-col gap-6 items-center justify-center p-0 relative shrink-0 w-full">
              <div
                className="font-michroma leading-[0] min-w-full not-italic relative shrink-0 text-[#ffffff] text-[42px] text-center"
                style={{ width: "min-content" }}
              >
                <p className="block leading-[1.3]">The Spirit</p>
              </div>
              <div className="h-0 relative shrink-0 w-[500px]">
                <div className="absolute inset-[-1px_-0.2%]">
                  <div className="w-full h-px bg-gray-300"></div>
                </div>
              </div>
            </div>

            {/*TODO: factorize*/}

            {/* Three Cards */}
            <div className="box-border content-stretch flex flex-row gap-8 items-start justify-center p-0 relative shrink-0 w-full">
              {/* Card 1: You Focus on OSS */}
              <div className="basis-0 bg-[#14233a] box-border content-stretch flex flex-col gap-8 grow items-start justify-start min-h-px min-w-px overflow-clip px-8 py-9 relative rounded-[30px] self-stretch shrink-0">
                <div className="font-michroma leading-[1.3] min-w-full relative shrink-0 text-[#ff7e4b] text-[28px] text-left" style={{ width: "min-content" }}>
                  <p className="block mb-0 whitespace-pre-wrap">You Focus </p>
                  <p className="block">on OSS</p>
                </div>
                <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="relative shrink-0 size-6">
                      <CheckIcon />
                    </div>
                    <div className="basis-0 font-montserrat font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#ffffff] text-[18px] text-left">
                      <p className="block leading-[1.3]">We help you get paid for your OSS work</p>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="relative shrink-0 size-6">
                      <CheckIcon />
                    </div>
                    <div className="basis-0 font-montserrat font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#ffffff] text-[18px] text-left">
                      <p className="block leading-[1.3]">You choose: the what, the how, and the price</p>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="relative shrink-0 size-6">
                      <CheckIcon />
                    </div>
                    <div className="basis-0 font-montserrat font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#ffffff] text-[18px] text-left">
                      <p className="block leading-[1.3]">Work full-time, part-time, or on your schedule</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: We Handle The Rest */}
              <div className="basis-0 bg-[#14233a] box-border content-stretch flex flex-col gap-8 grow items-start justify-start min-h-px min-w-px overflow-clip px-8 py-9 relative rounded-[30px] self-stretch shrink-0">
                <div
                  className="font-michroma leading-[0] min-w-full not-italic relative shrink-0 text-[#ff7e4b] text-[28px] text-left"
                  style={{ width: "min-content" }}
                >
                  <p className="block leading-[1.3]">
                    We Handle <br />
                    The Rest
                  </p>
                </div>
                <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="relative shrink-0 size-6">
                      <CheckIcon />
                    </div>
                    <div className="basis-0 font-montserrat font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#ffffff] text-[18px] text-left">
                      <p className="block leading-[1.3]">Outreach, marketing, and sales? On us.</p>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="relative shrink-0 size-6">
                      <CheckIcon />
                    </div>
                    <div className="basis-0 font-montserrat font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#ffffff] text-[18px] text-left">
                      <p className="block leading-[1.3]">Negotiations, contracts, and sponsors? Covered.</p>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="relative shrink-0 size-6">
                      <CheckIcon />
                    </div>
                    <div className="basis-0 font-montserrat font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#ffffff] text-[18px] text-left">
                      <p className="block leading-[1.3]">Client relations, invoicing, and taxes? All handled.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: 100% Non-Profit */}
              <div className="basis-0 bg-[#14233a] box-border content-stretch flex flex-col gap-8 grow items-start justify-start min-h-px min-w-px overflow-clip px-8 py-9 relative rounded-[30px] self-stretch shrink-0">
                <div
                  className="font-michroma leading-[1.3] min-w-full not-italic relative shrink-0 text-[#ff7e4b] text-[28px] text-left"
                  style={{ width: "min-content" }}
                >
                  <p className="block mb-0">100% </p>
                  <p className="block">Non-Profit</p>
                </div>
                <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="relative shrink-0 size-6">
                      <CheckIcon />
                    </div>
                    <div className="basis-0 font-montserrat font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#ffffff] text-[18px] text-left">
                      <p className="block leading-[1.3]">Transparency on where the funds go</p>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="relative shrink-0 size-6">
                      <CheckIcon />
                    </div>
                    <div className="basis-0 font-montserrat font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#ffffff] text-[18px] text-left">
                      <p className="block leading-[1.3]">All earnings are reinvested in open-source</p>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="relative shrink-0 size-6">
                      <CheckIcon />
                    </div>
                    <div className="basis-0 font-montserrat font-normal grow leading-[0] min-h-px min-w-px relative shrink-0 text-[#ffffff] text-[18px] text-left">
                      <p className="block leading-[1.3]">Supporting oss neutrality and independence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Got A Question Section */}
        <div className="box-border content-stretch flex flex-col gap-8 items-center justify-start px-[200px] py-0 relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-col gap-4 h-[105px] items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-full">
            <div className="font-michroma not-italic relative shrink-0 text-[42px] w-full">
              <p className="block leading-[1.3]">Got A Question?</p>
            </div>
            <div className="font-montserrat font-normal relative shrink-0 text-[28px] w-full">
              <p className="block leading-[normal]">Book a meeting with our team</p>
            </div>
          </div>
          {/*TODO: there is a class for that */}
          <div className="box-border content-stretch flex flex-col gap-8 items-center justify-center p-0 relative shrink-0 w-full">
            <Link
              to="/support"
              className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-4 relative rounded-md shrink-0 transition-all hover:scale-105"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap">
                <p className="block leading-[normal] whitespace-pre">Book A Meeting</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
