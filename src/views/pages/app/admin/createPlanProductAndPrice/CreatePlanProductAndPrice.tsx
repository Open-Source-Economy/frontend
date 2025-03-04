import React, { useState } from "react";
import { getAdminBackendAPI } from "../../../../../services/AdminBackendAPI";
import * as dto from "../../../../../api/dto";
import { ApiError } from "../../../../../ultils/error/ApiError";
import { PageWrapper } from "../../../PageWrapper";

interface CreatePlanProductAndPriceProps {}

export function CreatePlanProductAndPrice(props: CreatePlanProductAndPriceProps) {
  const adminBackendAPI = getAdminBackendAPI();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const body: dto.CreatePlanProductAndPriceBody = {};
    const params: dto.CreatePlanProductAndPriceParams = {};
    const query: dto.CreatePlanProductAndPriceQuery = {};

    setIsSubmitting(true);
    try {
      const result = await adminBackendAPI.createPlanProductAndPrice(body, params, query);

      if (result instanceof ApiError) {
        setError(`${result.statusCode}: ${result.message}`);
      } else {
        setError(null);
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
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
              <button type="submit" className="sm:px-14 px-[20px] py-3 findbutton cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Product & Price"}
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
