import React, { useState } from "react";
import * as dto from "@open-source-economy/api-types";
import { ApiError } from "../../../../../ultils/error/ApiError";
import { PageWrapper } from "../../PageWrapper";
import { adminHooks } from "src/api";

interface CreatePlanProductAndPriceProps {}

export function CreatePlanProductAndPrice(props: CreatePlanProductAndPriceProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const createPlanProductAndPrice = adminHooks.useCreatePlanProductAndPriceMutation();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const body: dto.CreatePlanProductAndPriceBody = {};
    const params: dto.CreatePlanProductAndPriceParams = {};
    const query: dto.CreatePlanProductAndPriceQuery = {};

    try {
      await createPlanProductAndPrice.mutateAsync({ params, body, query });
      setError(null);
      setSuccess(true);
    } catch (error) {
      const apiError = error instanceof ApiError ? error : ApiError.from(error);
      setError(`${apiError.statusCode}: ${apiError.message}`);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        <div className="mt-20 py-5 px-3">
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">Create Plan Product & Price</h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={handleFormSubmit}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <button type="submit" className="sm:px-14 px-[20px] py-3 findbutton cursor-pointer" disabled={createPlanProductAndPrice.isPending}>
                {createPlanProductAndPrice.isPending ? "Creating..." : "Create Product & Price"}
              </button>
            </form>

            {error && <p className="text-red-500 mt-3">Error: {error}</p>}
            {success && <h2 className="text-white text-[30px] font-medium">Success!</h2>}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
