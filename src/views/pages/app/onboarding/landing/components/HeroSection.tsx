import React from "react";
import { Button } from "../../../../../components/elements/Button";
import { Audience } from "src/views/index";

interface HeroSectionProps {
  onGitHubSignIn: () => void;
}

export function HeroSection(props: HeroSectionProps) {
  return (
    <div className="w-full px-8 md:px-20 lg:px-[200px] flex flex-col items-center gap-12">
      <div className="flex flex-col items-center gap-7 text-center">
        <h1 className="max-w-[900px] text-white font-michroma text-3xl md:text-5xl lg:text-[64px] leading-[1.3]">Fuel Your Open Source Passion</h1>
        <p className="text-white font-montserrat text-xl md:text-2xl lg:text-[32px] leading-[1.3]">Earn recurring income, your way.</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-8 self-stretch">
        <Button
          onClick={props.onGitHubSignIn}
          audience={Audience.DEVELOPER}
          level="PRIMARY"
          size="MEDIUM"
          className="!bg-primary-developer hover:!bg-primary-developer/90 transition-all duration-300 !capitalize"
          icon={
            // TODO: refactor GitHub SVG icon
            <svg width="24" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 1.75977C6.69875 1.75977 2 6.45852 2 12.2598C2 16.906 5.00562 20.8304 9.17937 22.2216C9.70437 22.3135 9.90125 21.9985 9.90125 21.7229C9.90125 21.4735 9.88813 20.6466 9.88813 19.7673C7.25 20.2529 6.5675 19.1241 6.3575 18.5335C6.23938 18.2316 5.7275 17.2998 5.28125 17.0504C4.91375 16.8535 4.38875 16.3679 5.26813 16.3548C6.095 16.3416 6.68563 17.116 6.8825 17.431C7.8275 19.0191 9.33688 18.5729 9.94063 18.2973C10.0325 17.6148 10.3081 17.1554 10.61 16.8929C8.27375 16.6304 5.8325 15.7248 5.8325 11.7085C5.8325 10.5666 6.23938 9.62164 6.90875 8.88664C6.80375 8.62414 6.43625 7.54789 7.01375 6.10414C7.01375 6.10414 7.89313 5.82852 9.90125 7.18039C10.7413 6.94414 11.6338 6.82602 12.5263 6.82602C13.4188 6.82602 14.3113 6.94414 15.1513 7.18039C17.1594 5.81539 18.0387 6.10414 18.0387 6.10414C18.6163 7.54789 18.2488 8.62414 18.1438 8.88664C18.8131 9.62164 19.22 10.5535 19.22 11.7085C19.22 15.7379 16.7656 16.6304 14.4294 16.8929C14.81 17.221 15.1381 17.851 15.1381 18.8354C15.1381 20.2398 15.125 21.3685 15.125 21.7229C15.125 21.9985 15.3219 22.3266 15.8469 22.2216C19.9944 20.8304 23 16.8929 23 12.2598C23 6.45852 18.3013 1.75977 12.5 1.75977Z"
                fill="white"
              />
            </svg>
          }
        >
          Sign in with Github
        </Button>
      </div>
    </div>
  );
}
