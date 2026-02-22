import React, { useState } from "react";
import { PageWrapper } from "src/views/v1/pages/PageWrapper";
import { AddressId } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { adminHooks } from "src/api";
import { useZodForm } from "src/views/components/ui/forms/rhf";
import { createAddressSchema, CreateAddressFormData } from "src/views/components/ui/forms/schemas";

interface CreateAddressProps {}

export function CreateAddress(_props: CreateAddressProps) {
  const [error, setError] = useState<string | null>(null);
  const [createdAddressId, setCreatedAddressId] = useState<AddressId | null>(null);

  const createAddress = adminHooks.useCreateAddressMutation();

  const form = useZodForm(createAddressSchema, {
    defaultValues: {
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  });

  const onSubmit = async (data: CreateAddressFormData) => {
    setError(null);
    try {
      const result = await createAddress.mutateAsync({
        body: {
          name: data.name || undefined,
          line1: data.line1 || undefined,
          line2: data.line2 || undefined,
          city: data.city || undefined,
          state: data.state || undefined,
          postalCode: data.postalCode || undefined,
          country: data.country || undefined,
        },
        query: {},
      });
      setCreatedAddressId(result.createdAddressId);
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
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">
            Admin
            <br />
            <span className="text-[#FF7E4B]">Create an Address</span>
          </h1>
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
              <input
                type="text"
                placeholder="Line 1"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("line1")}
              />
              <input
                type="text"
                placeholder="Line 2"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("line2")}
              />
              <input
                type="text"
                placeholder="City"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("city")}
              />
              <input
                type="text"
                placeholder="State"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("state")}
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("postalCode")}
              />
              <input
                type="text"
                placeholder="Country"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("country")}
              />
              {form.formState.errors.country && <p className="text-red-500 text-sm mb-2">{form.formState.errors.country.message}</p>}

              <button type="submit" className="sm:px-14 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer">
                Create Address
              </button>
            </form>

            {createdAddressId && <h2 className="text-white text-[30px] font-medium mt-5">{`Created Address Id: ${createdAddressId.uuid.toString()}`}</h2>}

            {error && <p className="text-red-500 mt-3">Error: {error}</p>}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
