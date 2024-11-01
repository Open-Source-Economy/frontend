import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { getAdminBackendAPI } from "src/services/AdminBackendAPI";
import { CreateCompanyBody, CreateCompanyQuery } from "src/dtos";
import { AddressId, CompanyId } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";

interface CreateCompanyProps {}

export function CreateCompany(props: CreateCompanyProps) {
  const adminBackendAPI = getAdminBackendAPI();

  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [taxId, setTaxId] = useState<string | null>(null);
  const [addressId, setAddressId] = useState<string | null>(null);
  const [createdCompanyId, setCreatedCompanyId] = useState<CompanyId | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTaxIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaxId(event.target.value);
  };

  const handleAddressIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (name === null) {
      setError("name is required");
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const body: CreateCompanyBody = {
      taxId,
      name,
      addressId: addressId ? new AddressId(addressId) : null,
    };

    const query: CreateCompanyQuery = {};

    try {
      const result = await adminBackendAPI.createCompany(body, query);
      if (result instanceof ApiError) {
        setError(`${result.statusCode}: ${result.message}`);
      } else {
        setError(null);
        setCreatedCompanyId(result.createdCompanyId);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        <div className="mt-20 py-5 px-3">
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">Fund a Company</h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={handleSubmit}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="text"
                placeholder="Name"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={name ?? ""}
                onChange={handleNameChange}
                required
              />

              <input
                type="text"
                placeholder="Tax Id"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={taxId ?? ""}
                onChange={handleTaxIdChange}
              />

              <input
                type="text"
                placeholder="Address Id"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={addressId ?? ""}
                onChange={handleAddressIdChange}
              />

              <button type="submit" className="sm:px-14 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer">
                Create Company
              </button>
            </form>

            {createdCompanyId && <h2 className="text-white text-[30px] font-medium mt-5">{`Created Company Id: ${createdCompanyId.uuid}`}</h2>}

            {error && <p className="text-red-500 mt-3">Error: {error}</p>}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
