import React, { useState } from "react";
import { PageWrapper } from "src/views/v1/pages/PageWrapper";
import { ApiError } from "src/utils/error/ApiError";
import { adminHooks } from "src/api";
import { useZodForm } from "src/views/components/ui/forms/rhf";
import { createManualInvoiceSchema, CreateManualInvoiceFormData } from "src/views/components/ui/forms/schemas";

interface CreateManualInvoiceProps {}

export function CreateManualInvoice(_props: CreateManualInvoiceProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const createManualInvoice = adminHooks.useCreateManualInvoiceMutation();

  const form = useZodForm(createManualInvoiceSchema, {
    defaultValues: {
      invoiceNumber: "",
      companyId: "",
      userId: "",
      paid: false,
      creditAmount: "",
    },
  });

  const onSubmit = async (data: CreateManualInvoiceFormData) => {
    setError(null);
    try {
      await createManualInvoice.mutateAsync({
        body: {
          number: Number(data.invoiceNumber),
          companyId: data.companyId || undefined,
          userId: data.userId || undefined,
          paid: data.paid,
          creditAmount: Number(data.creditAmount),
        },
        query: {},
      });
      setSuccess(true);
      form.reset();
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
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">
            Admin
            <br />
            <span className="text-[#FF7E4B]">Create Manual Invoice</span>
          </h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="number"
                placeholder="Invoice Number"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("invoiceNumber")}
              />
              {formErrors.invoiceNumber && (
                <p className="text-red-500 text-sm mb-2">{formErrors.invoiceNumber.message}</p>
              )}

              <input
                type="text"
                placeholder="Company ID (optional)"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("companyId")}
              />
              {formErrors.companyId && <p className="text-red-500 text-sm mb-2">{formErrors.companyId.message}</p>}

              <input
                type="text"
                placeholder="User ID (optional)"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("userId")}
              />

              <div className="w-full sm:w-[400px] flex items-center mb-4">
                <input
                  type="checkbox"
                  id="paid"
                  checked={form.watch("paid")}
                  onChange={(e) => form.setValue("paid", e.target.checked)}
                  className="mr-3"
                />
                <label htmlFor="paid" className="text-white">
                  Paid
                </label>
              </div>

              <input
                type="number"
                placeholder="Credit Amount"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                {...form.register("creditAmount")}
              />
              {formErrors.creditAmount && (
                <p className="text-red-500 text-sm mb-2">{formErrors.creditAmount.message}</p>
              )}

              <button
                type="submit"
                className="sm:px-14 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer"
              >
                Create Manual Invoice
              </button>
            </form>

            {error && <p className="text-red-500 mt-3">Error: {error}</p>}

            {success && <p className="mt-3">Success</p>}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
