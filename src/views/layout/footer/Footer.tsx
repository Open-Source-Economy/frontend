import * as React from "react";
import { useEffect, useState } from "react";
import { SocialMedia } from "src/views/components/socialMedia/SocialMedia";
import AOS from "aos";
import "aos/dist/aos.css";

import backdropSVG2 from "../../../assets/footer-bd-rr.png";
import backdropSVG3 from "../../../assets/footer-bd-ll.png";

import { getBackendAPI } from "../../../services";
import { NewsletterSubscriptionBody, NewsletterSubscriptionParams, NewsletterSubscriptionQuery } from "../../../dtos";
import { ApiError } from "../../../ultils/error/ApiError";
import { paths } from "src/paths";

interface FooterProps {}

export function Footer(props: FooterProps) {
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

  return (
    <div id="footer" className="bg-[url('./assets/bg-2.svg')] max-[1100px]:bg-none bg-cover bg-right relative">
      <img src={backdropSVG2} className="pointer-events-none absolute bottom-0 right-0 z-[-1] max-w-[500px] lg:max-w-[700px]" alt="" />
      <img src={backdropSVG3} className="pointer-events-none absolute bottom-0 left-0 z-[-1] max-w-[600px] lg:max-w-[1100px]" alt="" />

      <div className="bg-[url('./assets/bg-1.png')] max-[1100px]:bg-none bg-cover bg-left">
        <div className="bg-[url('./assets/boxes.png')]  bg-auto bg-no-repeat bg-[position:743px_0%] 1200:bg-[position:743px_0%] md:bg-[position:492px_0%]">
          <div className="pb-[30px] sm:pb-[100px] md:px-[48px] container max-[376px]:max-w-[95%]">
            <div className="flex flex-wrap">
              <div className="md:w-1/2 w-full pt-4" data-aos="fade-right">
                <a href={paths.HOME} className="">
                  <img src="/Logo-svg.svg" className="max-[540px]:w-[200px] w-[250px]" alt="Logo" />
                </a>
                <div className="flex items-center mt-4 gap-3">
                  <SocialMedia />
                </div>
              </div>

              <div className="md:w-1/2 w-full pt-4" data-aos="fade-left">
                <div className="flex flex-col md:items-end md:justify-end ">
                  <h1 className="text-[29px] leading-[43.5px] font-mich mb-2">Stay Tuned!</h1>
                  <div className="mt-2 flex h-[57px] max-w-[400px] w-full lg:min-w-[400px] justify-between rounded-xl bg-white">
                    <input
                      type="email"
                      className="w-full border-none bg-transparent pl-3 text-sm text-black outline-none"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <button
                      className={`gradient-btn-bg font-mich relative h-[57px] min-w-[112px] rounded-r-md duration-300 after:absolute after:left-1/2 after:top-1/2 after:h-[53px] after:w-[106px] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-r-md after:bg-secondary after:opacity-0 after:duration-300 hover:bg-transparent after:hover:opacity-100 ${isLoading ? "opacity-50" : ""}`}
                      onClick={handleSubscribe}
                      disabled={isLoading}
                    >
                      <span className="relative z-30">{isLoading ? "Joining..." : "Join now"}</span>
                    </button>
                  </div>
                  {/*TODO: design*/}
                  {error && <p className="text-red-500 mt-2">{error.message}</p>}
                  {displaySuccessMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
