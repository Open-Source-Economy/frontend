import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { InfoMessage } from "../info-message";
import { ServerErrorAlert } from "../state/ServerErrorAlert";
import { getBackendAPI } from "src/services";
import { handleApiCall } from "src/ultils";
import { validateEmail } from "./validators";
import { ApiError } from "src/ultils/error/ApiError";

const backendAPI = getBackendAPI();

export default function NewsletterSubscriptionForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationMsg = validateEmail(email);
    setValidationError(validationMsg);
    if (validationMsg) return;

    await handleApiCall(
      () =>
        backendAPI.subscribeToNewsletter(
          {},
          { email },
          {}
        ),
      setIsLoading,
      setApiError,
      setIsSuccess,
      () => setEmail("")
    );
  };

  return (
    <div className="max-w-md">
      <h3 className="font-medium mb-2">Stay Updated</h3>
      <p className="text-muted-foreground mb-4">
        Get the latest updates on open source projects and community news.
      </p>

      {apiError && <ServerErrorAlert error={apiError} />}

      {isSuccess && (
        <InfoMessage variant="success">
          Thanks for subscribing! Check your inbox to confirm.
        </InfoMessage>
      )}

      {!isSuccess && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-start">
          <div className="w-full">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            {validationError && (
              <p className="text-sm text-brand-error mt-1">{validationError}</p>
            )}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}
    </div>
  );
}
