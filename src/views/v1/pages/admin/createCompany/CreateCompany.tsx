import React, { useState } from "react";
import { PageWrapper } from "src/views/v1/pages/PageWrapper";
import { ApiError } from "src/utils/error/ApiError";
import { adminHooks } from "src/api";
import { useZodForm } from "src/views/components/ui/forms/rhf";
import { createCompanySchema, CreateCompanyFormData } from "src/views/components/ui/forms/schemas";
import { CreateCompanyResponse } from "src/services";

interface CreateCompanyProps {}

export function CreateCompany(_props: CreateCompanyProps) {
  const [error, setError] = useState<string | null>(null);
  const [createdCompanyId, setCreatedCompanyId] = useState<string | null>(null);

  const createCompany = adminHooks.useCreateCompanyMutation();

  const form = useZodForm(createCompanySchema, {
    defaultValues: {
      name: "",
      taxId: "",
      addressId: "",
    },
  });

  const onSubmit = async (data: CreateCompanyFormData) => {
    setError(null);
    try {
      const result: CreateCompanyResponse = await createCompany.mutateAsync({
        body: {
          name: data.name,
          taxId: data.taxId || undefined,
          addressId: data.addressId || undefined,
        },
        query: {},
      });
      setCreatedCompanyId(result.company.id);
      form.reset();
    } catch (error) {
      const apiError = error instanceof ApiError ? error : ApiError.from(error);
      setError(`${apiError.statusCode}: ${apiError.message}`);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        <div className="mt-20 py-5 px-3">
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">Fund a Company</h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="text"
                placeholder="Name"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-sm mb-2">{form.formState.errors.name.message}</p>
              )}

              <input
                type="text"
                placeholder="Tax Id"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("taxId")}
              />

              <input
                type="text"
                placeholder="Address Id"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("addressId")}
              />

              <button
                type="submit"
                className="sm:px-14 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer"
              >
                Create Company
              </button>
            </form>

            {createdCompanyId && (
              <h2 className="text-white text-[30px] font-medium mt-5">{`Created Company Id: ${createdCompanyId}`}</h2>
            )}

            {error && <p className="text-red-500 mt-3">Error: {error}</p>}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
