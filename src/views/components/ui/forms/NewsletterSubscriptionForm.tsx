import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Alert, AlertDescription } from "../state/alert";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { getBackendAPI } from "src/services";
import { handleApiCall } from "src/ultils";
import { validateEmail } from "./validators";
import { ApiError } from "src/ultils/error/ApiError";

const backendAPI = getBackendAPI();

export default function NewsletterSubscriptionForm() {
  // UI state
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState<string | undefined>();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset
    setApiError(null);
    setStatus("idle");
    setValidationError(undefined);

    // Validate email using your design-system validator
    const validationMsg = validateEmail(email);
    if (validationMsg) {
      setValidationError(validationMsg);
      setStatus("error");
      return;
    }

    // Call backend using your centralized API handler
    const success = await handleApiCall(
      () =>
        backendAPI.subscribeToNewsletter(
          {},
          { email },
          {} // no query params needed
        ),
      setIsLoading,
      setApiError,
      () => {
        setStatus("success");
        setEmail("");
      }
    );

    if (!success) {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setEmail("");
    setApiError(null);
    setValidationError(undefined);
  };

  return (
    <div className="max-w-md">
      <h3 className="font-medium mb-2">Stay Updated</h3>
      <p className="text-muted-foreground mb-4">
        Get the latest updates on open source projects and community news.
      </p>

      {/* Loading */}
      {isLoading && (
        <Alert className="mb-4 border-brand-accent bg-brand-accent/10">
          <Loader2 className="h-4 w-4 text-brand-accent animate-spin" />
          <AlertDescription className="text-brand-accent">
            Processing your subscription...
          </AlertDescription>
        </Alert>
      )}

      {/* Success */}
      {status === "success" && (
        <Alert className="mb-4 border-brand-success bg-brand-success/10">
          <CheckCircle2 className="h-4 w-4 text-brand-success" />
          <AlertDescription className="text-brand-success">
            Thanks for subscribing! Check your inbox to confirm.
          </AlertDescription>
        </Alert>
      )}

      {/* Error */}
      {(status === "error" && (validationError || apiError)) && (
        <Alert className="mb-4 border-brand-error bg-brand-error/10">
          <AlertCircle className="h-4 w-4 text-brand-error" />
          <AlertDescription className="text-brand-error">
            {validationError || apiError?.message || "Something went wrong."}
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      {status !== "success" && (
        <form onSubmit={handleSubscribe} className="flex gap-2 items-center">
          <Input
            type="email"
            placeholder="Enter your email"
            variant="outline"
            className="flex-1 h-10"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") {
                setStatus("idle");
                setValidationError(undefined);
                setApiError(null);
              }
            }}
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="default"
            size="default"
            className="h-10"
            disabled={isLoading}
          >
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

      {/* Reset after success */}
      {status === "success" && (
        <Button
          variant="outline"
          size="default"
          className="h-10 w-full mt-2"
          onClick={handleReset}
        >
          Subscribe Another Email
        </Button>
      )}
    </div>
  );
}
