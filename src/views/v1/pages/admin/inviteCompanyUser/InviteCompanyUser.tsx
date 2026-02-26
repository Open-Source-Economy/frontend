import React, { useState } from "react";
import { PageWrapper } from "src/views/v1/pages/PageWrapper";
import { ApiError } from "src/ultils/error/ApiError";
import { Audience } from "../../../../Audience";
import { AudienceTitle } from "src/views/v1/components";
import { adminHooks } from "src/api";
import { useZodForm } from "src/views/components/ui/forms/rhf";
import { inviteCompanyUserSchema, InviteCompanyUserFormData } from "src/views/components/ui/forms/schemas";

interface InviteCompanyUserProps {}

export function InviteCompanyUser(_props: InviteCompanyUserProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const sendCompanyRoleInvite = adminHooks.useSendCompanyRoleInviteMutation();

  const form = useZodForm(inviteCompanyUserSchema, {
    defaultValues: {
      name: "",
      email: "",
      companyId: "",
    },
  });

  const onSubmit = async (data: InviteCompanyUserFormData) => {
    setError(null);
    try {
      await sendCompanyRoleInvite.mutateAsync({
        params: {},
        body: {
          userName: data.name,
          userEmail: data.email,
          companyId: data.companyId,
          companyUserRole: "admin",
        },
        query: {},
      });
      form.reset();
      setSuccess(true);
    } catch (error) {
      const apiError = error instanceof ApiError ? error : ApiError.from(error);
      setError(`${apiError.statusCode}: ${apiError.message}`);
    }
  };

  const formErrors = form.formState.errors;

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        <div className="mt-20 py-5 px-3">
          <AudienceTitle audience={Audience.DEVELOPER} whiteText={"Invite "} coloredText={"Company User"} />
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="text"
                placeholder="Company User Name"
                className=" w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                {...form.register("name")}
              />
              {formErrors.name && <p className="text-red-500 text-sm mb-2">{formErrors.name.message}</p>}

              <input
                type="email"
                placeholder="Email"
                className=" w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                {...form.register("email")}
              />
              {formErrors.email && <p className="text-red-500 text-sm mb-2">{formErrors.email.message}</p>}

              <input
                type="text"
                placeholder="Company Id"
                className=" w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                {...form.register("companyId")}
              />
              {formErrors.companyId && <p className="text-red-500 text-sm mb-2">{formErrors.companyId.message}</p>}

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
