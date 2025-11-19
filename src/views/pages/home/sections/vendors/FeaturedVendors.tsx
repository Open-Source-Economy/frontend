import React from "react";
import { VendorCard, VendorCardProps } from "../vendors/VendorCard";
import { Sparkles } from "lucide-react";

interface FeaturedVendorsProps {
  className?: string;
}

type FeaturedVendor = Omit<VendorCardProps, "ctaLink" | "onLearnMore"> & {
  href: string;
};

export function FeaturedVendors({ className = "" }: FeaturedVendorsProps) {
  // Sample vendor data - would come from API in production
  const vendors: FeaturedVendor[] = [
    {
      name: "Vue Excellence Partners",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
      tagline: "Vue.js & Nuxt specialists",
      description: "Vue/Nuxt experts with 60+ projects delivered across enterprise and startup environments.",
      metrics: [
        { icon: "award", label: "Years Experience", value: "8" },
        { icon: "projects", label: "Projects", value: "60+" },
        { icon: "star", label: "GitHub Stars", value: "12.5k" },
      ],
      href: "https://vuepartners.example.com",
    },
    {
      name: "React Native Builders",
      logo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop",
      tagline: "Mobile-first development",
      description: "Specialized React Native team building cross-platform mobile solutions for Fortune 500 companies.",
      metrics: [
        { icon: "award", label: "Years Experience", value: "6" },
        { icon: "projects", label: "Apps Shipped", value: "45+" },
        { icon: "star", label: "GitHub Stars", value: "8.2k" },
      ],
      href: "https://reactnativebuilders.example.com",
    },
    {
      name: "Next.js Architects",
      logo: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=200&h=200&fit=crop",
      tagline: "Full-stack Next.js experts",
      description: "Building scalable, performant web applications with Next.js and modern React patterns.",
      metrics: [
        { icon: "award", label: "Years Experience", value: "5" },
        { icon: "projects", label: "Projects", value: "38+" },
        { icon: "star", label: "GitHub Stars", value: "15.8k" },
      ],
      href: "https://nextjsarchitects.example.com",
    },
    {
      name: "TypeScript Guild",
      logo: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=200&h=200&fit=crop",
      tagline: "Type-safe development leaders",
      description: "Expert TypeScript consultants helping teams migrate to type-safe codebases and build robust systems.",
      metrics: [
        { icon: "award", label: "Years Experience", value: "7" },
        { icon: "projects", label: "Migrations", value: "52+" },
        { icon: "star", label: "GitHub Stars", value: "9.4k" },
      ],
      href: "https://typescriptguild.example.com",
    },
  ];

  return (
    <section className={`py-24 relative overflow-hidden ${className}`}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
