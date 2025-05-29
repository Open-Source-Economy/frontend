import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import * as dto from "src/api/dto";
import { ProjectEcosystem } from "src/api/model";
import { ApiError } from "src/ultils/error/ApiError";
import { getAdminBackendAPI } from "src/services/AdminBackendAPI";

interface FormData {
  owner: string;
  repo?: string;
  projectEcosystem?: ProjectEcosystem;
}

const emptyFormData: FormData = {
  owner: "",
  repo: "",
  projectEcosystem: undefined,
};

export function CreateProject() {
  const adminBackendAPI = getAdminBackendAPI();

  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): string | null => {
    if (!formData.owner) return "Repository Owner Login is required";
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const params: dto.CreateProjectParams = {
      owner: formData.owner,
      repo: formData.repo,
    };
    const body: dto.CreateProjectBody = {
      projectEcosystem: formData.projectEcosystem,
    };

    const query: dto.CreateProjectQuery = {};

    setIsSubmitting(true);
    try {
      const result = await adminBackendAPI.createProject(params, body, query);
      if (result instanceof ApiError) {
        setError(`${result.statusCode}: ${result.message}`);
      } else {
        setError(null);
        setFormData(emptyFormData);
        setSuccess(true);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center pb-52">
        <div className="mt-20 py-5 px-3">
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">Invite a Repository Admin</h1>
          <div className="pt-24 flex justify-center flex-wrap gap-4">
            <form
              onSubmit={handleSubmit}
              className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[440px] w-[350px] sm:w-[450px]"
            >
              <input
                type="text"
                name="owner"
                placeholder="Repository Owner Login"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                value={formData.owner}
                onChange={handleInputChange}
                required
              />

              <input
                type="text"
                name="repo"
                placeholder="Repository Name"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                value={formData.repo}
                onChange={handleInputChange}
                required
              />

              <select
                name="Project Ecosystem"
                className="w-[100%] sm:w-[400px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                value={formData.projectEcosystem || ""}
                onChange={handleInputChange}
              >
                <option value="">Select Ecosystem</option>
                {Object.values(ProjectEcosystem).map(ecosystem => (
                  <option key={ecosystem} value={ecosystem}>
                    {ecosystem}
                  </option>
                ))}
              </select>

              <button type="submit" className="sm:px-14 px-[20px] py-3 findbutton cursor-pointer disabled:opacity-50" disabled={isSubmitting}>
                {isSubmitting ? "Inviting..." : "Invite User"}
              </button>
            </form>

            {error && <p className="text-red-500 mt-3">Error: {error}</p>}

            {success && <h2 className="text-white text-[30px] font-medium">Success</h2>}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
