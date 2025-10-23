import React from "react";
import { Database, Eye, FileText, Globe, Lock, Mail, Shield, UserCheck } from "lucide-react";
import { PageWrapper } from "src/views/pages/PageWrapper";

interface PrivacyPolicyPageProps {}

export function PrivacyPolicyPage(props: PrivacyPolicyPageProps) {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you interact with Open Source Economy, we may collect personal information such as your name, email address, company name, and professional details. This information is collected when you register for our services, contact us, or engage with our platform.",
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect certain information about your device and how you interact with our platform, including IP address, browser type, pages visited, and time spent on pages. This helps us improve our services and user experience.",
        },
        {
          subtitle: "Payment Information",
          text: "For enterprise contracts and donations, we process payment information through secure third-party payment processors. We do not store complete credit card information on our servers.",
        },
      ],
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information to provide, maintain, and improve our services, including connecting enterprises with open source maintainers, processing payments, and facilitating project support.",
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send you service-related communications, updates about projects you support, and information about our nonprofit mission. You can opt out of non-essential communications at any time.",
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage data to understand how our platform is used, identify areas for improvement, and ensure the security and integrity of our services.",
        },
      ],
    },
    {
      icon: Database,
      title: "Data Storage and Security",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures to protect your personal information, including encryption, secure servers, and access controls. As a SOC 2 compliant organization, we maintain rigorous security standards.",
        },
        {
          subtitle: "Data Retention",
          text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, comply with legal obligations, and resolve disputes.",
        },
        {
          subtitle: "Data Location",
          text: "Your data may be stored and processed in the United States or other countries where our service providers operate. We ensure appropriate safeguards are in place for international data transfers.",
        },
      ],
    },
    {
      icon: Eye,
      title: "Information Sharing and Disclosure",
      content: [
        {
          subtitle: "With Your Consent",
          text: "We may share your information with third parties when you give us explicit consent to do so, such as when connecting you with specific maintainers or projects.",
        },
        {
          subtitle: "Service Providers",
          text: "We work with trusted third-party service providers who assist in operating our platform, processing payments, and analyzing data. These providers are contractually obligated to protect your information.",
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information when required by law, to protect our rights, prevent fraud, or ensure the safety of our users and the public.",
        },
        {
          subtitle: "Transparency Commitment",
          text: "As a nonprofit focused on open source sustainability, we are committed to transparency. We will never sell your personal information to third parties for marketing purposes.",
        },
      ],
    },
    {
      icon: UserCheck,
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "Access and Correction",
          text: "You have the right to access, update, or correct your personal information. You can do this through your account settings or by contacting us directly.",
        },
        {
          subtitle: "Data Deletion",
          text: "You may request deletion of your personal information, subject to legal and contractual obligations. We will respond to deletion requests within 30 days.",
        },
        {
          subtitle: "Opt-Out Rights",
          text: "You can opt out of marketing communications, analytics tracking, and certain data collection practices. Note that opting out of essential communications may affect your ability to use our services.",
        },
        {
          subtitle: "California Privacy Rights",
          text: "California residents have additional rights under the CCPA, including the right to know what personal information is collected, the right to deletion, and the right to opt-out of sales (we do not sell personal information).",
        },
      ],
    },
    {
      icon: Globe,
      title: "Cookies and Tracking Technologies",
      content: [
        {
          subtitle: "Essential Cookies",
          text: "We use essential cookies necessary for the operation of our platform, such as authentication and security cookies.",
        },
        {
          subtitle: "Analytics Cookies",
          text: "We use analytics cookies to understand how users interact with our platform and improve user experience. You can control these through your browser settings.",
        },
        {
          subtitle: "Third-Party Services",
          text: "Our platform may include third-party services that use their own cookies and tracking technologies. We recommend reviewing their privacy policies.",
        },
      ],
    },
    {
      icon: FileText,
      title: "Special Considerations",
      content: [
        {
          subtitle: "Open Source Contributions",
          text: "If you contribute to open source projects through our platform, your contributions and associated information (such as commit history) may be publicly visible on project repositories.",
        },
        {
          subtitle: "Maintainer Profiles",
          text: "Maintainers who create public profiles on our platform understand that certain information (such as projects maintained and expertise areas) will be publicly visible to facilitate connections.",
        },
        {
          subtitle: "Enterprise Contracts",
          text: "Information related to enterprise contracts is handled with additional confidentiality measures as outlined in individual service agreements.",
        },
      ],
    },
    {
      icon: Mail,
      title: "Children's Privacy",
      content: [
        {
          subtitle: "Age Restrictions",
          text: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it promptly.",
        },
      ],
    },
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-b from-brand-secondary via-brand-neutral-100 to-brand-secondary-dark">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-neutral-100 via-brand-secondary to-brand-card-blue pt-32 pb-20">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl opacity-40" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-highlight/10 rounded-full blur-3xl opacity-30" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-width-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-brand-card-blue px-4 py-2 rounded-full mb-6 border border-brand-neutral-300">
                <Shield className="w-4 h-4 text-brand-accent" />
                <span className="text-brand-neutral-700">Last Updated: October 20, 2025</span>
              </div>

              <h1 className="text-brand-neutral-950 mb-6">Privacy Policy</h1>

              <p className="text-brand-neutral-700 max-w-3xl mx-auto mb-8">
                At Open Source Economy, we are committed to protecting your privacy and handling your data with transparency and care. As a 501(c)(3) nonprofit
                organization, our mission is to sustain open source software, not to monetize your personal information.
              </p>

              <div className="inline-flex items-center gap-2 text-brand-accent">
                <Lock className="w-5 h-5" />
                <span>SOC 2 Compliant • Transparent • Trustworthy</span>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20 bg-gradient-to-b from-brand-card-blue via-brand-secondary to-brand-neutral-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-16">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div key={index} className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20">
                        <Icon className="w-6 h-6 text-brand-accent" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-brand-neutral-950 mb-4">{section.title}</h2>

                        <div className="space-y-6">
                          {section.content.map((item, itemIndex) => (
                            <div key={itemIndex} className="space-y-2">
                              <h3 className="text-brand-neutral-900">{item.subtitle}</h3>
                              <p className="text-brand-neutral-700">{item.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {index < sections.length - 1 && <div className="border-t border-brand-neutral-300 mt-8" />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-br from-brand-neutral-100 via-brand-secondary to-brand-card-blue-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-brand-card-blue rounded-2xl p-8 border border-brand-neutral-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-accent/10 flex items-center justify-center border border-brand-accent/20">
                    <Mail className="w-6 h-6 text-brand-accent" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-brand-neutral-950 mb-4">Changes to This Privacy Policy</h2>
                    <p className="text-brand-neutral-700 mb-6">
                      We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any
                      material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy
                      periodically.
                    </p>

                    <h3 className="text-brand-neutral-900 mb-4 mt-8">Contact Us</h3>
                    <p className="text-brand-neutral-700 mb-6">If you have any questions about this privacy policy or our data practices, please contact us:</p>

                    <div className="space-y-3 text-brand-neutral-700">
                      <p>
                        <span className="text-brand-neutral-800">Email:</span>{" "}
                        <button
                          // onClick={() => onNavItemClick('contact')}
                          className="text-brand-accent hover:text-brand-accent-dark transition-colors cursor-pointer"
                        >
                          privacy@opensourceeconomy.org
                        </button>
                      </p>
                      <p>
                        <span className="text-brand-neutral-800">Mail:</span> Open Source Economy, [Address], [City, State ZIP]
                      </p>
                      <p className="pt-4">
                        <button
                          // onClick={() => onNavItemClick('contact')}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-accent hover:bg-brand-accent-dark text-brand-secondary rounded-lg transition-colors cursor-pointer"
                        >
                          <Mail className="w-4 h-4" />
                          Contact Our Privacy Team
                        </button>
                      </p>
                    </div>
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
