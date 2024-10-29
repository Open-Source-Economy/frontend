import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../PageWrapper";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "src/assets/logo.png";
import github from "src/assets/github.png";
import { ApiError } from "src/ultils/error/ApiError";
import { LoginBodyParams, LoginQueryParams, RegisterBodyParams, RegisterQueryParams } from "src/dtos/auth";

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
      const body: LoginBodyParams = {
        email: email,
        password: password,
      };
      const query: LoginQueryParams = {};
      auth.login(body, query);
    } else {
      const body: RegisterBodyParams = {
        email: email,
        password: password,
      };
      const query: RegisterQueryParams = {};
      auth.register(body, query);
    }
  };

  const handleLogInWithGithub = async () => {
    await auth.loginWithGitHub();
  };

  return (
    <PageWrapper>
      <div className="login pt-12 pb-24">
        <div className="flex items-center justify-center  flex-col">
          <h1 className="text-[30px] lg:text-[44px] text-[#ffffff] text-center">Sign in </h1>
          <form
            onSubmit={handleLocalAuthentication}
            className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
          >
            <Link to={"/"}>
              <img src={logo} className="w-[310px] h-[55px] object-cover" alt="" />
            </Link>

            <button
              className="bg-[#202F45] rounded-lg flex items-center justify-center mt-12 px-5 py-[12px] sm:w-[90%] lg:w-[90%] gap-2 hover:bg-transparent hover:border-2 border-2  hover:border-[#202F45] border-[#202F45]"
              onClick={handleLogInWithGithub}
            >
              <img src={github} className="w-[21px] h-[21px]" alt="" />
              <h3 className="text-base text-[#ffffff]">Sign in with Github</h3>
            </button>
            <div className="flex items-center justify-center gap-3 mt-6">
              <hr className="bg-[rgba(255, 255, 255, 0.7)] w-[100px] sm:w-[170px] h-[2px] mt-[5px]" />
              <h3 className="text-base text-[#ffffff]">Or</h3>
              <hr className="bg-[rgba(255, 255, 255, 0.7)] w-[100px] sm:w-[170px] h-[2px] mt-[5px]" />
            </div>
            <div className="mt-6 flex items-center justify-center gap-3 flex-col">
              <input
                type="email"
                placeholder="Email"
                className=" w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className=" w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {/* TODO */}
            <div className="flex items-start justify-center gap-3 px-4 mt-4">
              <input type="checkbox" id="customCheckbox" className="customCheckbox" />
              <p className="text-[12px] leading-6 text-[#ffffff]">
                By placing an order you agree with the{" "}
                <a href="javascript:void(0)" className="gradient-text fw-bold hover-effect">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="javascript:void(0)" className="gradient-text fw-bold hover-effect">
                  Terms of Sales
                </a>
              </p>

              {auth.error instanceof ApiError && <div className="alert alert-danger mt-3">{auth.error.message}</div>}

              <style>{`
              .gradient-text {
                background: linear-gradient(90deg, #ff7e4b, #ff518c);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              .hover-effect {
                border-bottom: 1px solid transparent; /* Set a transparent border to allow border-image to show */
                transition: border-bottom 0.3s ease;
              }
              .hover-effect:hover {
                border-image: linear-gradient(90deg, #ff7e4b, #ff518c);
                border-image-slice: 1;
              }
            `}</style>
            </div>
            <div className="flex  justify-center items-center gap-3 mt-5">
              {/*TODO: lolo*/}
              <Link to={"/payment"}>
                <button className="px-[20px] sm:px-14  button  py-3 rounded-3 cursor-pointer" disabled={auth.loading}>
                  Sign Up
                </button>
              </Link>

              <button type="submit" className="sm:px-14 px-[20px]  py-3  findbutton cursor-pointer" disabled={auth.loading}>
                {auth.loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
