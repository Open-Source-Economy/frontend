import React, { useState } from "react";
import { PageWrapper } from "src/views/pages/PageWrapper";
import { getAdminBackendAPI } from "src/services";
import { ApiError } from "src/ultils/error/ApiError";

export function SyncGitHub() {
  const [ownerInput, setOwnerInput] = useState("");
  const [repoInput, setRepoInput] = useState("");
  const [syncType, setSyncType] = useState<"owner" | "repository" | "project">("owner");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const adminAPI = getAdminBackendAPI();

  const handleSync = async () => {
    if (!ownerInput.trim()) {
      setError("Please enter an owner name");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let response;

      switch (syncType) {
        case "owner":
          response = await adminAPI.syncOwner({ owner: ownerInput });
          break;
        case "repository":
          if (!repoInput.trim()) {
            setError("Please enter a repository name");
            setLoading(false);
            return;
          }
          response = await adminAPI.syncRepository({ owner: ownerInput, repo: repoInput });
          break;
        case "project":
          response = await adminAPI.syncProject({
            owner: ownerInput,
            repo: repoInput.trim() || undefined,
          });
          break;
      }

      if (response instanceof ApiError) {
        setError(`Error: ${response.message}`);
      } else {
        setResult(JSON.stringify(response, null, 2));
      }
    } catch (err: any) {
      setError(`Failed to sync: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#14233A] p-8">
        <h1 className="text-white text-3xl font-semibold mb-8">Sync GitHub Data</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
          {/* Sync Type Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Sync Type</label>
            <div className="flex gap-4">
              <label className="flex items-center text-gray-700 cursor-pointer">
                <input type="radio" value="owner" checked={syncType === "owner"} onChange={e => setSyncType(e.target.value as "owner")} className="mr-2" />
                Owner
              </label>
              <label className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  value="repository"
                  checked={syncType === "repository"}
                  onChange={e => setSyncType(e.target.value as "repository")}
                  className="mr-2"
                />
                Repository
              </label>
              <label className="flex items-center text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  value="project"
                  checked={syncType === "project"}
                  onChange={e => setSyncType(e.target.value as "project")}
                  className="mr-2"
                />
                Project
              </label>
            </div>
          </div>

          {/* Owner Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Owner (GitHub username or organization)</label>
            <input
              type="text"
              value={ownerInput}
              onChange={e => setOwnerInput(e.target.value)}
              placeholder="e.g., Open-Source-Economy"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            />
          </div>

          {/* Repository Input (conditional) */}
          {(syncType === "repository" || syncType === "project") && (
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Repository {syncType === "project" && "(optional)"}</label>
              <input
                type="text"
                value={repoInput}
                onChange={e => setRepoInput(e.target.value)}
                placeholder="e.g., web2-backend"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
              />
            </div>
          )}

          {/* Sync Button */}
          <button
            onClick={handleSync}
            disabled={loading}
            className={`w-full py-3 rounded font-semibold text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
          >
            {loading ? "Syncing..." : "Sync"}
          </button>

          {/* Error Display */}
          {error && <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

          {/* Result Display */}
          {result && (
            <div className="mt-4">
              <h3 className="text-gray-700 font-semibold mb-2">Result:</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-sm text-gray-900">{result}</pre>
            </div>
          )}

          {/* Examples */}
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-semibold text-gray-700 mb-2">Examples:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • <strong>Owner:</strong> Open-Source-Economy
              </li>
              <li>
                • <strong>Repository:</strong> Open-Source-Economy / web2-backend
              </li>
              <li>
                • <strong>Project (owner only):</strong> Open-Source-Economy
              </li>
              <li>
                • <strong>Project (with repo):</strong> Open-Source-Economy / web2-backend
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
