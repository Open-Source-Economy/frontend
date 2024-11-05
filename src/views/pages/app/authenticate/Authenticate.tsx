import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../PageWrapper";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "src/assets/logo.png";
import github from "src/assets/github.png";
import { GetCompanyUserInviteInfoQuery, LoginBody, LoginQuery, RegisterBody, RegisterQuery } from "src/dtos/auth";
import { getAuthBackendAPI } from "src/services";

export enum AuthenticateType {
  SignIn,
  SignUp,
}

interface AuthenticateProps {
  type: AuthenticateType;
}

export function Authenticate(props: AuthenticateProps) {
  const auth = useAuth();
  const authAPI = getAuthBackendAPI();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const projectToken: string | null = params.get("project_token");
  const companyToken = params.get("company_token");

  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isEmailPredefined, setIsEmailPredefined] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (companyToken) fetchCompanyUserInviteInfo(companyToken);
  }, [companyToken]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLocalAuthentication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (props.type === AuthenticateType.SignIn) {
      const body: LoginBody = {
        email: email,
        password: password,
      };
      const query: LoginQuery = {};
      auth.login(body, query);
    } else {
      const body: RegisterBody = {
        name: name,
        email: email,
        password: password,
      };
      const query: RegisterQuery = {
        companyToken: companyToken ?? undefined,
      };
      auth.register(body, query);
    }
  };

  const handleLogInWithGithub = async () => {
    await auth.loginWithGitHub();
  };

  const fetchCompanyUserInviteInfo = async (companyToken: string) => {
    try {
      const query: GetCompanyUserInviteInfoQuery = {
        token: companyToken,
      };
      const inviteInfo = await authAPI.getCompanyUserInviteInfo(query);
      setName(inviteInfo.userName ?? null);
      setEmail(inviteInfo.userEmail);
      setIsEmailPredefined(true);
    } catch (error) {
      console.error(error); // TODO: display the error
    }
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
              <img src={logo} className="w-[310px] h-[55px] mb-12 object-cover" alt="" />
            </Link>

            {!isEmailPredefined && (
              <>
                <button
                  className="bg-[#202F45] rounded-lg flex items-center justify-center px-5 py-[12px] sm:w-[90%] lg:w-[90%] gap-2 hover:bg-transparent hover:border-2 border-2  hover:border-[#202F45] border-[#202F45]"
                  onClick={handleLogInWithGithub}
                >
                  <img src={github} className="w-[21px] h-[21px]" alt="" />
                  <h3 className="text-base text-[#ffffff]">Sign in with Github</h3>
                </button>
                <div className="flex items-center justify-center gap-3 mt-6 mb-6">
                  <hr className="bg-[rgba(255, 255, 255, 0.7)] w-[100px] sm:w-[170px] h-[2px] mt-[5px]" />
                  <h3 className="text-base text-[#ffffff]">Or</h3>
                  <hr className="bg-[rgba(255, 255, 255, 0.7)] w-[100px] sm:w-[170px] h-[2px] mt-[5px]" />
                </div>
              </>
            )}

            <div className="flex items-center justify-center gap-3 flex-col">
              <input
                type="email"
                placeholder="Email"
                className={`${isEmailPredefined ? "bg-opacity-50 opacity-50" : ""} w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3`}
                value={email}
                onChange={handleEmailChange}
                required
                disabled={isEmailPredefined}
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

            {/*TODO: incorporate it*/}
            {/*<TermsAgreement />*/}

            {/*TODO: display error*/}
            {/*{auth.error instanceof ApiError && <div className="alert alert-danger mt-3">{auth.error.message}</div>}*/}

            <div className="flex  justify-center items-center gap-3 mt-5">
              {/*TODO: should be the generic button */}
              <Link to={props.type === AuthenticateType.SignIn ? "/sign-up" : "/sign-in"}>
                <button className="px-[20px] sm:px-14  button  py-3 rounded-3 cursor-pointer" disabled={auth.loading}>
                  {props.type === AuthenticateType.SignIn ? "Sign Up" : "Sign In"}
                </button>
              </Link>

              <button type="submit" className="sm:px-14 px-[20px] py-3 findbutton cursor-pointer" disabled={auth.loading}>
                {props.type === AuthenticateType.SignIn ? (auth.loading ? "Signing In..." : "Sign In") : auth.loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
