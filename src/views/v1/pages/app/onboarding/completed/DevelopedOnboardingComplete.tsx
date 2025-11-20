import React from "react";
import { OnboardingStepProps } from "../steps/OnboardingStepProps";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../../../paths";
import { laurianeCalDevLink } from "../../../../data";
import { PageWrapper } from "../../../PageWrapper";

export interface DevelopedOnboardingCompleteProps {}

export default function DevelopedOnboardingComplete(props: DevelopedOnboardingCompleteProps) {
  const navigate = useNavigate();

  const handleBookMeeting = () => {
    // Open calendar booking link in new tab
    window.open(laurianeCalDevLink, "_blank");
    // Also navigate to dashboard after opening the booking link
    setTimeout(() => {
      navigate(paths.HOME);
    }, 1000);
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center gap-25 pb-25 bg-[#0E1F35] min-h-screen">
        {/* Main Content */}
        <div className="flex px-0 py-12 flex-col justify-center items-start gap-12 flex-1 w-full">
          <div className="flex flex-col items-center gap-7 w-full">
            <h1 className="max-w-[900px] text-white text-center font-michroma text-[64px] leading-[1.3] font-normal">Thank You!</h1>
            <p className="text-white text-center font-montserrat text-[32px] leading-[1.3] font-normal w-full">We will be in contact shortly.</p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="flex px-0 py-12 flex-col items-center gap-8 w-full">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="text-white text-center font-montserrat text-[28px] font-normal leading-normal w-full">Have more questions? Schedule a call</div>
          </div>

          <div className="flex flex-col justify-center items-center gap-8 w-full">
            <button
              onClick={handleBookMeeting}
              className="flex px-5 py-4 justify-center items-center gap-2.5 rounded-md text-white font-michroma text-xs font-normal leading-normal bg-gradient-to-r from-[#FF7E4B] via-[#FF518C] to-[#66319B] hover:opacity-90 transition-opacity"
            >
              Book A Meeting
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
