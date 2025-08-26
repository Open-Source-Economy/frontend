import { OnboardingStepProps } from "../OnboardingStepProps";
import { Step6State } from "../../OnboardingDataSteps";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../../../paths";
import { laurianeCalDevLink } from "../../../../../data";
import { Button } from "../../../../../components/elements/Button";

export interface Step6Props extends OnboardingStepProps<Step6State> { }

export default function Step6(props: Step6Props) {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate(paths.HOME);
  };

  const handleBookMeeting = () => {
    // Open calendar booking link in new tab
    window.open(laurianeCalDevLink, "_blank");
    // Also navigate to dashboard after opening the booking link
    setTimeout(() => {
      navigate(paths.HOME);
    }, 1000);
  };

  return (
    <div className="bg-[#0e1f35] box-border content-stretch flex flex-col gap-[50px] items-center justify-center min-h-screen p-0 relative size-full">
      {/* Success Content */}
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-center p-0 relative shrink-0 w-full max-w-[800px] mx-auto px-8">
        {/* Success Icon */}
        <div className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0">
          <div className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] rounded-full p-6 mb-6">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-full">
          <div className="font-michroma not-italic relative shrink-0 text-[48px] w-full">
            <p className="block leading-[1.3]">Welcome to Open Source Economy!</p>
          </div>
          <div className="font-montserrat font-normal relative shrink-0 text-[24px] w-full opacity-90">
            <p className="block leading-[1.5]">Your profile has been successfully created</p>
          </div>
          <div className="font-montserrat font-normal relative shrink-0 text-[18px] w-full opacity-70 mt-4">
            <p className="block leading-[1.5]">You're all set to start earning from your open source contributions.</p>
            <p className="block leading-[1.5] mt-2">What would you like to do next?</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="box-border content-stretch flex flex-row gap-8 items-stretch justify-center p-0 relative shrink-0 w-full">
          {/* Dashboard Card */}
          <div className="basis-0 bg-[#14233a] box-border content-stretch flex flex-col gap-6 grow items-center justify-between min-h-px min-w-px p-8 relative rounded-[20px] shrink-0 border border-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.4)] transition-all">
            <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start p-0 relative shrink-0 w-full">
              <div className="bg-[#202f45] rounded-full p-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="#ff7e4b" strokeWidth="2" />
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="#ff518c" strokeWidth="2" />
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="#66319b" strokeWidth="2" />
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="#ff7e4b" strokeWidth="2" />
                </svg>
              </div>
              <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[24px] text-center w-full">
                <p className="block leading-[1.3]">Go to Dashboard</p>
              </div>
              <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[16px] text-center w-full opacity-70">
                <p className="block leading-[1.5]">Explore your dashboard, view opportunities, and start contributing</p>
              </div>
            </div>
            <Button level="PRIMARY" audience="DEVELOPER" size="MEDIUM" onClick={handleDashboard} className="w-full">
              Continue to Dashboard
            </Button>
          </div>

          {/* Book Meeting Card */}
          <div className="basis-0 bg-[#14233a] box-border content-stretch flex flex-col gap-6 grow items-center justify-between min-h-px min-w-px p-8 relative rounded-[20px] shrink-0 border border-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.4)] transition-all">
            <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start p-0 relative shrink-0 w-full">
              <div className="bg-[#202f45] rounded-full p-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="#ff7e4b" strokeWidth="2" />
                  <path d="M16 2V6" stroke="#ff518c" strokeWidth="2" strokeLinecap="round" />
                  <path d="M8 2V6" stroke="#ff518c" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 10H21" stroke="#66319b" strokeWidth="2" />
                  <circle cx="12" cy="16" r="1" fill="#ff7e4b" />
                </svg>
              </div>
              <div className="font-michroma not-italic relative shrink-0 text-[#ffffff] text-[24px] text-center w-full">
                <p className="block leading-[1.3]">Book a Meeting</p>
              </div>
              <div className="font-montserrat font-normal relative shrink-0 text-[#ffffff] text-[16px] text-center w-full opacity-70">
                <p className="block leading-[1.5]">Schedule a 30-minute call with our team to discuss opportunities</p>
              </div>
            </div>
            <button
              onClick={handleBookMeeting}
              className="bg-transparent box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-6 py-3 relative rounded-md shrink-0 border-2 border-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] transition-all hover:bg-[rgba(255,255,255,0.05)] w-full"
              style={{
                border: "2px solid transparent",
                backgroundImage: "linear-gradient(#14233a, #14233a), linear-gradient(to right, #ff7e4b, #ff518c, #66319b)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
              }}
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Schedule Meeting</p>
              </div>
            </button>
          </div>
        </div>

        {/* Skip Link */}
        <div className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0 w-full mt-4">
          <button
            onClick={handleDashboard}
            className="font-montserrat font-normal text-[#ffffff] text-[14px] opacity-60 hover:opacity-100 transition-opacity underline"
          >
            Skip for now and go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
