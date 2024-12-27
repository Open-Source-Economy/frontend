import React, { useEffect, useState } from "react";
import { PageWrapper } from "../../PageWrapper";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "src/assets/logo.png";
import github from "src/assets/github.png";
import {
	GetCompanyUserInviteInfoQuery,
	LoginBody,
	LoginQuery,
	RegisterBody,
	RegisterQuery,
} from "src/dtos/auth";
import { getAuthBackendAPI } from "src/services";
import { Button } from "src/components";
import { GetRepositoryUserInviteInfoQuery } from "src/dtos/auth/GetRepositoryUserInviteInfo.dto";
import { TermsAgreement } from "src/views/pages/app/authenticate/elements/TermsAgreement";
import { ApiError } from "src/ultils/error/ApiError";
import { BaseURL } from "src/App";
import { config, Env } from "src/ultils";
import { ApiErrorModal } from "../../../../components/common/ApiErrorModal";

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
	const repositoryToken: string | null = params.get("repository_token");
	const companyToken: string | null = params.get("company_token");

	const [name, setName] = useState<string | null>(null);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [githubLogin, setGithubLogin] = useState("");
	const [termsChecked, setTermsChecked] = useState(false);

	const [isEmailPredefined, setIsEmailPredefined] = useState(false);
	const [isGithubAccountPredefined, setIsGithubAccountPredefined] =
		useState(false);

	const [validEmail, setValidEmail] = useState(true);

	type PasswordValidation = {
		minLength: boolean;
		hasNumber: boolean;
		hasSymbol: boolean;
		isEmpty: boolean;
	};
	const [validPassword, setValidPassword] = useState<PasswordValidation | null>(
		null,
	);
	const [validConfirmPassword, setValidConfirmPassword] = useState(true);
	const [validTerms, setValidTerms] = useState(true);

	const [error, setError] = useState<ApiError | null>(null);
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (companyToken) fetchCompanyUserInviteInfo(companyToken);
		if (repositoryToken) fetchRepositoryUserInviteInfo(repositoryToken);
	}, []);

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleConfirmPasswordChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setConfirmPassword(event.target.value);
	};

	const validateForm = () => {
		const isSignUp = props.type === AuthenticateType.SignUp;

		const validateEmail = (email: string) => {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			setValidEmail(emailRegex.test(email));
		};

		const validatePassword = (password: string) => {
			const minLength = 6;
			const hasNumber = /\d/;
			const hasSymbol = /[!@#$%^&*(),.?";:{}|<>_\-'\+\=\[\]~`\\]/;

			const validation: PasswordValidation = {
				minLength: password.length >= minLength,
				hasNumber: hasNumber.test(password),
				hasSymbol: hasSymbol.test(password),
				isEmpty: password.trim() === "",
			};

			const NO_ERROR: PasswordValidation = {
				minLength: true,
				hasNumber: true,
				hasSymbol: true,
				isEmpty: false,
			};
			if (JSON.stringify(validation) === JSON.stringify(NO_ERROR))
				setValidPassword(null);
			else setValidPassword(validation);
		};

		const validateConfirmPassword = (
			password: string,
			confirmPassword: string,
		) => {
			setValidConfirmPassword(password === confirmPassword);
		};

		const validateTerms = (termsChecked: boolean) => {
			setValidTerms(termsChecked);
		};

		// Always validate email for both sign-in and sign-up
		validateEmail(email);

		// If it's sign-in, we only need to ensure email and password are present
		if (!isSignUp) {
			return validEmail && email && password;
		} else {
			// If it's sign-up, perform additional validations
			validatePassword(password);
			validateConfirmPassword(password, confirmPassword);
			validateTerms(termsChecked);

			return (
				validEmail &&
				validPassword === null &&
				validConfirmPassword &&
				validTerms
			);
		}
	};

	const handleLocalAuthentication = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		if (!validateForm()) {
			console.log("Form is invalid.");
			return;
		} else if (props.type === AuthenticateType.SignIn) {
			console.log("Logging in...");
			const body: LoginBody = {
				email: email,
				password: password,
			};
			const query: LoginQuery = {};
			auth.login(body, query);
		} else {
			console.log("Registering...");
			const body: RegisterBody = {
				name: name,
				email: email,
				password: password,
			};
			const query: RegisterQuery = {
				companyToken: companyToken ?? undefined,
				repositoryToken: repositoryToken ?? undefined,
			};
			auth.register(body, query);
		}
	};

	const handleLogInWithGithub = async () => {
		auth.loginWithGitHub();
	};

	const fetchCompanyUserInviteInfo = async (companyToken: string) => {
		try {
			const query: GetCompanyUserInviteInfoQuery = {
				token: companyToken,
			};
			const inviteInfo = await authAPI.getCompanyUserInviteInfo(query);
			if (inviteInfo instanceof ApiError) setError(inviteInfo);
			else {
				setName(inviteInfo.userName ?? null);
				setEmail(inviteInfo.userEmail);
				setIsEmailPredefined(true);
			}
		} catch (error: unknown) {
			setError(ApiError.from(error));
		}
	};

	const fetchRepositoryUserInviteInfo = async (repositoryToken: string) => {
		try {
			const query: GetRepositoryUserInviteInfoQuery = {
				token: repositoryToken,
			};
			const inviteInfo = await authAPI.getRepositoryUserInviteInfo(query);
			if (inviteInfo instanceof ApiError) setError(inviteInfo);
			else {
				setName(inviteInfo.userName ?? null);
				setGithubLogin(inviteInfo.userGithubOwnerLogin);
				setIsGithubAccountPredefined(true);
			}
		} catch (error: unknown) {
			setError(ApiError.from(error));
		}
	};

	useEffect(() => {
		if (auth.error) setShowError(true);
		if (error) setShowError(true);
	}, [auth.error, error]);

	return (
		<PageWrapper baseURL={BaseURL.WEBSITE}>
			<ApiErrorModal
				error={auth.error ?? error}
				showError={showError}
				setShowError={setShowError}
			/>

			<div className="login pt-12 pb-24 min-h-screen flex justify-center items-center">
				<div className="flex items-center justify-center  flex-col">
					<h1 className="text-[30px] lg:text-[44px] text-[#ffffff] text-center">
						{props.type === AuthenticateType.SignIn ? "Sign in" : "Sign up"}
					</h1>
					<form
						onSubmit={handleLocalAuthentication}
						className="bg-[#14233A] border !border-[rgba(255,_255,_255,_0.2)] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] !px-5 lg:!px-8 sm:w-[450px]"
					>
						<>
							<Link to={"/"}>
								<img
									src={logo}
									className="w-[310px] h-[55px] mb-12 object-cover"
									alt=""
								/>
							</Link>

							{!isEmailPredefined && (
								<>
									<button
										type="button"
										className="bg-[#202F45] rounded-lg flex items-center min-w-full  justify-center px-5 py-[12px] sm:w-[90%] gap-2 hover:bg-transparent hover:border-2 border-2  hover:border-[#202F45] border-[#202F45]"
										onClick={handleLogInWithGithub}
									>
										<img src={github} className="w-[21px] h-[21px]" alt="" />
										<h3 className="text-base text-[#ffffff]">
											{props.type === AuthenticateType.SignIn
												? "Sign in with Github"
												: "Sign up with Github"}
										</h3>
									</button>
									{!isGithubAccountPredefined && (
										<div className="flex items-center justify-center gap-3 mt-6 mb-6">
											<hr className="bg-[rgba(255, 255, 255, 0.7)] w-[100px] sm:w-[170px] h-[2px] mt-[5px]" />
											<h3 className="text-base text-[#ffffff]">Or</h3>
											<hr className="bg-[rgba(255, 255, 255, 0.7)] w-[100px] sm:w-[170px] h-[2px] mt-[5px]" />
										</div>
									)}
								</>
							)}

							{!isGithubAccountPredefined && (
								<div className="flex items-center w-full justify-center gap-3 flex-col">
									{/*Email input*/}
									<div className="flex w-full flex-col gap-y-2">
										<input
											type="email"
											placeholder="Email"
											className={`
                        ${isEmailPredefined ? "bg-opacity-50 opacity-50" : ""} " "
                        ${validEmail ? "border-0" : "!border-red-500 "} " "
                        w-full border outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3`}
											value={email}
											onChange={handleEmailChange}
											disabled={isEmailPredefined}
											required
										/>

										{!validEmail && !email && (
											<span className="text-red-500">
												Please fill in the email field.
											</span>
										)}
										{email && !validEmail && (
											<span className="text-red-500">
												Please enter a valid email address.
											</span>
										)}
									</div>

									{/*Password input*/}
									<div className="flex w-full flex-col  gap-y-2">
										<input
											type="password"
											placeholder="Password"
											className={`${
												validPassword
													? "!border-red-500 text-red-500"
													: "border-0"
											} w-full border outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3`}
											value={password}
											onChange={handlePasswordChange}
											required
										/>
										{props.type === AuthenticateType.SignUp &&
											validPassword && (
												<>
													{validPassword.isEmpty ? (
														<span className="text-red-500">
															Please fill in the password field.
														</span>
													) : (
														<span className="text-red-500">
															Your password must
															{!validPassword.minLength &&
																" be at least 6 characters long"}
															{!validPassword.minLength &&
																(!validPassword.hasNumber ||
																	!validPassword.hasSymbol) &&
																","}
															{!validPassword.hasNumber &&
																" contain at least one number"}
															{!validPassword.hasNumber &&
																!validPassword.hasSymbol &&
																","}
															{!validPassword.hasSymbol &&
																" contain at least one special character"}
															.
														</span>
													)}
												</>
											)}
									</div>

									{/* Confirm Password input (only for Sign Up) */}
									{props.type === AuthenticateType.SignUp && (
										<div className="flex w-full flex-col gap-y-2">
											<input
												type="password"
												placeholder="Confirm Password"
												className={`
                          ${!validConfirmPassword ? "!border-red-500 text-red-500" : "border-0"}
                          w-full border outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3
                        `}
												value={confirmPassword}
												onChange={handleConfirmPasswordChange}
												required
											/>
											{!validConfirmPassword && (
												<span className="text-red-500">
													Passwords do not match.
												</span>
											)}
										</div>
									)}
								</div>
							)}

							{config.env !== Env.Production &&
								props.type === AuthenticateType.SignUp && (
									<TermsAgreement
										checked={termsChecked}
										setChecked={setTermsChecked}
										isValid={validTerms}
									/>
								)}

							{!isGithubAccountPredefined && (
								<div className="flex justify-center w-full items-center gap-3 mt-4">
									<Button
										asChild={false}
										parentClassName="w-full"
										className="min-w-full font-semibold"
										type="submit"
										audience={"ALL"}
										level={"PRIMARY"}
										size="MEDIUM"
									>
										{props.type === AuthenticateType.SignIn
											? auth.loading
												? "Signing In..."
												: "Sign In"
											: auth.loading
												? "Signing Up..."
												: "Sign Up"}
									</Button>
								</div>
							)}

							{config.env !== Env.Production &&
								props.type === AuthenticateType.SignIn && (
									<Link
										to={"/"}
										className="gradient-text-normal relative group font-semibold mt-3"
									>
										Forgot Password?
										<span className="gradient-btn-bg w-full h-[1px] hidden group-hover:block absolute bottom-1 left-0"></span>
									</Link>
								)}
						</>
					</form>

					<p className="font-semibold mt-5">
						{props.type === AuthenticateType.SignIn
							? "Don't have an account?"
							: "Already have an account?"}{" "}
						<Link
							to={
								props.type === AuthenticateType.SignIn ? "/sign-up" : "/sign-in"
							}
							className="gradient-text-normal group relative"
						>
							{props.type === AuthenticateType.SignIn ? "Sign Up" : "Sign In"}
							<span className="gradient-bg w-full h-[1px] hidden group-hover:block absolute bottom-0 left-0">
								x
							</span>
						</Link>
					</p>
				</div>
			</div>
		</PageWrapper>
	);
}
