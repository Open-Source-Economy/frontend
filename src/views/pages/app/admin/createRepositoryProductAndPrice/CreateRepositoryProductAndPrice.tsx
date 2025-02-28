import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { ApiError } from "src/ultils/error/ApiError";
import { getAdminBackendAPI } from "src/services/AdminBackendAPI";

import { CreateProductAndPriceBody, CreateProductAndPriceParams, CreateProductAndPriceQuery } from "src/dtos";

interface CreateRepositoryProductAndPriceProps {}

export function CreateRepositoryProductAndPrice(props: CreateRepositoryProductAndPriceProps) {
  const adminBackendAPI = getAdminBackendAPI();

  const emptyFormData = {
    owner: "",
    repo: "",
  };

  const [formData, setFormData] = useState(emptyFormData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const { owner, repo } = formData;

    if (!owner) {
      setError("Owner is required.");
      return;
    }

    const body: CreateProductAndPriceBody = {};
    const params: CreateProductAndPriceParams = {
      owner,
      repo: repo ?? undefined,
    };
    const query: CreateProductAndPriceQuery = {};

    setIsSubmitting(true);
    try {
      const result = await adminBackendAPI.createProductAndPrice(body, params, query);

      if (result instanceof ApiError) {
        setError(`${result.statusCode}: ${result.message}`);
      } else {
        setError(null);
        setSuccess(true);
        setFormData(emptyFormData);
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
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">Create Product & Price</h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={handleFormSubmit}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="text"
                name="owner"
                placeholder="Repository Owner (org/user)"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={formData.owner}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="repo"
                placeholder="Repository Name"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3"
                value={formData.repo}
                onChange={handleInputChange}
              />

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
