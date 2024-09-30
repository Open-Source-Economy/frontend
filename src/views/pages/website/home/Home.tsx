import React from "react";
import Sec3 from "./elements/Sec3/Sec3";
import Sec2 from "./elements/Sec2/Sec2";
import Sec1 from "./elements/Sec1/Sec1";
import { PageWrapper } from "../../PageWrapper";
import Sec4 from "./elements/Sec4/Sec4";
import "./Home.css";

interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <PageWrapper>
      <div className="boxlayer mt-md-5 mt-4 ">
        <div className="container">
          <Sec1 />
        </div>
        <Sec2 />
        {/*<div>*/}
        {/*  <div className="sec3bg1">*/}
        {/*    <div className="sec3bg2">*/}
        {/*      <Sec3 />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  <Sec4 />*/}
        {/*</div>*/}
      </div>
    </PageWrapper>
  );
}
