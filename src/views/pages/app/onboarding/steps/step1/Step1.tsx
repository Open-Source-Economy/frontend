import React, { useEffect, useRef, useState } from "react";
import { getOnboardingBackendAPI } from "src/services";
import { ApiError } from "src/ultils/error/ApiError";
import { Step1State } from "../../OnboardingDataSteps";
import { OnboardingStepProps } from "../OnboardingStepProps";
import * as dto from "@open-source-economy/api-types";
import { handleApiCall } from "../../../../../../ultils";

import { CheckboxInputRef, EmailInput, GenericInputRef, NameInput, TermsAndConditionsCheckbox } from "../../../../../components/form";

export interface Step1Props extends OnboardingStepProps<Step1State> {}

export default function Step1(props: Step1Props) {
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // New state
  const onboardingAPI = getOnboardingBackendAPI();

  // Refs for inputs, including the new checkbox, typed with their respective ref interfaces
  const nameInputRef = useRef<GenericInputRef>(null);
  const emailInputRef = useRef<GenericInputRef>(null);
  const termsCheckboxRef = useRef<CheckboxInputRef>(null);

  useEffect(() => {
    // Check the validity of each input using the new "silent" method
    const nameIsValid = nameInputRef.current?.isValid() ?? false;
    const emailIsValid = emailInputRef.current?.isValid() ?? false;
    const termsAreValid = termsCheckboxRef.current?.isValid() ?? false;

    // Update the form's validity state
    setIsFormValid(nameIsValid && emailIsValid && termsAreValid);
  }, [props.state]); // This effect runs whenever the form data changes

  // The validateForm now aggregates validation results from all child input components.
  const validateForm = (): boolean => {
    let isValid = true;

    const isNameValid = nameInputRef.current?.validate() ?? false;
    const isEmailValid = emailInputRef.current?.validate() ?? false;
    const isTermsValid = termsCheckboxRef.current?.validate() ?? false;

    if (!isNameValid || !isEmailValid || !isTermsValid) {
      isValid = false;
    }

    return isValid;
  };

  const handleNext = async () => {
    if (validateForm()) {
      const apiCall = async () => {
        let result;
        if (props.state.developerProfileId) {
          const params: dto.UpdateDeveloperContactInfosParams = {};
          const body: dto.UpdateDeveloperContactInfosBody = {
            name: props.state.name!,
            email: props.state.contactEmail!,
          };
          const query: dto.UpdateDeveloperContactInfosQuery = {};
          result = await onboardingAPI.updateDeveloperContactInfos(params, body, query);
        } else {
          const params: dto.CreateDeveloperProfileParams = {};
          const body: dto.CreateDeveloperProfileBody = {
            name: props.state.name!,
            email: props.state.contactEmail!,
            agreedToTerms: props.state.agreedToTerms!,
          };
          const query: dto.CreateDeveloperProfileQuery = {};
          result = await onboardingAPI.createDeveloperProfile(params, body, query);
        }
        return result;
      };

      const onSuccess = () => {
        props.onNext();
      };

      await handleApiCall(apiCall, setIsLoading, setApiError, onSuccess);
    }
  };

  const handleInputChange = (field: keyof Step1State, value: string | boolean) => {
    props.updateState({ [field]: value });
  };

  return (
    <div>
      {/* Form Content */}
      <div className="box-border content-stretch flex flex-col gap-8 items-center justify-start px-[200px] py-0 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-col gap-12 items-center justify-center p-0 relative shrink-0 w-full">
          {/* Section Title */}
          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start leading-[0] p-0 relative shrink-0 text-[#ffffff] text-center w-full">
            <div className="font-michroma not-italic relative shrink-0 text-[42px] w-full">
              <p className="block leading-[1.3]">Confirm Your Details</p>
            </div>
            <div className="font-montserrat font-normal relative shrink-0 text-[20px] w-full">
              <p className="block leading-[1.3]">This is so that we can get in contact with you</p>
            </div>
          </div>

          {/* Form Card */}
          <div className="box-border content-stretch flex flex-col gap-6 items-center justify-start p-0 relative shrink-0">
            <div className="bg-[#14233a] box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-8 py-9 relative rounded-[30px] shrink-0">
              <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start p-0 relative shrink-0 w-[680px]">
                {/* Name Input */}
                <NameInput
                  id="name"
                  name="name"
                  label="Your name"
                  required
                  value={props.state.name}
                  onChange={e => handleInputChange("name", e.target.value)}
                  placeholder="Your name"
                  ref={nameInputRef}
                />

                <EmailInput
                  id="email"
                  name="email"
                  label="Your email address"
                  required
                  value={props.state.contactEmail || ""}
                  onChange={e => handleInputChange("contactEmail", e.target.value)}
                  placeholder="Your email address"
                  ref={emailInputRef}
                />
              </div>
            </div>

            {/* Terms and Conditions Checkbox - Using the new component */}
            <TermsAndConditionsCheckbox
              required
              checked={props.state.agreedToTerms || false}
              onChange={e => handleInputChange("agreedToTerms", e.target.checked)}
              ref={termsCheckboxRef}
            />

            {apiError && <div className="text-red-400 text-sm mt-2">API Error: {apiError.message}</div>}
          </div>

          {/* Button Group */}
          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-center justify-center p-0 relative shrink-0">
            {/*TODO: sam: use or update the class Button */}
            <button
              onClick={props.onBack}
              className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Back</p>
              </div>
            </button>

            {/*TODO: sam: use or update the class Button */}
            <button
              onClick={handleNext}
              disabled={!isFormValid || isLoading}
              className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">{isLoading ? "Saving..." : "Next"}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
