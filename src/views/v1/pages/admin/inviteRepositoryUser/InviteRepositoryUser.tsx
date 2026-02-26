import React, { useState } from "react";
import { PageWrapper } from "src/views/v1/pages/PageWrapper";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { adminHooks } from "src/api";
import { useZodForm } from "src/views/components/ui/forms/rhf";
import { inviteRepositoryUserSchema, InviteRepositoryUserFormData } from "src/views/components/ui/forms/schemas";

export function InviteRepositoryUser() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const sendRepositoryRoleInvite = adminHooks.useSendRepositoryRoleInviteMutation();

  const form = useZodForm(inviteRepositoryUserSchema, {
    defaultValues: {
      name: "",
      email: "",
      sendEmail: true,
      githubOwnerLogin: "",
      repositoryOwnerLogin: "",
      repositoryName: "",
      rate: "",
      currency: "",
    },
  });

  const onSubmit = async (data: InviteRepositoryUserFormData) => {
    setError(null);
    try {
      await sendRepositoryRoleInvite.mutateAsync({
        params: {},
        body: {
          userName: data.name || "",
          userEmail: data.email,
          sendEmail: String(data.sendEmail),
          userGithubOwnerLogin: data.githubOwnerLogin,
          repositoryId: JSON.stringify({
            ownerId: { login: data.repositoryOwnerLogin },
            name: data.repositoryName,
          } as dto.RepositoryId),
          repositoryUserRole: "admin",
          rate: data.rate ? String(Number(data.rate)) : "",
          currency: data.currency || "",
        },
        query: {},
      });
      setError(null);
      form.reset();
      setSuccess(true);
    } catch (error) {
      const apiError = error instanceof ApiError ? error : ApiError.from(error);
      setError(`${apiError.statusCode}: ${apiError.message}`);
    }
  };

  const formErrors = form.formState.errors;
  const sendEmail = form.watch("sendEmail");

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        <div className="mt-20 py-5 px-3">
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">Invite a Repository Admin</h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="text"
                placeholder="User Name (optional)"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("name")}
              />

              <input
                type="email"
                placeholder="Email"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("email")}
                required={sendEmail}
              />
              {formErrors.email && <p className="text-red-500 text-sm mb-2">{formErrors.email.message}</p>}

              <div className="w-[100%] sm:w-[400px] flex items-center mb-4">
                <input
                  type="checkbox"
                  id="sendEmail"
                  className="mr-2 h-4 w-4 text-blue-600 bg-[#202F45] border-0"
                  checked={sendEmail}
                  onChange={(e) =>
                    form.setValue("sendEmail", e.target.checked, { shouldValidate: form.formState.isSubmitted })
                  }
                />
                <label htmlFor="sendEmail" className="text-white">
                  Send email invitation
                </label>
              </div>

              <input
                type="text"
                placeholder="GitHub Owner Login"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("githubOwnerLogin")}
              />
              {formErrors.githubOwnerLogin && (
                <p className="text-red-500 text-sm mb-2">{formErrors.githubOwnerLogin.message}</p>
              )}

              <input
                type="text"
                placeholder="Repository Owner Login"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("repositoryOwnerLogin")}
              />
              {formErrors.repositoryOwnerLogin && (
                <p className="text-red-500 text-sm mb-2">{formErrors.repositoryOwnerLogin.message}</p>
              )}

              <input
                type="text"
                placeholder="Repository Name"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("repositoryName")}
              />
              {formErrors.repositoryName && (
                <p className="text-red-500 text-sm mb-2">{formErrors.repositoryName.message}</p>
              )}

              <input
                type="number"
                placeholder="DOW Rate"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("rate")}
                min="0"
                step="any"
              />
              {formErrors.rate && <p className="text-red-500 text-sm mb-2">{formErrors.rate.message}</p>}

              <select
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("currency")}
              >
                <option value="">Select Currency</option>
                {Object.values(dto.Currency).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="sm:px-14 px-[20px] py-3 findbutton cursor-pointer disabled:opacity-50"
                disabled={sendRepositoryRoleInvite.isPending}
              >
                {sendRepositoryRoleInvite.isPending ? "Inviting..." : "Invite User"}
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
