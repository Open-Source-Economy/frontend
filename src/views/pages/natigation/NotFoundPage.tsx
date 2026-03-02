import React from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";

import { ArrowLeft } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";

interface NotFoundPageProps {}

export function NotFoundPage(_props: NotFoundPageProps) {
  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-secondary via-brand-neutral-100 to-brand-secondary-dark">
        <div className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
          <div className="max-w-4xl w-full">
            {/* 404 Visual */}
            <div className="text-center mb-12">
              <div className="relative inline-block">
                {/* Decorative Background Orbs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl opacity-40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-highlight/15 rounded-full blur-2xl opacity-30" />

                {/* 404 Text */}
                <div className="relative">
                  <h1 className="text-brand-neutral-950 mb-6">
                    <span className="block text-8xl sm:text-9xl tracking-tighter">404</span>
                  </h1>
                </div>
              </div>

              <div className="space-y-4 mb-12">
                <h2 className="text-brand-neutral-900">Page Not Found</h2>
                <p className="text-brand-neutral-600 max-w-2xl mx-auto">
                  We couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be
                  incorrect.
                </p>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
