import React from "react";
import { Link } from "react-router-dom";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { AdminPath, BaseURL } from "src/App";

interface AdminHomeProps {}

export function AdminHome() {
  return (
    <PageWrapper baseURL={BaseURL.APP}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#14233A]">
        <h1 className="text-white text-3xl font-semibold mb-8 mt-12">Admin Dashboard</h1>

        <div className="flex flex-col gap-4">
          <Link to={AdminPath.INVITE_COMPANY_USER} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Invite Company User
          </Link>

          <Link to={AdminPath.INVITE_REPOSITORY_USER} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Invite Repository User
          </Link>

          <Link to={AdminPath.CREATE_COMPANY} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Create Company
          </Link>

          <Link to={AdminPath.CREATE_ADDRESS} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Create Address
          </Link>

          <Link to={AdminPath.CREATE_MANUAL_INVOICE} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Create Manual Invoice
          </Link>

          <Link to={AdminPath.CREATE_PRODUCT_AND_PRICE} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Create Product & Price
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
