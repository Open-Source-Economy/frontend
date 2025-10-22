import React, { useEffect, useState } from "react";
import { getBackendAPI } from "../../../services";
import { ApiError } from "../../../ultils/error/ApiError";
import * as dto from "@open-source-economy/api-types";

export const ProjectItemsWithDetails: React.FC = () => {
  const [data, setData] = useState<dto.GetProjectItemsWithDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const backendAPI = getBackendAPI();
        const result = await backendAPI.getProjectItemsWithDetails({}, {});
        
        if (result instanceof ApiError) {
          setError(result.message);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Project Items with Details</h1>
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Project Items with Details</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Project Items with Details</h1>
      <div className="bg-white shadow-md rounded p-4">
        <pre className="text-sm text-gray-900 overflow-auto max-h-screen">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

