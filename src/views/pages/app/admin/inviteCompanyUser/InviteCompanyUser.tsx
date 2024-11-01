import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { SendCompanyAdminInviteBody, SendCompanyAdminInviteQuery } from "src/dtos";
import { CompanyId, CompanyUserRole } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";
import { getAdminBackendAPI } from "src/services/AdminBackendAPI";

interface InviteCompanyUserProps {}

export function InviteCompanyUser(props: InviteCompanyUserProps) {
  const adminBackendAPI = getAdminBackendAPI();

  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<CompanyId | null>(null);

  const [success, setSuccess] = useState<boolean | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCompanyIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyId(new CompanyId(event.target.value));
  };

  const handleLocalAuthentication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === null) {
      setError("Email is required");
      return;
    }

    if (companyId === null) {
      setError("companyId is required");
      return;
    }
    const body: SendCompanyAdminInviteBody = {
      userName: name,
      userEmail: email,
      companyId: companyId,
      companyUserRole: CompanyUserRole.ADMIN,
    };

    const query: SendCompanyAdminInviteQuery = {};

    try {
      const result = await adminBackendAPI.sendCompanyAdminInvite(body, query);
      if (result instanceof ApiError) {
        setError(`${result.statusCode}: ${result.message}`);
      } else {
        setError(null);
        setName(null);
        setEmail(null);
        setCompanyId(null);
        setSuccess(true);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        <div className="mt-20 py-5 px-3">
          <h1 className="lg:text-[62px] text-[30px]  text-center font-medium text-white">Fund an </h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={handleLocalAuthentication}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="text"
                placeholder="Company User Name"
                className=" w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={name ?? ""}
                onChange={handleNameChange}
                required
              />

              <input
                type="email"
                placeholder="Email"
                className=" w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={email ?? ""}
                onChange={handleEmailChange}
                required
              />

              <input
                type="text"
                placeholder="Company Id"
                className=" w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={companyId?.uuid ?? ""}
                onChange={handleCompanyIdChange}
                required
              />

              <button type="submit" className="sm:px-14 px-[20px]  py-3  findbutton cursor-pointer">
                Invite user
              </button>
            </form>

            {error && <p className="text-red-500 mt-3">Error: {error}</p>}

            <h2 className="text-white text-[30px] font-medium">{success ? `Success` : ""}</h2>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
