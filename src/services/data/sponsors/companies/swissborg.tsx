import swissBorg from "src/assets/v1/sponsor/swiss-borg.webp";
import { CardSize } from "src/utils/local-types";
import { ExternalLink } from "src/views/v1/components";
import { SponsorDescription } from "src/model";

export const swissborg: SponsorDescription = {
  imgUrl: swissBorg,
  main: true,
  title: "Empowering Your Financial Freedom",
  size: "xlarge" as CardSize,
  isUnderline: true,
  details: (
    <>
      Buy crypto with 16 fiats including EUR, CHF and GBP.
      <br />
      <ExternalLink href="https://swissborg.com/r/OSEBORG" className="text-primary-user">
        Join now
      </ExternalLink>{" "}
      and get €15 in Bitcoin!
    </>
  ),
  callToAction: (
    <>
      p.s.{" "}
      <ExternalLink href="https://jobs.lever.co/swissborg/" className="text-primary-user">
        we’re hiring
      </ExternalLink>
      ! 😉
    </>
  ),
};
