import React from "react";
import { Clock, DollarSign, Handshake, Heart, Shield, Users } from "lucide-react";

export const WhyJoinSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-accent/5 via-brand-secondary to-brand-highlight/5 border-y border-brand-neutral-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-brand-neutral-950 mb-4">Why Join Open Source Economy?</h2>
          <p className="text-brand-neutral-600 text-lg max-w-2xl mx-auto">A Swiss non-profit aligned with your values, not venture capital interests</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              title: "100% Non-Profit",
              desc: "Swiss registered non-profit. All earnings reinvested in open source, supporting OSS neutrality and independence.",
            },
            {
              icon: Heart,
              title: "Your Values Matter",
              desc: "We deeply respect free software principles. Whether focused on ideals or sustainability, we adapt to you.",
            },
            {
              icon: DollarSign,
              title: "Fair Compensation",
              desc: "You set your rates. Transparent pricing and automatic ecosystem funding for all maintainers.",
            },
            {
              icon: Handshake,
              title: "No Sales Work",
              desc: "We handle all outreach, sales, negotiations, and contracts. You never have to pitch or chase clients.",
            },
            { icon: Clock, title: "Your Terms", desc: "Choose your projects, services, rates, and availability. Full control over what you offer and when." },
            {
              icon: Users,
              title: "Community First",
              desc: "Part of a network supporting sustainable open source. Solidarity model benefits the entire ecosystem.",
            },
          ].map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-brand-card-blue-light to-brand-card-blue border border-brand-neutral-300 rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-brand-accent/20 hover:border-brand-accent/60"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-brand-accent" />
                </div>
                <h3 className="text-brand-neutral-900 mb-2">{benefit.title}</h3>
                <p className="text-brand-neutral-600 text-sm">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
