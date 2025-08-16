import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OnboardingState } from "../OnboardingFlow";
import ProgressBar from "../components/ProgressBar";
import { getOnboardingBackendAPI } from "src/services";
import { ApiError } from "src/ultils/error/ApiError";

interface Step1ProfileProps {
  state: OnboardingState;
  updateState: (updates: Partial<OnboardingState>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  terms?: string;
}

export default function Step1Profile({ state, updateState, onNext, onBack, currentStep }: Step1ProfileProps) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const onboardingAPI = getOnboardingBackendAPI();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!state.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!state.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!state.agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateForm()) {
      setSaving(true);
      try {
        // Save profile data to backend
        const profileData = {
          name: state.name,
          email: state.email,
          agreedToTerms: state.agreedToTerms,
        };

        console.log("Sending profile data:", profileData);
        console.log("State values:", { name: state.name, email: state.email, agreedToTerms: state.agreedToTerms });

        // Try to update profile first, if that fails, create a new one
        let result = await onboardingAPI.updateProfile(profileData);

        if (result instanceof ApiError) {
          // If update fails, create profile with the data
          result = await onboardingAPI.createProfile(profileData);
          if (result instanceof ApiError) {
            throw new Error("Failed to save profile data");
          }
        }

        // Move to next step
        onNext();
      } catch (error) {
        console.error("Error saving profile:", error);
        setErrors({ name: "Failed to save profile. Please try again." });
      } finally {
        setSaving(false);
      }
    }
  };

  const handleInputChange = (field: keyof OnboardingState, value: string | boolean) => {
    updateState({ [field]: value });
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="box-border content-stretch flex flex-col gap-[50px] items-center justify-start pb-[100px] pt-[80px] px-0 relative size-full">
      {/* Progress Bar */}
      <ProgressBar currentStep={currentStep} />

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
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0">
                    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0">
                      <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                        <p className="block leading-[1.5] whitespace-pre">Your name</p>
                      </div>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="basis-0 bg-[#202f45] box-border content-stretch flex flex-row gap-1 grow items-center justify-start min-h-px min-w-px p-[12px] relative rounded-md shrink-0">
                      <input
                        type="text"
                        value={state.name}
                        onChange={e => handleInputChange("name", e.target.value)}
                        placeholder="Your name"
                        className="w-full bg-transparent font-montserrat font-normal leading-[0] text-[#ffffff] text-[16px] text-left outline-none placeholder:opacity-60 placeholder:text-[#ffffff]"
                      />
                    </div>
                  </div>
                  {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
                </div>

                {/* Email Input */}
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                  <div className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0">
                    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0">
                      <div className="font-montserrat font-normal leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                        <p className="block leading-[1.5] whitespace-pre">Your email address</p>
                      </div>
                    </div>
                  </div>
                  <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="basis-0 bg-[#202f45] box-border content-stretch flex flex-row gap-1 grow items-center justify-start min-h-px min-w-px p-[12px] relative rounded-md shrink-0">
                      <input
                        type="email"
                        value={state.email}
                        onChange={e => handleInputChange("email", e.target.value)}
                        placeholder="Your email address"
                        className="w-full bg-transparent font-montserrat font-normal leading-[0] text-[#ffffff] text-[16px] text-left outline-none placeholder:opacity-60 placeholder:text-[#ffffff]"
                      />
                    </div>
                  </div>
                  {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
                </div>
              </div>
            </div>

            {/* Checkbox for Terms */}
            <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0">
              <div className="relative bg-[#202f45] rounded-sm shrink-0 size-[18px] flex items-center justify-center cursor-pointer overflow-hidden">
                <input
                  type="checkbox"
                  checked={state.agreedToTerms}
                  onChange={e => handleInputChange("agreedToTerms", e.target.checked)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {state.agreedToTerms && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] rounded-sm flex items-center justify-center">
                    <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4.5L4.5 8L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="box-border content-stretch flex flex-row gap-1 items-center justify-start leading-[0] p-0 relative shrink-0 text-[16px] text-left text-nowrap">
                <div className="flex flex-col font-montserrat font-normal justify-center relative shrink-0 text-[#ffffff]">
                  <p className="block leading-[1.1] text-nowrap whitespace-pre">By submitting this form, I agree to the</p>
                </div>
                <Link
                  to="/terms-and-conditions"
                  target="_blank"
                  className="bg-clip-text bg-gradient-to-r flex flex-col font-montserrat font-medium from-[#ff7e4b] justify-center relative shrink-0 to-[#66319b] via-50% via-[#ff518c] underline"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  <p className="block leading-[1.1] text-nowrap whitespace-pre">Terms and Conditions</p>
                </Link>
              </div>
            </div>
            {errors.terms && <div className="text-red-400 text-sm">{errors.terms}</div>}
          </div>

          {/* Button Group */}
          <div className="box-border content-stretch flex flex-row gap-4 h-12 items-center justify-center p-0 relative shrink-0">
            <button
              onClick={onBack}
              className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 border border-[#ffffff] transition-all hover:bg-[rgba(255,255,255,0.1)]"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">Back</p>
              </div>
            </button>

            <button
              onClick={handleNext}
              disabled={saving}
              className="bg-gradient-to-r from-[#ff7e4b] via-[#ff518c] to-[#66319b] box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-3 relative rounded-md shrink-0 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="font-michroma leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
                <p className="block leading-[1.5] whitespace-pre">{saving ? "Saving..." : "Next"}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
