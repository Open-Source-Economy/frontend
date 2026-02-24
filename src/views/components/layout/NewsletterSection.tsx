import React, { useState } from "react";
import { Button } from "../ui/forms/button";
import { Alert, AlertDescription } from "../ui/state/alert";
import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { ServerErrorAlert } from "../ui/state/ServerErrorAlert";
import { ApiError } from "src/ultils/error/ApiError";
import { stripeHooks } from "src/api";
import { useZodForm, Form, RhfFormInput } from "../ui/forms/rhf";
import { newsletterFormSchema, type NewsletterFormData } from "../ui/forms/schemas";

interface NewsletterSectionProps {}

export function NewsletterSection(_props: NewsletterSectionProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useZodForm(newsletterFormSchema, {
    defaultValues: { email: "" },
  });

  const newsletterMutation = stripeHooks.useSubscribeToNewsletterMutation();
  const error = newsletterMutation.error
    ? newsletterMutation.error instanceof ApiError
      ? newsletterMutation.error
      : ApiError.from(newsletterMutation.error)
    : null;

  const handleSubscribe = async (data: NewsletterFormData) => {
    try {
      await newsletterMutation.mutateAsync({
        params: {},
        body: { email: data.email },
        query: {},
      });
      setIsSuccess(true);
      form.reset();
    } catch {
      // Error is tracked by newsletterMutation.error
    }
  };

  const handleResetSuccess = () => {
    setIsSuccess(false);
    form.reset();
    newsletterMutation.reset();
  };

  const handleErrorDismiss = () => {
    newsletterMutation.reset();
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
            <AlertDescription className="text-brand-success">
              Thanks for subscribing! Check your email to confirm your subscription.
            </AlertDescription>
          </Alert>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-4">
            <ServerErrorAlert
              variant="compact"
              message={
                error.message || "Subscription failed. Please try again later or contact support@opensourceeconomy.org"
              }
              showDismiss
              onDismiss={handleErrorDismiss}
            />
          </div>
        )}

        {/* Subscription Form */}
        {!isSuccess && (
          <Form form={form} onSubmit={handleSubscribe} className="flex gap-2 items-center">
            <div className="flex-1">
              <RhfFormInput<NewsletterFormData>
                name="email"
                type="email"
                placeholder="Enter your email"
                disabled={newsletterMutation.isPending}
                leftIcon={Mail}
                required
              />
            </div>
            <Button
              type="submit"
              variant="default"
              size="default"
              className="h-10"
              disabled={newsletterMutation.isPending}
            >
              {newsletterMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </Button>
          </Form>
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
