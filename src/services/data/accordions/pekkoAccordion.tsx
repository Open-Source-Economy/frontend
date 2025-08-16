import { GetProjectAccordionResponse } from "@open-source-economy/api-types";

export const pekkoAccordion: GetProjectAccordionResponse = {
  title: "Pekko: Your Best Choice",
  items: [
    {
      title: "Open Source—For Real",
      content:
        "Pekko is a community-driven fork of Akka. It’s governed by the Apache Software Foundation, ensuring it stays free and accessible to everyone, forever. No license traps, no usage fees, no shifting terms. You can rely on Pekko with full confidence that it will never go closed or commercial.",
    },
    {
      title: "Access Core Expertise",
      content:
        "Pekko provides a unique advantage: direct access to the deep knowledge and experience of core maintainers who were instrumental in building and maintaining Akka for many years. This ensures you benefit from unparalleled expertise and a deep understanding of the technology's potential.",
    },
    {
      title: "Community-First, Not VC-Backed",
      content:
        "Pekko isn’t controlled by venture capital or corporate interests. It's built and maintained by developers who care deeply about the ecosystem. Every decision serves the community—not shareholders—and every dollar contributed goes directly into development, not profits.",
    },
    // {
    //   title: "Ethical Impact",
    //   content:
    //     "Pekko is a community-driven project that prioritizes ethical impact over profit. By supporting Pekko, you’re not just funding a project; you’re investing in a sustainable future for open source software. Your contributions directly support the maintainers and the community, ensuring fair pay and ethical practices."
    // },
    {
      title: "Built for Reliability",
      content:
        "Distributed systems are hard. That’s why Pekko invests in a dedicated testing framework to catch edge cases, prevent regressions, and reproduce tricky bugs. With a laser focus on stability and predictability, you can trust Pekko in production—whether you're building financial systems, IoT platforms, or real-time services.",
    },
  ],
  buyServicesButton: true,
  donationButton: true,
};
