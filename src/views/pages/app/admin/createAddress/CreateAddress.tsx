import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { getAdminBackendAPI } from "src/services/AdminBackendAPI";
import { CreateAddressBody, CreateAddressQuery } from "src/dtos";
import { AddressId } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";

interface CreateAddressProps {}

export function CreateAddress(props: CreateAddressProps) {
  const adminBackendAPI = getAdminBackendAPI();

  const [error, setError] = useState<string | null>(null);
  const [createdAddressId, setCreatedAddressId] = useState<AddressId | null>(null);
  const [name, setName] = useState<string>("");
  const [line1, setLine1] = useState<string>("");
  const [line2, setLine2] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const body: CreateAddressBody = {
      name: name || undefined,
      line1: line1 || undefined,
      line2: line2 || undefined,
      city: city || undefined,
      state: state || undefined,
      postalCode: postalCode || undefined,
      country: country || undefined,
    };

    const query: CreateAddressQuery = {};

    try {
      const result = await adminBackendAPI.createAddress(body, query);
      if (result instanceof ApiError) {
        setError(`${result.statusCode}: ${result.message}`);
      } else {
        setCreatedAddressId(result.createdAddressId);
        // Reset form fields
        setName("");
        setLine1("");
        setLine2("");
        setCity("");
        setState("");
        setPostalCode("");
        setCountry("");
      }
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
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
              onSubmit={handleSubmit}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="text"
                placeholder="Name"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={name}
                onChange={handleInputChange(setName)}
              />
              <input
                type="text"
                placeholder="Line 1"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={line1}
                onChange={handleInputChange(setLine1)}
              />
              <input
                type="text"
                placeholder="Line 2"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={line2}
                onChange={handleInputChange(setLine2)}
              />
              <input
                type="text"
                placeholder="City"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={city}
                onChange={handleInputChange(setCity)}
              />
              <input
                type="text"
                placeholder="State"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={state}
                onChange={handleInputChange(setState)}
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={postalCode}
                onChange={handleInputChange(setPostalCode)}
              />
              <input
                type="text"
                placeholder="Country"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={country}
                onChange={handleInputChange(setCountry)}
                required
              />

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
