import React from "react";
import { Link } from "@tanstack/react-router";
import { PageWrapper } from "src/views/v1/pages/PageWrapper";

export function AdminHome() {
  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#14233A]">
        <h1 className="text-white text-3xl font-semibold mb-8 mt-12">Admin Dashboard</h1>

        <div className="flex flex-col gap-4">
          <Link to="/admin/project" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center">
            Add Project
          </Link>

          <Link
            to="/admin/invite-company-user"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
          >
            Invite Company User
          </Link>

          <Link
            to="/admin/invite-repository-user"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
          >
            Invite Repository User
          </Link>

          <Link
            to="/admin/create-company"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
          >
            Create Company
          </Link>

          <Link
            to="/admin/create-address"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
          >
            Create Address
          </Link>

          <Link
            to="/admin/create-manual-invoice"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
          >
            Create Manual Invoice
          </Link>

          <Link
            to="/admin/campaign/create-product-and-price"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
          >
            Create Campaign Product & Price
          </Link>

          <Link
            to="/admin/plan/create-product-and-price"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
          >
            Create Plan Product & Price
          </Link>

          <Link
            to="/admin/maintainers"
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded text-center"
          >
            View Maintainers
          </Link>

          <Link
            to="/admin/organizations/sync"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center"
          >
            Sync Owner Repositories
          </Link>

          <Link
            to="/admin/repositories/sync"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
          >
            Sync Repositories
          </Link>

          <Link
            to={"/admin/sync-github" as string}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded text-center"
          >
            Sync GitHub Data
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
