import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getOnboardingBackendAPI } from "src/services";
import { ApiError } from "src/ultils/error/ApiError";
import { Step1State } from "../../OnboardingDataSteps";
import { OnboardingStepProps } from "../OnboardingStepProps";
import * as dto from "@open-source-economy/api-types";
import { handleApiCall } from "../../../../../ultils";
import { Mail, User } from "lucide-react";

import { Checkbox } from "src/views/components/ui/forms/checkbox";
import { Label } from "src/views/components/ui/forms/label";
import { type InputRef, ValidatedInputWithRef } from "src/views/components/ui/forms/validated-input";
import { FieldError } from "src/views/components/ui/forms/field-error";
import { validateEmail, validateName } from "src/views/components/ui/forms/validators";
import { InfoMessage } from "../../../../components/ui/info-message";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";
import { LoadingState } from "src/views/components/ui/state/loading-state";
import { paths } from "../../../../../paths";
import { isVisible } from "src/ultils/featureVisibility";

export interface Step1Props extends OnboardingStepProps<Step1State> {}

export default function Step1(props: Step1Props) {
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onboardingAPI = getOnboardingBackendAPI();

  // Refs for inputs
  const nameInputRef = useRef<InputRef>(null);
  const emailInputRef = useRef<InputRef>(null);

  const validateForm = (): boolean => {
    const showInputError: boolean = true;
    let isFormValid = true;

    const isNameValid = nameInputRef.current?.validate(showInputError) ?? false;
    const isEmailValid = emailInputRef.current?.validate(showInputError) ?? false;
    const isTermsValid = props.state.agreedToTerms || false;

    if (!isNameValid || !isEmailValid || !isTermsValid) {
      isFormValid = false;

      // Set errors for terms if needed
      if (!isTermsValid) {
        setErrors({ ...errors, agreedToTerms: "You must accept the Terms and Conditions to continue" });
      } else {
        setErrors({ ...errors, agreedToTerms: "" });
      }
    }

    setIsFormValid(isFormValid);
    return isFormValid;
  };

  const handleNext = async (): Promise<boolean> => {
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

      return await handleApiCall(apiCall, setIsLoading, setApiError);
    }
    return false;
  };

  const handleInputChange = (field: keyof Step1State, value: string | boolean) => {
    props.updateState({ [field]: value });
  };

  React.useEffect(() => {
    if (props.setOnNext) {
      props.setOnNext(handleNext);
      return () => props.setOnNext?.(null);
    }
  }, [props.setOnNext, props.state.name, props.state.contactEmail, props.state.agreedToTerms]);

  return (
    <div>
      {/* Error Display */}
      {apiError && <ServerErrorAlert error={apiError} variant="compact" />}

      {/*/!* Loading Indicator *!/*/}
      {/*{isLoading && <LoadingState variant="spinner" size="md" />}*/}

      {/* Form */}
      <div className="space-y-5 sm:space-y-6">
        {/* Full Name */}
        <ValidatedInputWithRef
          ref={nameInputRef}
          name="fullName"
          label="Full Name"
          value={props.state.name || ""}
          disabled={isLoading}
          onChange={value => handleInputChange("name", value)}
          placeholder="Jane Doe"
          leftIcon={User}
          validator={validateName}
        />

        {/* Email Address */}
        <ValidatedInputWithRef
          ref={emailInputRef}
          name="email"
          label="Email Address"
          type="email"
          value={props.state.contactEmail || ""}
          disabled={isLoading}
          onChange={value => handleInputChange("contactEmail", value)}
          placeholder="jane@example.com"
          leftIcon={Mail}
          validator={validateEmail}
          hint="We'll use this to contact you about opportunities and send important updates."
        />

        {/* Terms and Conditions */}
        <div className="mt-6 sm:mt-8">
          <div className="flex items-start gap-3">
            <Checkbox
              id="termsAccepted"
              checked={props.state.agreedToTerms || false}
              onCheckedChange={(checked: boolean) => handleInputChange("agreedToTerms", checked)}
              disabled={isLoading}
              className="mt-0.5"
            />
            <Label htmlFor="termsAccepted" className="flex-1 text-sm text-brand-neutral-700 cursor-pointer leading-relaxed">
              By submitting this form, I agree to the{" "}
              <Link
                to={paths.TERMS_AND_CONDITIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-accent hover:text-brand-accent-light underline underline-offset-2 transition-colors duration-200 inline-block"
              >
                Terms and Conditions
              </Link>{" "}
              <span className="text-brand-error">*</span>
            </Label>
          </div>
          <FieldError error={errors.agreedToTerms} className="mt-2" />
        </div>
        {/* Privacy Notice - Subtle */}
        <InfoMessage variant="muted" className="mt-6 sm:mt-8">
          Your information is secure and will only be used to connect you with enterprise opportunities. We never share your contact details without your
          permission
          {isVisible("privacyPolicy") && (
            <>
              {" "}
              — learn more in our{" "}
              <Link
                to={paths.PRIVACY}
                target="_blank"
                className="text-brand-accent hover:text-brand-accent-light underline underline-offset-2 transition-colors duration-200 inline-block"
              >
                Privacy Policy
              </Link>
            </>
          )}
          .
        </InfoMessage>
      </div>
    </div>
  );
}
