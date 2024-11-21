import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { SendRepositoryAdminInviteBody, SendRepositoryAdminInviteQuery } from "src/dtos";
import { DowCurrency, OwnerId, RepositoryId, RepositoryUserRole } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";
import { getAdminBackendAPI } from "src/services/AdminBackendAPI";
import { BaseURL } from "src/App";

interface InviteRepositoryUserProps {}

export function InviteRepositoryUser(props: InviteRepositoryUserProps) {
  const adminBackendAPI = getAdminBackendAPI();

  const emptyFormData = {
    name: "",
    email: "",
    githubOwnerLogin: "",
    repositoryOwnerLogin: "",
    repositoryName: "",
    dowRate: 0,
    dowCurrency: DowCurrency.USD,
  };
  const [formData, setFormData] = useState(emptyFormData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocalAuthentication = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, email, githubOwnerLogin, repositoryOwnerLogin, repositoryName, dowRate, dowCurrency } = formData;

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!githubOwnerLogin) {
      setError("GitHub Owner Login is required");
      return;
    }

    if (!repositoryOwnerLogin) {
      setError("Repository Owner Login is required");
      return;
    }

    if (!repositoryName) {
      setError("Repository Name is required");
      return;
    }

    if (!dowRate) {
      setError("DOW Rate is required");
      return;
    }

    const body: SendRepositoryAdminInviteBody = {
      userName: name,
      userEmail: email,
      userGithubOwnerLogin: githubOwnerLogin,
      repositoryId: new RepositoryId(new OwnerId(repositoryOwnerLogin), repositoryName),
      repositoryUserRole: RepositoryUserRole.ADMIN,
      dowRate: dowRate,
      dowCurrency: dowCurrency as DowCurrency,
    };
    const query: SendRepositoryAdminInviteQuery = {};

    setIsSubmitting(true);
    try {
      const result = await adminBackendAPI.sendRepositoryAdminInvite(body, query);
      if (result instanceof ApiError) {
        setError(`${result.statusCode}: ${result.message}`);
      } else {
        setError(null);
        setFormData(emptyFormData);
        setSuccess(true);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <div className="flex flex-col items-center justify-center pb-52">
        <div className="mt-20 py-5 px-3">
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">Invite a Repository Admin</h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={handleLocalAuthentication}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="text"
                name="name"
                placeholder="User Name"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={formData.name}
                onChange={handleInputChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="githubOwnerLogin"
                placeholder="GitHub Owner Login"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={formData.githubOwnerLogin}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="repositoryOwnerLogin"
                placeholder="Repository Owner Login"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={formData.repositoryOwnerLogin}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="repositoryName"
                placeholder="Repository Name"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={formData.repositoryName}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="dowRate"
                placeholder="DOW Rate"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={formData.dowRate}
                onChange={handleInputChange}
                required
              />

              <select
                name="dowCurrency"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={formData.dowCurrency}
                onChange={handleInputChange}
              >
                {Object.values(DowCurrency).map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>

              <button type="submit" className="sm:px-14 px-[20px] py-3 findbutton cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? "Inviting..." : "Invite User"}
              </button>
            </form>

            {error && <p className="text-red-500 mt-3">Error: {error}</p>}

            {success && <h2 className="text-white text-[30px] font-medium">Success</h2>}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
