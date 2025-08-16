import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { SendRepositoryRoleInviteBody, SendRepositoryRoleInviteParams, SendRepositoryRoleInviteQuery } from "@open-source-economy/api-types";
import { Currency, OwnerId, RepositoryId, RepositoryUserRole } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { getAdminBackendAPI } from "src/services/AdminBackendAPI";

interface FormData {
  name: string;
  email: string;
  sendEmail: boolean;
  githubOwnerLogin: string;
  repositoryOwnerLogin: string;
  repositoryName: string;
  rate: string;
  currency: Currency | undefined;
}

const emptyFormData: FormData = {
  name: "",
  email: "",
  sendEmail: true,
  githubOwnerLogin: "",
  repositoryOwnerLogin: "",
  repositoryName: "",
  rate: "",
  currency: undefined,
};

export function InviteRepositoryUser() {
  const adminBackendAPI = getAdminBackendAPI();
  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): string | null => {
    if (formData.sendEmail && !formData.email) return "Email is required when Send Email is enabled";
    if (!formData.githubOwnerLogin) return "GitHub Owner Login is required";
    if (!formData.repositoryOwnerLogin) return "Repository Owner Login is required";
    if (!formData.repositoryName) return "Repository Name is required";

    // Either both dowRate and dowCurrency should be provided, or neither
    const hasRate = formData.rate !== "";
    const hasCurrency = formData.currency !== undefined;

    if (hasRate !== hasCurrency) {
      return "Both DOW Rate and Currency must be provided together";
    }

    if (hasRate) {
      const dowRateNumber = Number(formData.rate);
      if (isNaN(dowRateNumber) || dowRateNumber <= 0) {
        return "DOW Rate must be a positive number";
      }
    }

    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const params: SendRepositoryRoleInviteParams = {};
    const body: SendRepositoryRoleInviteBody = {
      userName: formData.name || null,
      userEmail: formData.email,
      sendEmail: formData.sendEmail,
      userGithubOwnerLogin: formData.githubOwnerLogin,
      repositoryId: new RepositoryId(new OwnerId(formData.repositoryOwnerLogin), formData.repositoryName),
      repositoryUserRole: RepositoryUserRole.ADMIN,
      rate: formData.rate ? Number(formData.rate) : undefined,
      currency: formData.currency,
    };
    const query: SendRepositoryRoleInviteQuery = {};

    setIsSubmitting(true);
    try {
      const result = await adminBackendAPI.sendRepositoryRoleInvite(params, body, query);
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
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        <div className="mt-20 py-5 px-3">
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">Invite a Repository Admin</h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={handleSubmit}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="text"
                name="name"
                placeholder="User Name (optional)"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                value={formData.name}
                onChange={handleInputChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                value={formData.email}
                onChange={handleInputChange}
                required={formData.sendEmail}
              />

              <div className="w-[100%] sm:w-[400px] flex items-center mb-4">
                <input
                  type="checkbox"
                  name="sendEmail"
                  id="sendEmail"
                  className="mr-2 h-4 w-4 text-blue-600 bg-[#202F45] border-0"
                  checked={formData.sendEmail}
                  onChange={e => setFormData(prev => ({ ...prev, sendEmail: e.target.checked }))}
                />
                <label htmlFor="sendEmail" className="text-white">
                  Send email invitation
                </label>
              </div>

              <input
                type="text"
                name="githubOwnerLogin"
                placeholder="GitHub Owner Login"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                value={formData.githubOwnerLogin}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="repositoryOwnerLogin"
                placeholder="Repository Owner Login"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                value={formData.repositoryOwnerLogin}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="repositoryName"
                placeholder="Repository Name"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                value={formData.repositoryName}
                onChange={handleInputChange}
                required
              />

              <input
                type="number"
                name="dowRate"
                placeholder="DOW Rate"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                value={formData.rate}
                onChange={handleInputChange}
                min="0"
                step="any"
              />

              <select
                name="dowCurrency"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                value={formData.currency || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Currency</option>
                {Object.values(Currency).map(currency => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>

              <button type="submit" className="sm:px-14 px-[20px] py-3 findbutton cursor-pointer disabled:opacity-50" disabled={isSubmitting}>
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
