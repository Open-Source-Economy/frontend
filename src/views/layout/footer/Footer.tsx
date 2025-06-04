import * as React from "react";
import { useEffect, useState } from "react";
import { SocialMedia } from "src/views/components/socialMedia/SocialMedia";
import AOS from "aos";
import "aos/dist/aos.css";

import backdropSVG2 from "../../../assets/footer-bd-rr.png";
import backdropSVG3 from "../../../assets/footer-bd-ll.png";

import { getBackendAPI } from "../../../services";
import type { NewsletterSubscriptionBody, NewsletterSubscriptionParams, NewsletterSubscriptionQuery } from "../../../api/dto";
import { ApiError } from "../../../ultils/error/ApiError";
import { paths } from "src/paths";
import { BookACallButton } from "../../components/elements/BookACallButton";
import { ExternalLink } from "../../components";
import { Link } from "react-router-dom";

type FooterLink = {
  text: string;
  href: string;
  external?: boolean;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: "",
    links: [],
  },
  {
    title: "",
    links: [],
  },
  {
    title: "",
    links: [],
  },
  {
    title: "Resources",
    links: [
      // { text: "White Paper", href: paths.WHITE_PAPER, external: true },
      { text: "How it Works", href: paths.HOW_ITS_WORK },
      // { text: "Blog", href: paths.BLOG, external: true },
      { text: "Terms & Conditions", href: paths.TERMS_AND_CONDITIONS, external: true },
    ],
  },
];

const legalLinks: FooterLink[] = [
  { text: "Privacy policy", href: paths.PRIVACY },
  { text: "", href: paths.TERMS },
];

export function Footer() {
  const successMessage = "You have successfully subscribed to the newsletter!";
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState<boolean>(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);
    setDisplaySuccessMessage(false);

    try {
      const api = getBackendAPI();
      const params: NewsletterSubscriptionParams = {};
      const body: NewsletterSubscriptionBody = { email };
      const query: NewsletterSubscriptionQuery = {};

      const response = await api.subscribeToNewsletter(params, body, query);
      if (response instanceof ApiError) {
        setError(response);
      } else {
        setDisplaySuccessMessage(true);
      }
    } catch (error) {
      setError(ApiError.from(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, []);

  const FooterSection = ({ section }: { section: FooterSection }) => (
    <div>
      <h3 className="text-pink-500 font-semibold mb-4">{section.title}</h3>
      <ul className="space-y-2">
        {section.links.map((link, index) => (
          <li key={link.text}>
            {link.external ? (
              <ExternalLink href={link.href} className="hover:underline">
                {link.text}
              </ExternalLink>
            ) : (
              <Link to={link.href} className="hover:underline">
                {link.text}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div id="footer" className="bg-[url('./assets/bg-2.svg')] max-[1100px]:bg-none bg-cover bg-right relative overflow-hidden">
      <img src={backdropSVG2} className="pointer-events-none absolute bottom-0 right-0 z-[-1] max-w-[500px] lg:max-w-[700px] opacity-20" alt="" />
      <img src={backdropSVG3} className="pointer-events-none absolute bottom-0 left-0 z-[-1] max-w-[600px] lg:max-w-[1100px] opacity-20" alt="" />

      <div className="bg-[url('./assets/bg-1.png')] max-[1100px]:bg-none bg-cover bg-left">
        <div className="bg-[url('./assets/boxes.png')] bg-auto bg-no-repeat bg-[position:743px_0%] 1200:bg-[position:743px_0%] md:bg-[position:492px_0%]">
          <div className="pb-[30px] md:px-[48px] container max-[376px]:max-w-[95%] space-y-8">
            {/* Question and Navigation Section */}
            <div className="flex w-full flex-col lg:flex-row gap-8 lg:gap-16 md:px-[30px] sm:px-[20px] max-[540px]:px-3 1200:px-[65px]">
              {/* Question Section */}
              <div className="mb-6 lg:mb-12 flex-shrink-0" data-aos="fade-right" data-aos-delay="100">
                <h2 className="text-3xl lg:text-4xl mb-2 font-semibold">
                  Have A <span className="text-pink-500">Question</span> Or <br />
                  <span className="text-pink-500">Need</span> Something?
                </h2>
                <p className="text-gray-300 mb-4 text-base lg:text-lg">We are here for you</p>
                <BookACallButton />
              </div>

              {/* Navigation Links */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-4 w-full flex-grow mt-2 justify-end">
                {footerSections.map((section, i) => (
                  <div key={`footer-section-${i}`} data-aos="fade-up" data-aos-delay={150 + i * 100} className="">
                    <FooterSection section={section} />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-2 border-gray-700" />

            {/* Logo and Newsletter Section */}
            <div className="flex flex-col lg:flex-row gap-8 md:px-[30px] sm:px-[20px] max-[540px]:px-3 1200:px-[65px]">
              <div className="lg:w-1/2 w-full" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
                <a href={paths.HOME}>
                  <img src="/favicon.svg" className="max-w-[200px] md:max-w-[330px]" alt="Logo" />
                </a>
                <div className="flex items-center mt-4 gap-3">
                  <SocialMedia />
                </div>
              </div>

              <div className="lg:w-1/2 w-full" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
                <div className="flex flex-col lg:items-end lg:justify-end">
                  <h1 className="text-2xl lg:text-[29px] leading-[43.5px] font-mich mb-2">Stay Tuned!</h1>
                  <div className="mt-2 flex h-[57px] w-full max-w-[400px] lg:min-w-[400px] justify-between rounded-[14px] bg-white">
                    <input
                      type="email"
                      className="w-full border-none rounded-l-[14px] bg-transparent px-4 text-sm text-black outline-none"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      className={`[background-image:linear-gradient(to_right,#5E309C_0%,#66319B_6%,#7E3698_16%,#A43E94_28%,#D9498F_42%,#FF518C_51%,#FF7E4B_100%)] font-mich relative h-[57px] min-w-[140px] rounded-r-[14px] duration-300 after:absolute after:left-1/2 after:top-1/2 after:h-[calc(100%-4px)] after:w-[calc(100%-4px)] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-r-[14px] after:bg-secondary after:opacity-0 after:duration-300 hover:bg-transparent after:hover:opacity-80 ${
                        isLoading ? "opacity-50" : ""
                      }`}
                      onClick={handleSubscribe}
                      disabled={isLoading}
                    >
                      <span className="relative z-30">{isLoading ? "Joining..." : "Join now"}</span>
                    </button>
                  </div>
                  {error && <p className="text-red-500 mt-2">{error.message}</p>}
                  {displaySuccessMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </div>
              </div>
            </div>

            <hr className="border-2 border-gray-700" />

            {/* Footer Bottom */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-between items-center md:px-[30px] sm:px-[20px] max-[540px]:px-3 1200:px-[65px]"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-offset="-100"
            >
              <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                © Open Source Economy - Non profit organisation -{" "}
                <ExternalLink href="https://zefix.ch/en/search/entity/list/firm/1637128">CHE-440.058.692</ExternalLink> Switzerland
              </p>
              {/*This part is overridden by the button "Donate"*/}
              {/*{config.env !== Env.Production && (*/}
              {/*  <div className="flex gap-4 sm:gap-9">*/}
              {/*    {legalLinks.map((link, i) => (*/}
              {/*      <a key={link.text} href={link.href} className="text-xs sm:text-sm hover:underline transition-all duration-300">*/}
              {/*        {link.text}*/}
              {/*      </a>*/}
              {/*    ))}*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
