import React from "react";
import "./SocialMedia.css";
import { EconomyIcon, EconomyIcon2, EconomyIcon3, EconomyIcon4, EconomyIcon5 } from "../common/icons";

interface SocialMediaProps {}

// TODO: to refactor this component to use a map function to render the social media icons: SocialMediaIcon
export function SocialMedia(props: SocialMediaProps) {
  return (
    <>
      {/*code for linear gradient hover on  mastodon svg icon  */}
      <a
        className="hover:scale-125 duration-200 ease-in-out transition-all "
        href="https://mastodon.social/@OS_Economy"
        target="_blank"
        rel="noopener noreferrer"
      >
        <EconomyIcon />
      </a>

      <a className="hover:scale-125 duration-200 ease-in-out transition-all" href="https://x.com/OS_Economy" target="_blank" rel="noopener noreferrer">
        {/*code for linear gradient hover on  X svg icon  */}
        <EconomyIcon2 />
      </a>

      {/*code for linear gradient hover on  github svg icon  */}

      <a
        className="hover:scale-125 duration-200 ease-in-out transition-all"
        href="https://github.com/Open-Source-Economy"
        target="_blank"
        rel="noopener noreferrer"
      >
        <EconomyIcon3 />
      </a>

      <a
        className="hover:scale-125 duration-200 ease-in-out transition-all"
        href="https://www.linkedin.com/company/open-source-economy/"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/*code for linear gradient hover on  linkedin svg icon  */}
        <EconomyIcon4 />
      </a>

      <a
        className="hover:scale-125 duration-200 ease-in-out transition-all"
        href="https://discord.com/invite/YX88NaYgrP"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/*code for linear gradient hover on  discord svg icon  */}
        <EconomyIcon5 />
      </a>
    </>
  );
}
