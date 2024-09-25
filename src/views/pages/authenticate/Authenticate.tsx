import React, { useEffect, useState } from "react";
import { PageWrapper } from "../PageWrapper";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useAuth } from "./AuthContext";
import { ApiError } from "../../../ultils/error/ApiError";

export enum AuthenticateType {
  SignIn,
  SignUpAsContributor,
  SignUpAsCompany,
}

interface AuthenticateProps {
  type: AuthenticateType;
}

export function Authenticate(props: AuthenticateProps) {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Any side effects or cleanup can be handled here
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLocalAuthentication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (props.type === AuthenticateType.SignIn) {
      auth.login({ email, password });
    } else {
      auth.register({ email, password });
    }
  };

  const handleLogInWithGithub = async () => {
    await auth.loginWithGitHub();
  };

  return (
    <PageWrapper>
      <section style={{ height: "100%" }}>
        <div className="container mt-5 pt-lg-5 pt-3">
          <h1 className="text-center text-white">
            Contributor <span className="text__primary">Portal</span>
          </h1>

          <div className="row d-flex justify-content-center gy-5 mt-5">
            <div className="col-lg-5">
              <div className="native-card" style={{ padding: "45px 57px" }}>
                <div className="top text-center mb-5">
                  <Link to="/page" className="text-decoration-none">
                    <div className="d-flex gap-3 align-items-center justify-content-center">
                      <img src={logo} className="logo" alt="" />
                      <p className="logofont text-center text-white mb-0">
                        Open Source <br />
                        <span className="text__primary">Economy</span>
                      </p>
                    </div>
                  </Link>
                </div>
                <button
                  className="github text-decoration-none text-white d-flex justify-content-center align-items-center gap-2 git-hover"
                  onClick={handleLogInWithGithub}
                >
                  <i className="fa-brands fa-github"></i> <p className=" helvetica mb-0">Sign in with Github</p>
                </button>
                <div className="line helvetica"></div>

                <form className="position-relative mb-4" onSubmit={handleLocalAuthentication}>
                  <input
                    type="email"
                    className="form-control helvetica border-0 text-white git-input"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />

                  <input
                    type="password"
                    className="form-control helvetica border-0 text-white git-input"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />

                  <button type="submit" className="submit-btn btn btn-primary helvetica fw-600" disabled={auth.loading}>
                    {auth.loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>

                <p className="helvetica color-70 ">
                  By using Open Source Economy you agree to our{" "}
                  <a href="#" className="text-decoration-none color-70 term ">
                    Terms of Service
                  </a>{" "}
                  and understand our{" "}
                  <a href="#" className="text-decoration-none color-70 term ">
                    Privacy Policy
                  </a>
                </p>
                {}

                {auth.error instanceof ApiError && <div className="alert alert-danger mt-3">{auth.error.message}</div>}
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: "150px" }}></div>
      </section>
    </PageWrapper>
  );
}
