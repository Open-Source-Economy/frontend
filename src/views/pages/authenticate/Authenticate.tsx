import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { PageWrapper } from "../PageWrapper";

interface AuthenticateProps {}

export function Authenticate(props: AuthenticateProps) {
  return (
    <PageWrapper>
      <div className="container mt-5 pt-lg-5 pt-3">
        <h1 className="text-center text-white">
          Contributor <span className="text__primary">Portal</span>
        </h1>

        <div className="row d-flex justify-content-center gy-5 mt-5">
          <div className="col-lg-5">
            <div className="native-card" style={{ padding: "45px 57px" }}>
              <div className="top text-center mb-5">
                <Link to="/" className="text-decoration-none">
                  <div className="d-flex gap-3 align-items-center justify-content-center">
                    <img src={logo} className="logo" alt="" />
                    <p className="logofont text-center text-white mb-0">
                      Open Source <br />
                      <span className="text__primary">Economy</span>
                    </p>
                  </div>
                </Link>
              </div>
              <Link to="" className="github text-decoration-none text-white d-flex justify-content-center align-items-center gap-2 git-hover">
                <i className="fa-brands fa-github"></i> <p className=" helvetica mb-0">Sign in with Github</p>
              </Link>
              <div className="line helvetica"></div>
              <form action="#" className="position-relative mb-4">
                <input type="Email" className="form-control helvetica border-0 text-white git-input" placeholder="Email" />
                <Link to="/Manage" className="submit-btn btn btn-primary helvetica fw-600">
                  {" "}
                  Sign In{" "}
                </Link>
              </form>
              <p className="helvetica color-70 ">
                By using Open Source Economy you agree to our{" "}
                <Link to="#" className="text-decoration-none color-70 term fw-600">
                  Terms of Service
                </Link>{" "}
                and understand our{" "}
                <Link to="#" className="text-decoration-none color-70 term fw-600">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
