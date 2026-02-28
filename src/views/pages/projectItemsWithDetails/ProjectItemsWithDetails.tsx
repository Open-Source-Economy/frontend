import { projectHooks } from "src/api";
import { ApiError } from "src/utils/error/ApiError";

export function ProjectItemsWithDetails() {
  const { data, isLoading, error } = projectHooks.useProjectItemsWithDetailsQuery({}, {});
  const apiError = error ? (error instanceof ApiError ? error : ApiError.from(error)) : null;

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Project Items with Details</h1>
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Project Items with Details</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error:</p>
          <p>{apiError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Project Items with Details</h1>
      <div className="bg-white shadow-md rounded p-4">
        <pre className="text-sm text-gray-900 overflow-auto max-h-screen">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
