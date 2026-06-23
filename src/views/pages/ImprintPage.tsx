import React from "react";
import { Building2, FileText, Mail, Scale } from "lucide-react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { ExternalLink } from "src/views/components/ui/forms/external-link";
import { externalLinks } from "src/externalLinks";
import { contactEmail } from "src/views/v1/data";

export function ImprintPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-brand-secondary via-brand-neutral-100 to-brand-secondary-dark">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-neutral-100 via-brand-secondary to-brand-card-blue pt-32 pb-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-highlight/10 rounded-full blur-3xl opacity-30" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-brand-card-blue px-4 py-2 rounded-full mb-6 border border-brand-neutral-300">
                <Scale className="w-4 h-4 text-brand-accent" />
                <span className="text-brand-neutral-700">Legal Notice</span>
              </div>

              <h1 className="text-brand-neutral-950 mb-2">Imprint</h1>
              <p className="text-brand-neutral-600 mb-6">(Impressum)</p>

              <p className="text-brand-neutral-700 max-w-3xl mx-auto">
                Legal information about the operator of this website, as required for visitors in Germany, the United
                Kingdom, and other jurisdictions.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-gradient-to-b from-brand-card-blue via-brand-secondary to-brand-neutral-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-16">
              {/* Provider */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20">
                    <Building2 className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-brand-neutral-950 mb-4">Provider</h2>
                    <div className="space-y-1 text-brand-neutral-700">
                      <p className="text-brand-neutral-900">Open Source Economy</p>
                      <p>Non-profit organisation</p>
                      <p>Switzerland</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-brand-neutral-300 mt-8" />
              </div>

              {/* Commercial Register */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20">
                    <FileText className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-brand-neutral-950 mb-4">Commercial Register</h2>
                    <div className="space-y-3 text-brand-neutral-700">
                      <p>
                        <span className="text-brand-neutral-800">Registration number:</span>{" "}
                        <ExternalLink
                          href={externalLinks.ZEFIX}
                          className="text-brand-accent hover:text-brand-accent-dark transition-colors"
                        >
                          CHE-440.058.692
                        </ExternalLink>
                      </p>
                      <p>
                        The full official record is available on the Swiss commercial register (Zefix) via the link
                        above.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-brand-neutral-300 mt-8" />
              </div>

              {/* Contact */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20">
                    <Mail className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-brand-neutral-950 mb-4">Contact</h2>
                    <p className="text-brand-neutral-700">
                      <span className="text-brand-neutral-800">Email:</span>{" "}
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-brand-accent hover:text-brand-accent-dark transition-colors"
                      >
                        {contactEmail}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}
