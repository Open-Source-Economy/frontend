import React from "react";
import { Footer, Header } from "../../layout";
import { Link } from "react-router-dom";
import Crypto from "../../../assets/images/crypto.png";
import { PageWrapper } from "../PageWrapper";

interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <PageWrapper>
      <section className="banner__home" style={{ height: "100vh" }}>
        <div className="container mt-5 pt-lg-5 pt-3">
          <h1 className="text-center text-white">
            Open Source <span className="text__primary">Economy</span>
          </h1>

          <h5 className="text-center text-white helvetica fw-400 mt-4 h6 ">The solution to make Open-Source as Competitive as Closed Source.</h5>
          <div className="d-flex justify-content-center align-items-lg-end align-items-center flex-wrap flex-lg-row flex-column-reverse mb-5  gap-lg-0 gap-3 mt-5">
            <div className="c-card  justify-content-center  align-items-center flex-wrap flex-lg-row flex-column-reverse">
              <div>
                <Link to="/invest" className="connect__btns text-decoration-none">
                  {" "}
                  Maintainers
                </Link>
              </div>
              <div>
                <Link to="/issues" className="connect__btns text-decoration-none">
                  {" "}
                  Fund an issue
                </Link>
              </div>
              <div>
                <Link to="/invest" className="connect__btns text-decoration-none">
                  {" "}
                  Invest / Donate
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <img src={Crypto} className="crypto-img img-fluid" alt="" />
          </div>
        </div>
      </section>
      <div style={{ height: "150px" }}></div>
    </PageWrapper>
  );
}
