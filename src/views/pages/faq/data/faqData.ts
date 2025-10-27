export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  description: string;
  icon: string;
  questions: FAQItem[];
}

export const faqData: FAQCategory[] = [
  {
    category: "Getting Started",
    description: "Learn the basics about Open Source Economy",
    icon: "BookOpen",
    questions: [
      {
        question: "What is Open Source Economy?",
        answer:
          "Open Source Economy is a nonprofit platform that connects enterprises with expert open source maintainers under a single contract. We provide direct access to the core teams behind the open source projects your business depends on, enabling prioritized bug fixes, custom features, and long-term support.",
      },
      {
        question: "How is this different from traditional support contracts?",
        answer:
          "Unlike traditional support contracts that go through intermediaries, Open Source Economy connects you directly with the actual maintainers who built and maintain the software. You get authentic expertise, faster response times, and the assurance that your investment directly supports the open source ecosystem.",
      },
      {
        question: "Who can use Open Source Economy?",
        answer:
          "Our platform serves enterprises that rely on open source software, individual maintainers and development teams, open source foundations, and companies looking to sponsor the ecosystem. Each role has tailored services and benefits.",
      },
      {
        question: "How do I get started?",
        answer:
          "Start by selecting your role (Enterprise, Maintainer, Foundation, or Sponsor) on our Get Started page. From there, you'll be guided through the onboarding process specific to your needs, whether that's finding projects to support, registering as a maintainer, or exploring sponsorship opportunities.",
      },
    ],
  },
  {
    category: "For Enterprises",
    description: "Enterprise services, pricing, and contracts",
    icon: "Building2",
    questions: [
      {
        question: "What services are available for enterprises?",
        answer:
          "We offer comprehensive services including Technical Support with guaranteed SLAs, Development Services (bug fixes, new features, custom development), Advisory Services (consulting, training, workshops), and Security & Compliance services (audits, CVE management, compliance consulting). Each service can be customized to your needs.",
      },
      {
        question: "How does pricing work?",
        answer:
          "Pricing is transparent and project-specific. Most services offer hourly consultation rates, monthly support contracts, or custom pricing for development work. All pricing details are shown on individual project pages, and you can see exactly how your investment is distributed across the project, its dependencies, and the broader ecosystem.",
      },
      {
        question: "Can I get an NDA and SLA?",
        answer:
          "Yes. Most services include the option for Non-Disclosure Agreements (NDA) to protect your confidential information. Support services come with Service Level Agreements (SLA) that guarantee response times and availability. These options are clearly marked on each service offering.",
      },
      {
        question: "How quickly can I get support?",
        answer:
          "Response times depend on your service tier. Priority support contracts typically offer 24-48 hour response times for critical issues, while standard consultation services are scheduled based on maintainer availability. Emergency support options are available for enterprise contracts.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Absolutely. We are SOC 2 compliant and follow industry best practices for data security. All communications can be conducted under NDA, and we never share your proprietary information. Our platform is designed with enterprise security requirements in mind.",
      },
      {
        question: "Can I work with multiple projects under one contract?",
        answer:
          "Yes. One of our key benefits is providing a single enterprise contract that covers multiple open source projects and their maintainers. This simplifies procurement, billing, and vendor management while giving you access to a broad ecosystem of expertise.",
      },
    ],
  },
  {
    category: "For Maintainers",
    description: "Join the platform and monetize your expertise",
    icon: "Code",
    questions: [
      {
        question: "How do I join as a maintainer?",
        answer:
          "Register through our Get Started page by selecting the Maintainer role. You'll need to verify your maintainer status on your open source project, set up your profile, and configure the services you want to offer. Our team will guide you through the process.",
      },
      {
        question: "What services can I offer?",
        answer:
          "You can offer Support Services (technical support, bug triage), Development Services (bug fixes, features, documentation), Advisory Services (consulting, training, workshops), and Security & Compliance services. You choose which services to provide and set your own rates within our framework.",
      },
      {
        question: "How do I get paid?",
        answer:
          "Payments are processed monthly through the platform. You receive your share from service contracts, development work, and sponsorships directly. All transactions are transparent, and you can track your earnings in real-time through your dashboard.",
      },
      {
        question: "Do I have to commit to specific hours?",
        answer:
          "No. You maintain full control over your availability and workload. You can set your schedule, accept or decline requests, and adjust your service offerings at any time. The platform is designed to work with your existing commitments.",
      },
      {
        question: "How much of the revenue do I keep?",
        answer:
          "Our distribution model is fully transparent. The majority of revenue goes directly to maintainers (typically 60-70%), with portions allocated to direct dependencies (10-20%), the broader ecosystem (5-10%), and platform operations (10-15%). Exact percentages are shown for each transaction.",
      },
      {
        question: "What if my project has multiple maintainers?",
        answer:
          "Revenue for team projects is distributed according to your team's preferences. You can split earnings equally, by contribution level, or any custom arrangement. The platform handles the distribution automatically based on your team's configuration.",
      },
    ],
  },
  {
    category: "Fund Distribution",
    description: "How money flows through the ecosystem",
    icon: "DollarSign",
    questions: [
      {
        question: "How is funding distributed?",
        answer:
          "Every dollar is transparently allocated: 60-70% goes directly to the project maintainers, 10-20% supports direct dependencies that the project relies on, 5-10% funds the broader open source ecosystem through our non-profit mission, and 10-15% covers platform operations and infrastructure. Exact percentages are shown for each project.",
      },
      {
        question: "Why do dependencies receive funding?",
        answer:
          "Most projects depend on dozens of other open source projects. By allocating a portion to dependencies, we ensure the entire stack remains healthy and sustainable. This creates a cascading effect where popular libraries get supported through their dependents.",
      },
      {
        question: 'What counts as a "dependency"?',
        answer:
          "We analyze each project's dependency tree to identify direct runtime dependencies that are critical to the project's functionality. Development dependencies and optional plugins are weighted differently. Our algorithm ensures fair distribution based on actual impact and usage.",
      },
      {
        question: "Can I see where my money goes?",
        answer:
          "Yes. Complete transparency is a core principle. Every project page shows exactly how funds are distributed, including the dependency tree and allocation percentages. Enterprise customers can view detailed reports of their investments across the ecosystem.",
      },
      {
        question: "How does the nonprofit model work?",
        answer:
          "Open Source Economy operates as a nonprofit organization. We don't extract profit for shareholders. Instead, surplus revenue is reinvested into platform improvements, ecosystem grants, and supporting underrepresented or critical infrastructure projects.",
      },
      {
        question: "What happens to unclaimed funds?",
        answer:
          "If a project or dependency doesn't have registered maintainers, their allocated funds are held in reserve. We actively reach out to maintainers to onboard them. After a holding period, unclaimed funds are redirected to the ecosystem fund to support similar or related projects.",
      },
    ],
  },
  {
    category: "Services & Support",
    description: "Understanding available services",
    icon: "Headphones",
    questions: [
      {
        question: "What is the difference between Support and Development services?",
        answer:
          "Support Services focus on answering questions, troubleshooting issues, and providing guidance on existing functionality. Development Services involve writing code—fixing bugs, building new features, or creating custom integrations. Support typically has faster response times, while development is scoped per project.",
      },
      {
        question: 'What does "Long Supported Version" mean?',
        answer:
          "Long Supported Version (LSV) means the maintainers commit to providing security patches and critical bug fixes for a specific version of the software for an extended period (typically 2-5 years), even as newer versions are released. This is crucial for enterprises that can't frequently update their systems.",
      },
      {
        question: "What are Advisory Services?",
        answer:
          "Advisory Services provide expert guidance without hands-on implementation. This includes architectural consulting, performance optimization recommendations, roadmap planning, developer training, and speaking engagements. It's ideal when you need strategic direction from experts.",
      },
      {
        question: "What Security & Compliance services are offered?",
        answer:
          "We offer Security Audits, VEX (Vulnerability Exploitability eXchange) reports, CVE Management, Compliance Consulting for regulations like the EU Cyber Resilience Act, Secure Code Reviews, and Threat Modeling. These services help enterprises meet their security and regulatory requirements.",
      },
      {
        question: "Can I request custom services not listed?",
        answer:
          "Yes. While we have standard service categories, maintainers can offer custom services tailored to your needs. Use the consultation request form on project pages to discuss your specific requirements, and maintainers will work with you to create a custom service package.",
      },
      {
        question: "How do response time SLAs work?",
        answer:
          "Response time SLAs guarantee that maintainers will acknowledge and begin triaging your support request within a specified timeframe (e.g., 24 hours for critical issues, 48 hours for standard). Resolution times vary by complexity, but initial response times are contractually guaranteed.",
      },
    ],
  },
  {
    category: "Projects & Maintainers",
    description: "Finding and working with projects",
    icon: "Layers",
    questions: [
      {
        question: "How do I find the right project or maintainer?",
        answer:
          "Browse our Projects page where you can filter by technology stack, service type, or search by project name. Each project page shows the maintainer team, available services, pricing, and case studies. You can also see which dependencies are supported through the project.",
      },
      {
        question: "What if the project I need isn't listed?",
        answer:
          "We're constantly onboarding new projects. Use our Contact page to request that we reach out to specific maintainers, or if you're a maintainer, you can register your project directly. We prioritize onboarding based on enterprise demand and ecosystem impact.",
      },
      {
        question: "Can I work directly with maintainers outside the platform?",
        answer:
          "While maintainers are free to work independently, using the platform provides benefits for both parties: transparent fund distribution to the ecosystem, standardized contracts and NDAs, payment processing and invoicing, and contribution to open source sustainability. We encourage keeping work on-platform when possible.",
      },
      {
        question: "How are maintainers vetted?",
        answer:
          "We verify that maintainers have significant commit history and authority on their projects. We review their GitHub profiles, project governance roles, and community reputation. For enterprise services, we also verify their ability to provide professional support and meet SLA requirements.",
      },
      {
        question: "What if a maintainer becomes unavailable?",
        answer:
          "For team projects, other team members can fulfill service commitments. For critical enterprise contracts, we work with you to find alternative experts or transition support. This is why we emphasize working with projects that have healthy maintainer teams rather than single individuals.",
      },
    ],
  },
  {
    category: "Foundations & Sponsors",
    description: "Supporting the open source ecosystem",
    icon: "Heart",
    questions: [
      {
        question: "How can my foundation use this platform?",
        answer:
          "Foundations can use our platform to distribute funding to projects more efficiently, track how grants are used in the ecosystem, connect projects with enterprise support opportunities, and demonstrate the impact of foundation support through transparent metrics.",
      },
      {
        question: "What sponsorship options are available?",
        answer:
          "You can sponsor individual projects, entire technology ecosystems, or the platform itself. Sponsorships can fund general development, specific features, security initiatives, or ecosystem growth. We provide detailed impact reports showing how your sponsorship supports the broader community.",
      },
      {
        question: "Can sponsors get recognition?",
        answer:
          "Yes. Sponsors are featured on project pages, in our Supporters section, and in platform communications. Recognition levels vary by sponsorship tier and can include logo placement, case studies, and speaking opportunities at ecosystem events.",
      },
      {
        question: "How is sponsored funding distributed?",
        answer:
          "Sponsored funds follow the same transparent distribution model as service revenue, unless you specify a different allocation. You can choose to fund specific initiatives, support dependency trees, or contribute to the general ecosystem fund. All distributions are tracked and reported.",
      },
    ],
  },
  {
    category: "Technical & Integration",
    description: "Platform usage and integration",
    icon: "Settings",
    questions: [
      {
        question: "Do I need to change my code to use these services?",
        answer:
          "No. Our services are about support, development, and consulting—not changing how you use open source software. You continue using projects as normal; we just provide a channel to get expert help when needed.",
      },
      {
        question: "How do I track my service usage?",
        answer:
          "Your dashboard provides real-time tracking of service hours, support requests, development progress, and spending across all projects. Enterprises get detailed analytics and reports for budget planning and vendor management.",
      },
      {
        question: "Is there an API?",
        answer:
          "We're developing APIs for enterprise integration with procurement systems, ticketing platforms, and internal dashboards. Contact our enterprise team for early access and custom integration support.",
      },
      {
        question: "What about GDPR and data privacy?",
        answer:
          "We are fully GDPR compliant. Personal data is minimized, encrypted, and only used for platform operations. You have full rights to access, export, and delete your data. We never sell user data, and as a nonprofit, we have no incentive to monetize your information.",
      },
    ],
  },
];
