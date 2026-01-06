import React, { useRef, useState } from "react";
import { Button } from "../ui/forms/button";
import { Alert, AlertDescription } from "../ui/state/alert";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { ServerErrorAlert } from "../ui/state/ServerErrorAlert";
import { ApiError } from "src/ultils/error/ApiError";
import { ValidatedInputWithRef, type InputRef } from "../ui/forms/inputs/validated-input";
import { validateEmail } from "../ui/forms/validators";
import { getBackendAPI } from "src/services";
import { handleApiCall } from "src/ultils";
import type { NewsletterSubscriptionBody, NewsletterSubscriptionParams, NewsletterSubscriptionQuery } from "@open-source-economy/api-types";

// -----------------------------
// Newsletter Section Component
// -----------------------------
interface NewsletterSectionProps {}

export function NewsletterSection({}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const emailInputRef = useRef<InputRef>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email using the ref
    const showInputError = true;
    const isEmailValid = emailInputRef.current?.validate(showInputError) ?? false;

    if (!isEmailValid) {
      return;
    }

    const backendAPI = getBackendAPI();
    const params: NewsletterSubscriptionParams = {};
    const body: NewsletterSubscriptionBody = { email };
    const query: NewsletterSubscriptionQuery = {};

    await handleApiCall(
      () => backendAPI.subscribeToNewsletter(params, body, query),
      setIsLoading,
      setError,
      () => {
        setIsSuccess(true);
        setEmail("");
      },
    );
  };

  const handleResetSuccess = () => {
    setIsSuccess(false);
    setEmail("");
    setError(null);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
    if (error) {
      setError(null);
    }
  };

  const handleErrorDismiss = () => {
    setError(null);
  };

  return (
    <div className="border-t border-border mt-8 pt-8">
      <div className="max-w-md">
        <h3 className="font-medium mb-2">Stay Updated</h3>
        <p className="text-muted-foreground mb-4">Get the latest updates on open source projects and community news.</p>

        {/* Success State */}
        {isSuccess && (
          <Alert className="mb-4 border-brand-success bg-brand-success/10">
            <CheckCircle2 className="h-4 w-4 text-brand-success" />
            <AlertDescription className="text-brand-success">Thanks for subscribing! Check your email to confirm your subscription.</AlertDescription>
          </Alert>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-4">
            <ServerErrorAlert
              variant="compact"
              message={error.message || "Subscription failed. Please try again later or contact support@opensourceeconomy.org"}
              showDismiss
              onDismiss={handleErrorDismiss}
            />
          </div>
        )}

        {/* Subscription Form */}
        {!isSuccess && (
          <form onSubmit={handleSubscribe} className="flex gap-2 items-center">
            <div className="flex-1">
              <ValidatedInputWithRef
                ref={emailInputRef}
                name="email"
                type="email"
                value={email}
                onChange={value => {
                  handleEmailChange(value);
                  if (error) {
                    handleErrorDismiss();
                  }
                }}
                placeholder="Enter your email"
                disabled={isLoading}
                leftIcon={Mail}
                validator={validateEmail}
              />
            </div>
            <Button type="submit" variant="default" size="default" className="h-10" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </form>
        )}

        {/* Success - Show action to subscribe again */}
        {isSuccess && (
          <Button variant="outline" size="default" className="h-10 w-full" onClick={handleResetSuccess}>
            Subscribe Another Email
          </Button>
        )}
      </div>
    </div>
  );
}
