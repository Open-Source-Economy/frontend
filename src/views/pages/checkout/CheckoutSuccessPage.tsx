import React from "react";
import { PageWrapper } from "../PageWrapper";
import { CheckCircle2 } from "lucide-react";

export function CheckoutSuccessPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-brand-navy flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-success/20 rounded-full mb-6">
            <CheckCircle2 className="w-10 h-10 text-brand-success" />
          </div>
          <h1 className="text-brand-neutral-950 mb-4">Thank You!</h1>
          <p className="text-brand-neutral-600 text-lg">Your support means the world to us.</p>
        </div>
      </div>
    </PageWrapper>
  );
}
