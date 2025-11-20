import React, { useRef, useState } from "react";
import { getOnboardingBackendAPI } from "src/services";
import { ApiError } from "src/ultils/error/ApiError";
import { Step1State } from "../../OnboardingDataSteps";
import { OnboardingStepProps } from "../OnboardingStepProps";
import * as dto from "@open-source-economy/api-types";
import { handleApiCall } from "../../../../../../../ultils";

import { EmailInput, GenericInputRef, NameInput } from "../../../../../components/form";
import { FormSection } from "./FormSection";
import { CheckboxOption } from "./CheckboxOption";
import { ButtonGroup } from "../../landing/components/ButtonGroup";

export interface Step1Props extends OnboardingStepProps<Step1State> {}

export default function Step1(props: Step1Props) {
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const onboardingAPI = getOnboardingBackendAPI();

  // Refs for inputs, including the new checkbox, typed with their respective ref interfaces
  const nameInputRef = useRef<GenericInputRef>(null);
  const emailInputRef = useRef<GenericInputRef>(null);

  const validateForm = (): boolean => {
    const showInputError: boolean = true;
    let isFormValid = true;

    const isNameValid = nameInputRef.current?.validate(showInputError) ?? false;
    const isEmailValid = emailInputRef.current?.validate(showInputError) ?? false;
    const isTermsValid = props.state.agreedToTerms || false;

    if (!isNameValid || !isEmailValid || !isTermsValid) {
      isFormValid = false;
    }

    setIsFormValid(isFormValid);
    return isFormValid;
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

  const handleTermsClick = () => {
    // Handle terms and conditions link click
    window.open("/terms-and-conditions.pdf", "_blank");
  };

  return (
    <>
      <FormSection>
        {/* Input Fields */}
        <div className="flex flex-col items-start gap-6 self-stretch">
          <NameInput
            id="name"
            name="name"
            label="Your name"
            required
            value={props.state.name || ""}
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

        {/* Terms and Conditions Checkbox */}
        <CheckboxOption
          checked={props.state.agreedToTerms || false}
          onChange={checked => handleInputChange("agreedToTerms", checked)}
          text="By submitting this form, I agree to the "
          linkText="Terms and Conditions"
          onLinkClick={handleTermsClick}
        />
      </FormSection>

      {/* Button Group */}
      <ButtonGroup
        onBack={props.onBack}
        onNext={handleNext}
        isLoading={isLoading}
        showErrorMessage={!isFormValid && !isLoading}
        errorMessage={apiError ? `API Error: ${apiError.message}` : undefined}
      />
    </>
  );
}
