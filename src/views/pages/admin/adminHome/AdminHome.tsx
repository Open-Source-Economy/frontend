import React from "react";
import { Link } from "react-router-dom";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { paths } from "src/paths";

export function AdminHome() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#14233A]">
        <h1 className="text-white text-3xl font-semibold mb-8 mt-12">Admin Dashboard</h1>

        <div className="flex flex-col gap-4">
          <Link to={paths.ADMIN.CREATE_PROJECT} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Add Project
          </Link>

          <Link to={paths.ADMIN.INVITE_COMPANY_USER} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Invite Company User
          </Link>

          <Link to={paths.ADMIN.INVITE_REPOSITORY_USER} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Invite Repository User
          </Link>

          <Link to={paths.ADMIN.CREATE_COMPANY} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Create Company
          </Link>

          <Link to={paths.ADMIN.CREATE_ADDRESS} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Create Address
          </Link>

          <Link to={paths.ADMIN.CREATE_MANUAL_INVOICE} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Create Manual Invoice
          </Link>

          <Link to={paths.ADMIN.CREATE_CAMPAIGN_PRODUCT_AND_PRICE} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Create Campaign Product & Price
          </Link>

          <Link to={paths.ADMIN.CREATE_PLAN_PRODUCT_AND_PRICE} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Create Plan Product & Price
          </Link>

          <Link to={paths.ADMIN.SYNC_GITHUB} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center">
            Sync GitHub Data
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
