import React, { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { onboardingHooks } from "src/api";
import { ApiError } from "src/utils/error/ApiError";
import { Step1State } from "../../OnboardingDataSteps";
import { OnboardingStepProps } from "../OnboardingStepProps";
import * as dto from "@open-source-economy/api-types";
import { Mail, User } from "lucide-react";

import { Checkbox } from "src/views/components/ui/forms/checkbox";
import { Label } from "src/views/components/ui/forms/label";
import { FieldError } from "src/views/components/ui/forms/field-error";
import { InfoMessage } from "../../../../components/ui/info-message";
import { ServerErrorAlert } from "src/views/components/ui/state/ServerErrorAlert";

import { isVisible } from "src/utils/featureVisibility";
import { useZodForm, RhfFormInput } from "src/views/components/ui/forms/rhf";
import { onboardingStep1Schema, type OnboardingStep1FormData } from "src/views/components/ui/forms/schemas";
import { FormProvider } from "react-hook-form";

export interface Step1Props extends OnboardingStepProps<Step1State> {}

export default function Step1(props: Step1Props) {
  const createProfile = onboardingHooks.useCreateDeveloperProfileMutation();
  const updateContactInfos = onboardingHooks.useUpdateDeveloperContactInfosMutation();

  const isLoading = createProfile.isPending || updateContactInfos.isPending;
  const mutationError = createProfile.error || updateContactInfos.error;
  const apiError = mutationError
    ? mutationError instanceof ApiError
      ? mutationError
      : ApiError.from(mutationError)
    : null;

  const form = useZodForm(onboardingStep1Schema, {
    defaultValues: {
      name: props.state.name || "",
      contactEmail: props.state.contactEmail || "",
      agreedToTerms: (props.state.agreedToTerms || false) as unknown,
    },
  });

  // Sync RHF -> parent state
  useEffect(() => {
    const sub = form.watch((values) => {
      props.updateState({
        name: values.name ?? undefined,
        contactEmail: values.contactEmail ?? undefined,
        agreedToTerms: values.agreedToTerms === true,
      });
    });
    return () => sub.unsubscribe();
  }, [form, props.updateState]);

  // Register next-step handler
  useEffect(() => {
    if (props.setOnNext) {
      const handleNext = async (): Promise<boolean> => {
        const isValid = await form.trigger();
        if (!isValid) return false;

        const values = form.getValues();

        try {
          if (props.state.developerProfileId) {
            const params: dto.UpdateContactInfosParams = {};
            const body: dto.UpdateContactInfosBody = {
              name: values.name,
              email: values.contactEmail,
            };
            const query: dto.UpdateContactInfosQuery = {};
            await updateContactInfos.mutateAsync({ params, body, query });
          } else {
            const params: dto.CreateProfileParams = {};
            const body: dto.CreateProfileBody = {
              name: values.name,
              email: values.contactEmail,
              agreedToTerms: values.agreedToTerms,
            };
            const query: dto.CreateProfileQuery = {};
            await createProfile.mutateAsync({ params, body, query });
          }
          return true;
        } catch {
          return false;
        }
      };

      props.setOnNext(handleNext);
      return () => props.setOnNext?.(null);
    }
  }, [props.setOnNext, props.state.developerProfileId]);

  return (
    <div>
      {apiError && <ServerErrorAlert error={apiError} variant="compact" />}

      <FormProvider {...form}>
        <div className="space-y-5 sm:space-y-6">
          <RhfFormInput<OnboardingStep1FormData>
            name="name"
            label="Full Name"
            placeholder="Jane Doe"
            leftIcon={User}
            disabled={isLoading}
            required
          />

          <RhfFormInput<OnboardingStep1FormData>
            name="contactEmail"
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            leftIcon={Mail}
            disabled={isLoading}
            hint="We'll use this to contact you about opportunities and send important updates."
            required
          />

          <div className="mt-6 sm:mt-8">
            <div className="flex items-start gap-3">
              <Checkbox
                id="termsAccepted"
                checked={form.watch("agreedToTerms") === true}
                onCheckedChange={(checked: boolean) => {
                  form.setValue("agreedToTerms", checked as unknown, { shouldValidate: form.formState.isSubmitted });
                }}
                disabled={isLoading}
                className="mt-0.5"
              />
              <Label
                htmlFor="termsAccepted"
                className="flex-1 text-sm text-brand-neutral-700 cursor-pointer leading-relaxed"
              >
                By submitting this form, I agree to the{" "}
                <Link
                  to="/terms-and-conditions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:text-brand-accent-light underline underline-offset-2 transition-colors duration-200 inline-block"
                >
                  Terms and Conditions
                </Link>{" "}
                <span className="text-brand-error">*</span>
              </Label>
            </div>
            <FieldError error={form.formState.errors.agreedToTerms?.message as string | undefined} className="mt-2" />
          </div>

          <InfoMessage variant="muted" className="mt-6 sm:mt-8">
            Your information is secure and will only be used to connect you with enterprise opportunities. We never
            share your contact details without your permission
            {isVisible("privacyPolicy") && (
              <>
                {" "}
                — learn more in our{" "}
                <Link
                  to="/privacy"
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
      </FormProvider>
    </div>
  );
}
