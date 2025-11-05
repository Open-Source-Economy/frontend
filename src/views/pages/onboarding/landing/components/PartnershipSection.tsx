import React from "react";
import { Briefcase, Clock, Code2, DollarSign, FileText, Handshake, Headphones, Layers, Sparkles, Users } from "lucide-react";

export const PartnershipSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-secondary via-brand-neutral-100 to-brand-card-blue relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--brand-accent-dark)_0%,_transparent_50%)] opacity-5 -z-10" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--brand-primary)_0%,_transparent_50%)] opacity-5 -z-10" />

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-highlight/10 border border-brand-highlight/20 px-4 py-2 rounded-full mb-6">
            <Handshake className="w-4 h-4 text-brand-highlight" />
            <span className="text-sm text-brand-highlight uppercase tracking-wider">True Partnership</span>
          </div>
          <h2 className="text-brand-neutral-950 mb-4">You Code. We Handle Everything Else.</h2>
          <p className="text-brand-neutral-600 text-lg max-w-2xl mx-auto">
            Focus on what you do best while we take care of sales, contracts, payments, and client relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative mb-16">
          {/* Your Side */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-brand-accent/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-br from-brand-card-blue via-brand-card-blue-dark to-brand-secondary border-2 border-brand-accent/50 rounded-2xl p-8 h-full">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-3">
                  <Code2 className="w-4 h-4 text-brand-accent" />
                  <span className="text-sm text-brand-accent">Your Focus</span>
                </div>
                <h3 className="text-brand-neutral-950">Code & Services</h3>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { icon: Layers, title: "Choose Your Projects", desc: "Select which open source projects to offer services for" },
                  { icon: Briefcase, title: "Choose Which Services to Offer", desc: "Bug fixes, features, consulting, support, or any combination" },
                  { icon: DollarSign, title: "Set Your Rates", desc: "Full pricing control for each commitment level" },
                  { icon: Clock, title: "Define Commitment Levels", desc: "Work full-time, part-time, or flexibly" },
                ].map((item, i) => (
                  <div key={i} className="bg-brand-accent/5 border-l-4 border-brand-accent rounded-r-xl p-4 hover:bg-brand-accent/10 transition-colors">
                    <div className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-brand-neutral-900 text-sm mb-1">{item.title}</div>
                        <p className="text-brand-neutral-600 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-brand-accent/20">
                <div className="flex items-center gap-2 text-brand-accent">
                  <Sparkles className="h-4 w-4" />
                  <p className="text-sm">No sales calls. No negotiations. Just code.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Side */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-br from-brand-card-blue via-brand-card-blue-dark to-brand-secondary border-2 border-brand-primary/50 rounded-2xl p-8 h-full">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-primary/10 border border-brand-primary/20 rounded-full mb-3">
                  <DollarSign className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm text-brand-primary">Our Focus</span>
                </div>
                <h3 className="text-brand-neutral-950">Business & Admin</h3>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { icon: Users, title: "Client Acquisition", desc: "We find enterprises, pitch your services, and bring you opportunities" },
                  { icon: FileText, title: "Legal & Contracts", desc: "We draft, negotiate, and manage all legal agreements on your behalf" },
                  { icon: DollarSign, title: "Payments & Billing", desc: "We handle invoicing, payment collection, and timely payouts to you" },
                  { icon: Headphones, title: "Client Relations", desc: "We manage ongoing communication, expectations, and satisfaction" },
                ].map((item, i) => (
                  <div key={i} className="bg-brand-primary/5 border-l-4 border-brand-primary rounded-r-xl p-4 hover:bg-brand-primary/10 transition-colors">
                    <div className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-brand-neutral-900 text-sm mb-1">{item.title}</div>
                        <p className="text-brand-neutral-600 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-brand-primary/20">
                <div className="flex items-center gap-2 text-brand-primary">
                  <Handshake className="h-4 w-4" />
                  <p className="text-sm">You approve every contract. True partnership.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
