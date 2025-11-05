import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/forms/button";
import { ServiceColumn } from "../../components/patterns/ServiceColumn";
import { ServicesHeroSection } from "../../components/services/sections/ServicesHeroSection";
import { EnterpriseAddonsSection } from "../../components/services/sections/EnterpriseAddonsSection";
import { SectionHeader } from "../../components/ui/section/section-header";
import { paths } from "../../../paths";
import {
  AlertTriangle,
  ArrowRight,
  Bug,
  CheckCircle,
  Clock,
  FileText,
  Globe,
  GraduationCap,
  LifeBuoy,
  Package,
  Plus,
  Shield,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

export function ServicesPage() {
  // Enterprise services configuration
  const enterpriseServices = [
    {
      icon: FileText,
      title: "Non-Disclosure Agreements",
      description: (
        <>
          <span className="font-medium text-foreground">Comprehensive legal protection</span> for your proprietary information with industry-standard
          confidentiality frameworks and secure data handling.
        </>
      ),
      buttonText: "Request NDA",
      colorScheme: "primary" as const,
    },
    {
      icon: Clock,
      title: "Service Level Agreements",
      description: (
        <>
          <span className="font-medium text-foreground">Guaranteed response times</span> and performance metrics with enterprise-grade uptime commitments and
          24/7 support availability.
        </>
      ),
      buttonText: "Request SLA",
      colorScheme: "success" as const,
    },
    {
      icon: Globe,
      title: "Ecosystem Growth Programs",
      description: (
        <>
          <span className="font-medium text-foreground">Strategic ecosystem development</span> showcasing your open source leadership while fostering
          sustainable community growth.
        </>
      ),
      buttonText: "Request Program",
      colorScheme: "success" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <ServicesHeroSection
              title={
                <h1 className="text-4xl lg:text-5xl tracking-tight font-semibold">
                  <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">Services Available</span>
                  <br />
                  <span className="bg-gradient-to-r from-brand-primary via-brand-accent to-brand-success bg-clip-text text-transparent">
                    From Expert Maintainers
                  </span>
                </h1>
              }
              description={
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Our network of expert open source maintainers provides professional services across
                  <span className="text-brand-primary"> development work</span>,<span className="text-brand-accent"> strategic consulting</span>, and
                  <span className="text-brand-success"> security & compliance</span>
                </p>
              }
            />

            {/* Services Overview Grid */}
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
              {/* Development Services */}
              <ServiceColumn
                title="Development"
                description="Priority development work by expert maintainers who understand your codebase"
                mainIcon={<Bug className="w-9 h-9" />}
                colorScheme="primary"
                services={[
                  { name: "Bug Fixing", icon: <Bug className="w-5 h-5" />, description: "Critical issue resolution" },
                  { name: "New Feature Development", icon: <Plus className="w-5 h-5" />, description: "Custom functionality" },
                  { name: "Documentation Updates", icon: <FileText className="w-5 h-5" />, description: "Clear, comprehensive docs" },
                  { name: "OSS Plugin/Library Creation", icon: <Zap className="w-5 h-5" />, description: "Tailored extensions" },
                ]}
              />

              {/* Advisory & Support Services */}
              <ServiceColumn
                title="Advisory & Support"
                description="Strategic guidance and technical support from experienced maintainers"
                mainIcon={<GraduationCap className="w-9 h-9" />}
                colorScheme="success"
                services={[
                  { name: "Technical Support", icon: <LifeBuoy className="w-5 h-5" />, description: "Expert problem solving" },
                  { name: "Architectural Consulting", icon: <Users className="w-5 h-5" />, description: "System design guidance" },
                  { name: "Developer Mentorship", icon: <UserCheck className="w-5 h-5" />, description: "Skills development" },
                  { name: "Training & Workshops", icon: <GraduationCap className="w-5 h-5" />, description: "Team education programs" },
                ]}
              />

              {/* Security & Compliance */}
              <ServiceColumn
                title="Security & Compliance"
                description="Security auditing and compliance support for enterprise environments"
                mainIcon={<Shield className="w-9 h-9" />}
                colorScheme="accent"
                services={[
                  { name: "Security Audits", icon: <Shield className="w-5 h-5" />, description: "Comprehensive assessments" },
                  { name: "CVE Management", icon: <AlertTriangle className="w-5 h-5" />, description: "Vulnerability handling" },
                  { name: "Compliance Consulting", icon: <CheckCircle className="w-5 h-5" />, description: "Regulatory alignment" },
                  { name: "Secure Code Review", icon: <Bug className="w-5 h-5" />, description: "Security-focused analysis" },
                ]}
              />
            </div>

            {/* Enterprise Add-ons Section */}
            <EnterpriseAddonsSection services={enterpriseServices} />

            {/* Explore Projects Section */}
            <div className="mt-16 lg:mt-20 mb-12 lg:mb-16">
              <div className="relative bg-gradient-to-r from-brand-neutral-50/50 to-transparent rounded-xl border border-brand-neutral-200/50 p-8 md:p-10 lg:p-12 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-primary/10 to-transparent rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-brand-success/10 to-transparent rounded-full blur-3xl opacity-50"></div>

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl mb-6 shadow-lg">
                    <Package className="w-8 h-8 text-white" />
                  </div>

                  <SectionHeader
                    title="Connect Directly with Project Maintainers"
                    description="No middlemen, no agencies—just direct access to the experts who built and maintain the projects you depend on."
                    titleLevel="h2"
                    align="center"
                    maxWidth="2xl"
                    spacing="md"
                  />

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
                    <Link to={paths.CONTACT}>
                      <Button size="lg" rightIcon={ArrowRight}>
                        Get Started Today
                      </Button>
                    </Link>

                    <Link to={paths.PROJECTS}>
                      <Button size="lg" variant="outline" leftIcon={Package}>
                        Browse Projects
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
