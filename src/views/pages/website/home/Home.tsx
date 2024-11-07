import React from "react";
import Sec2 from "./elements/Sec2/Sec2";
import Sec1 from "./elements/Sec1/Sec1";
import { PageWrapper } from "../../PageWrapper";
import "./Home.css";
import Sec3 from "src/views/pages/website/home/elements/Sec3/Sec3";
import Sec4 from "src/views/pages/website/home/elements/Sec4/Sec4";

interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <PageWrapper>
      <div className="boxlayer mt-md-5 mt-4 ">
        <div className="container">
          <Sec1 />
        </div>
        <Sec2 />
        <div>
          <div className="sec3bg1">
            <div className="sec3bg2">
              <Sec3 />
            </div>
          </div>
          <Sec4 />
        </div>
      </div>
    </PageWrapper>
  );
}
