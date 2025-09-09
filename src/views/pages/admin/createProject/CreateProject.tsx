import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import * as dto from "@open-source-economy/api-types";
import { ProjectEcosystem } from "@open-source-economy/api-types";
import { ApiError } from "src/ultils/error/ApiError";
import { getAdminBackendAPI } from "src/services/AdminBackendAPI";

interface FormData {
  owner: string;
  repo?: string;
  projectEcosystem?: ProjectEcosystem;
}

interface BulkFormData {
  githubUrls: string;
  projectEcosystem?: ProjectEcosystem;
}

const emptyFormData: FormData = {
  owner: "",
  repo: "",
  projectEcosystem: undefined,
};

const emptyBulkFormData: BulkFormData = {
  githubUrls: "",
  projectEcosystem: undefined,
};

export function CreateProject() {
  const adminBackendAPI = getAdminBackendAPI();

  const [formData, setFormData] = useState<FormData>(emptyFormData);
  const [bulkFormData, setBulkFormData] = useState<BulkFormData>(emptyBulkFormData);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBulkInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setBulkFormData(prev => ({ ...prev, [name]: value }));
  };

  const parseGithubUrls = (urls: string): Array<{ owner: string; repo?: string }> => {
    return urls
      .split(",")
      .map(url => url.trim())
      .filter(url => url.length > 0)
      .map(url => {
        // Remove trailing slash if present
        const cleanUrl = url.replace(/\/$/, "");

        // Match GitHub URL pattern
        const match = cleanUrl.match(/github\.com\/([^\/]+)(?:\/([^\/]+))?/);

        if (match) {
          const [, owner, repo] = match;
          return { owner, repo: repo || undefined };
        }

        throw new Error(`Invalid GitHub URL: ${url}`);
      });
  };

  const validateForm = (): string | null => {
    if (!formData.owner) return "Repository Owner Login is required";
    return null;
  };

  const validateBulkForm = (): string | null => {
    if (!bulkFormData.githubUrls.trim()) return "GitHub URLs are required";

    try {
      parseGithubUrls(bulkFormData.githubUrls);
      return null;
    } catch (error) {
      return error instanceof Error ? error.message : "Invalid GitHub URLs";
    }
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
    setError(null);
    setSuccess(false);

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

  const handleBulkSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateBulkForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const projects = parseGithubUrls(bulkFormData.githubUrls);
      const results = [];

      for (const project of projects) {
        const params: dto.CreateProjectParams = {
          owner: project.owner,
          repo: project.repo,
        };
        const body: dto.CreateProjectBody = {
          projectEcosystem: bulkFormData.projectEcosystem,
        };
        const query: dto.CreateProjectQuery = {};

        try {
          const result = await adminBackendAPI.createProject(params, body, query);
          if (result instanceof ApiError) {
            results.push(`❌ ${project.owner}${project.repo ? `/${project.repo}` : ""}: ${result.statusCode} - ${result.message}`);
          } else {
            results.push(`✅ ${project.owner}${project.repo ? `/${project.repo}` : ""}: Created successfully`);
          }
        } catch (error) {
          results.push(`❌ ${project.owner}${project.repo ? `/${project.repo}` : ""}: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
      }

      // Show results summary
      const successCount = results.filter(r => r.startsWith("✅")).length;
      const failureCount = results.filter(r => r.startsWith("❌")).length;

      if (failureCount > 0) {
        setError(`Completed with ${successCount} successes and ${failureCount} failures:\n${results.join("\n")}`);
      } else {
        setBulkFormData(emptyBulkFormData);
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
          <h1 className="lg:text-[62px] text-[30px] text-center font-medium text-white">Add Project</h1>

          {/* Tab Navigation */}
          <div className="pt-12 flex justify-center">
            <div className="bg-[#14233A] rounded-lg p-1 flex">
              <button
                onClick={() => {
                  setActiveTab("single");
                  setError(null);
                  setSuccess(false);
                }}
                className={`px-6 py-2 rounded-md transition-colors ${activeTab === "single" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                Single Project
              </button>
              <button
                onClick={() => {
                  setActiveTab("bulk");
                  setError(null);
                  setSuccess(false);
                }}
                className={`px-6 py-2 rounded-md transition-colors ${activeTab === "bulk" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
              >
                Bulk Import
              </button>
            </div>
          </div>

          <div className="pt-12 flex justify-center flex-wrap gap-4">
            {activeTab === "single" ? (
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
                />

                <select
                  name="projectEcosystem"
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

                <button
                  type="submit"
                  className="sm:px-14 px-[20px] py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Project"}
                </button>

                {error && <p className="text-red-500 mt-4 text-center whitespace-pre-line">{error}</p>}
                {success && <p className="text-green-500 mt-4 text-center font-medium">Project created successfully!</p>}
              </form>
            ) : (
              <form
                onSubmit={handleBulkSubmit}
                className="bg-[#14233A] rounded-3xl flex items-center justify-center flex-col mt-5 py-10 xs:w-[540px] w-[350px] sm:w-[600px]"
              >
                <div className="w-[100%] sm:w-[500px] mb-4">
                  <label className="block text-white text-sm font-medium mb-2">GitHub URLs (comma-separated)</label>
                  <textarea
                    name="githubUrls"
                    placeholder="https://github.com/apache/plc4x, https://github.com/apache, https://github.com/owner/repo"
                    className="w-full h-32 border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 resize-none"
                    value={bulkFormData.githubUrls}
                    onChange={handleBulkInputChange}
                    required
                  />
                  <p className="text-gray-400 text-xs mt-1">Supported formats: https://github.com/owner/repo or https://github.com/owner</p>
                </div>

                <select
                  name="projectEcosystem"
                  className="w-[100%] sm:w-[500px] border-0 outline-none bg-[#202F45] text-[#ffffff] text-base rounded-lg px-3 py-3 mb-4"
                  value={bulkFormData.projectEcosystem || ""}
                  onChange={handleBulkInputChange}
                >
                  <option value="">Select Ecosystem (Optional)</option>
                  {Object.values(ProjectEcosystem).map(ecosystem => (
                    <option key={ecosystem} value={ecosystem}>
                      {ecosystem}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="sm:px-14 px-[20px] py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Projects..." : "Create Projects"}
                </button>

                {error && <p className="text-red-500 mt-4 text-center whitespace-pre-line text-sm max-w-[500px]">{error}</p>}
                {success && <p className="text-green-500 mt-4 text-center font-medium">All projects created successfully!</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
