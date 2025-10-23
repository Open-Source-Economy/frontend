import React from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";

import { ArrowLeft } from "lucide-react";
import { Button } from "src/views/components/ui/forms/button";

interface NotFoundPageProps {}

export function NotFoundPage(props: NotFoundPageProps) {
  // const quickLinks = [
  //   {
  //     icon: Home,
  //     label: "Home",
  //     description: "Return to homepage",
  //     href: "home",
  //   },
  //   {
  //     icon: Briefcase,
  //     label: "Projects",
  //     description: "Explore open source projects",
  //     href: "projects",
  //   },
  //   {
  //     icon: BookOpen,
  //     label: "Blog",
  //     description: "Read our latest articles",
  //     href: "blog",
  //   },
  //   {
  //     icon: MessageSquare,
  //     label: "Contact",
  //     description: "Get in touch with us",
  //     href: "contact",
  //   },
  // ];

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
                  We couldn't find the page you're looking for. It may have been moved, deleted, or the URL might be incorrect.
                </p>
              </div>

              {/* Primary Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                {/*<Button*/}
                {/*  // onClick={onNavigateHome}*/}
                {/*  className="gap-2"*/}
                {/*>*/}
                {/*  <Home className="w-4 h-4" />*/}
                {/*  Back to Home*/}
                {/*</Button>*/}
                <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>
              </div>
            </div>

            {/*/!* Quick Links Grid *!/*/}
            {/*<div className="bg-brand-card-blue border border-brand-neutral-300 rounded-xl p-8 sm:p-12">*/}
            {/*  <div className="text-center mb-8">*/}
            {/*    <h3 className="text-brand-neutral-900 mb-2">Explore Our Platform</h3>*/}
            {/*    <p className="text-brand-neutral-600">Here are some helpful links to get you back on track</p>*/}
            {/*  </div>*/}

            {/*  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">*/}
            {/*    {quickLinks.map(link => (*/}
            {/*      <button*/}
            {/*        key={link.href}*/}
            {/*        // onClick={() => onNavItemClick(link.href)}*/}
            {/*        className="group bg-brand-card-blue-light border border-brand-neutral-300 rounded-xl p-6 text-left transition-all duration-200 hover:border-brand-accent hover:bg-brand-card-blue-dark hover:shadow-lg"*/}
            {/*      >*/}
            {/*        <div className="flex flex-col items-start gap-3">*/}
            {/*          <div className="w-12 h-12 rounded-lg bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent/20 transition-colors">*/}
            {/*            <link.icon className="w-6 h-6 text-brand-accent" />*/}
            {/*          </div>*/}
            {/*          <div>*/}
            {/*            <div className="text-brand-neutral-900 mb-1">{link.label}</div>*/}
            {/*            <p className="text-brand-neutral-600">{link.description}</p>*/}
            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </button>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/* Help Text */}
            {/*<div className="mt-12 text-center">*/}
            {/*  <p className="text-brand-neutral-600">*/}
            {/*    Still can't find what you're looking for?{" "}*/}
            {/*    <button*/}
            {/*      // onClick={() => onNavItemClick('contact')}*/}
            {/*      className="text-brand-accent hover:text-brand-accent-dark underline decoration-transparent hover:decoration-brand-accent-dark transition-all duration-200"*/}
            {/*    >*/}
            {/*      Contact our support team*/}
            {/*    </button>*/}
            {/*  </p>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
