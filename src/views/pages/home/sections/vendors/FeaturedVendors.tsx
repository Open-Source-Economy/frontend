import React from "react";
import { VendorCard, VendorCardProps } from "../vendors/VendorCard";
import { Award, Download, GitBranch, Sparkles, Star } from "lucide-react";
import { isVisible } from "../../../../../ultils/featureVisibility";

interface FeaturedVendorsProps {
  className?: string;
  anchorId?: string;
}

type FeaturedVendor = Omit<VendorCardProps, "ctaLink" | "onLearnMore"> & {
  href: string;
};

export function FeaturedVendors({ className = "", anchorId = "featured-vendors" }: FeaturedVendorsProps) {
  // Sample vendor data - would come from API in production
  const vendors: FeaturedVendor[] = [
    ...(isVisible("epicmaxSponsor")
      ? [
          {
            name: "Epicmax",
            domain: "epicmax.co",
            tagline: "Official partner of Vuetify, PrimeVue, VueJobs.",
            description: "We offer custom front-end development with a strong focus on Vue.js.",
            metrics: [
              { icon: <Award className="h-3.5 w-3.5" />, label: "Years Experience", value: "8" },
              { icon: <GitBranch className="h-3.5 w-3.5" />, label: "GitHub forks", value: "2500+" },
              { icon: <Star className="h-3.5 w-3.5" />, label: "GitHub Stars", value: "12.5k" },
              { icon: <Download className="h-3.5 w-3.5" />, label: "Npm downloads/month", value: "65K+" },
            ],
            href: "https://epicmax.co/",
          },
        ]
      : []),
    // {
    //   name: "React Native Builders",
    //   domain: "reactnativebuilders.example.com",
    //   tagline: "Mobile-first development",
    //   description: "Specialized React Native team building cross-platform mobile solutions for Fortune 500 companies.",
    //   metrics: [
    //     { icon: "award", label: "Years Experience", value: "6" },
    //     { icon: "projects", label: "Apps Shipped", value: "45+" },
    //     { icon: "star", label: "GitHub Stars", value: "8.2k" },
    //   ],
    //   href: "https://reactnativebuilders.example.com",
    // },
    // {
    //   name: "Next.js Architects",
    //   domain: "nextjsarchitects.example.com",
    //   tagline: "Full-stack Next.js experts",
    //   description: "Building scalable, performant web applications with Next.js and modern React patterns.",
    //   metrics: [
    //     { icon: "award", label: "Years Experience", value: "5" },
    //     { icon: "projects", label: "Projects", value: "38+" },
    //     { icon: "star", label: "GitHub Stars", value: "15.8k" },
    //   ],
    //   href: "https://nextjsarchitects.example.com",
    // },
    // {
    //   name: "TypeScript Guild",
    //   domain: "typescriptguild.example.com",
    //   tagline: "Type-safe development leaders",
    //   description: "Expert TypeScript consultants helping teams migrate to type-safe codebases and build robust systems.",
    //   metrics: [
    //     { icon: "award", label: "Years Experience", value: "7" },
    //     { icon: "projects", label: "Migrations", value: "52+" },
    //     { icon: "star", label: "GitHub Stars", value: "9.4k" },
    //   ],
    //   href: "https://typescriptguild.example.com",
    // },
  ];

  return (
    <section id={anchorId} className={`py-24 relative overflow-hidden ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-highlight/10 rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-accent/20 border border-brand-accent/30 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-brand-accent" />
            <span className="text-brand-accent text-sm uppercase tracking-wider">Trusted Partners</span>
          </div>

          <h2 className="text-brand-neutral-900 mb-6">Featured Open‑Source Vendors</h2>

          <p className="text-brand-neutral-600 text-lg">Discover vendors committed to open‑source excellence and trusted by global clients</p>
        </div>

        {/* Vendor Cards Grid */}
        <div
          className={`${
            vendors.length === 1 ? "flex justify-center max-w-md mx-auto" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
          }`}
        >
          {vendors.map(({ href, ...vendor }, idx) => (
            <VendorCard key={idx} {...vendor} ctaLink={href} />
          ))}
        </div>

        {/* Bottom description */}
        <div className="text-center mt-12">
          <p className="text-brand-neutral-500 text-sm">All vendors are verified open-source contributors with proven track records</p>
        </div>
      </div>
    </section>
  );
}
