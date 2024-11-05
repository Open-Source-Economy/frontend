import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { getAdminBackendAPI } from "src/services/AdminBackendAPI";
import { CreateManualInvoiceBody, CreateManualInvoiceQuery } from "src/dtos";
import { CompanyId, UserId } from "src/model";
import { ApiError } from "src/ultils/error/ApiError";
import Decimal from "decimal.js";

interface CreateManualInvoiceProps {}

export function CreateManualInvoice(props: CreateManualInvoiceProps) {
  const adminBackendAPI = getAdminBackendAPI();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [invoiceNumber, setInvoiceNumber] = useState<number | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [paid, setPaid] = useState<boolean>(false);
  const [dowAmount, setDowAmount] = useState<number | null>(null);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.value ? event.target.value : null);
  };

  const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<boolean>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setter(event.target.checked);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    let missingFields = [];
    if (invoiceNumber === null) missingFields.push("Invoice Number");
    if ((companyId === null && userId === null) || (companyId !== null && userId !== null))
      missingFields.push("Either Company ID or User ID must be defined, but not both");
    if (dowAmount === null) missingFields.push("DOW Amount");
    if (missingFields.length > 0) {
      setError(`Please fill in the following required fields: ${missingFields.join(", ")}`);
      return;
    }

    const body: CreateManualInvoiceBody = {
      number: invoiceNumber!, // TODO: do something else ugly here
      companyId: companyId !== null ? new CompanyId(companyId) : undefined,
      userId: userId !== null ? new UserId(userId) : undefined,
      paid: paid!,
      dowAmount: new Decimal(dowAmount!),
    };

    const query: CreateManualInvoiceQuery = {};

    try {
      const result = await adminBackendAPI.createManualInvoice(body, query);
      if (result instanceof ApiError) {
        setError(`${result.statusCode}: ${result.message}`);
      } else {
        setSuccess(true);
        // Reset form fields
        setInvoiceNumber(null);
        setCompanyId(null);
        setUserId(null);
        setPaid(false);
        setDowAmount(null);
      }
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
            <span className="text-[#FF7E4B]">Create Manual Invoice</span>
          </h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={handleSubmit}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="number"
                placeholder="Invoice Number"
                name="invoiceNumber"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={invoiceNumber ?? ""}
                onChange={handleInputChange(setInvoiceNumber)}
                required
              />
              <input
                type="text"
                placeholder="Company ID (optional)"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={companyId ?? ""}
                onChange={handleInputChange(setCompanyId)}
              />
              <input
                type="text"
                placeholder="User ID (optional)"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={userId ?? ""}
                onChange={handleInputChange(setUserId)}
              />
              <div className="w-full sm:w-[400px] flex items-center mb-4">
                <input type="checkbox" id="paid" checked={paid} onChange={handleCheckboxChange(setPaid)} className="mr-3" />
                <label htmlFor="paid" className="text-white">
                  Paid
                </label>
              </div>
              <input
                type="number"
                placeholder="DOW Amount"
                className="w-full sm:w-[400px] border-0 outline-none bg-[#202F45] text-white text-base rounded-lg px-3 py-3 mb-4"
                value={dowAmount ?? ""}
                onChange={handleInputChange(setDowAmount)}
                required
              />
              <button type="submit" className="sm:px-14 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg cursor-pointer">
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
