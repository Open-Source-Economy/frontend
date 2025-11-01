import React from "react";
import { Link } from "react-router-dom";
import { PageWrapper } from "src/views/v1/pages/PageWrapper";
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

        <div className="mt-8">
          <h2 className="text-white text-xl font-semibold mb-4">View User Onboarding</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const username = formData.get("username") as string;
              if (username) {
                window.location.href = paths.ADMIN.USER_ONBOARDING(username);
              }
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              name="username"
              placeholder="Enter GitHub username"
              className="flex-1 px-4 py-2 rounded bg-[#1A2B45] text-white border border-brand-neutral-700 focus:outline-none focus:border-brand-accent"
              required
            />
            <button type="submit" className="bg-brand-accent hover:bg-brand-accent-dark text-white py-2 px-6 rounded">
              View Profile
            </button>
          </form>
        </div>
      </div>
    </PageWrapper>
  );
}
