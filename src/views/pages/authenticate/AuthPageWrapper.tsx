import React, { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { AuthStepHeader } from "./components/auth/AuthStepHeader";
import { PageWrapper } from "../PageWrapper";

export interface AuthPageWrapperProps {
  children: ReactNode;
  title: string;
  description: string;
}

export function AuthPageWrapper(props: AuthPageWrapperProps) {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-brand-secondary via-brand-neutral-100 to-brand-secondary-dark flex flex-col">
        <main className="flex-1 flex items-center justify-center py-20 px-6 relative overflow-hidden">
          <div className="container mx-auto max-w-[420px] relative z-10">
            {/* Header */}
            <AuthStepHeader title={props.title} description={props.description} />

            {/* Form Content */}
            <div className="space-y-5">{props.children}</div>

            {/* Additional Help Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-brand-neutral-600 font-medium">
                Need help?{" "}
                <Link
                  to={"/contact"}
                  search={{ reason: undefined }}
                  className="text-brand-accent hover:text-brand-accent-dark underline underline-offset-4"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </PageWrapper>
  );
}
