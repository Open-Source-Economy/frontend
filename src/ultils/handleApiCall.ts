// src/utils/handleApiCall.ts
import { ApiError } from "src/ultils/error/ApiError";

/**
 * A generic API call handler for consistent async request management.
 *
 * Handles:
 *  - Loading state
 *  - Error state (ApiError)
 *  - Optional success state
 *
 * @param apiCall - The API call function returning T or ApiError
 * @param setIsLoading - Setter for loading state
 * @param setError - Setter for API error state
 * @param setSuccess - Optional setter for success state
 * @param onSuccess - Optional callback for successful response
 *
 * @returns boolean - Whether the call succeeded
 */
export const handleApiCall = async <T>(
  apiCall: () => Promise<T | ApiError>,
  setIsLoading: (loading: boolean) => void,
  setError: (error: ApiError | null) => void,
  setSuccess?: (success: boolean) => void,
  onSuccess?: (response: T) => void,
): Promise<boolean> => {
  setIsLoading(true);
  setError(null);
  if (setSuccess) setSuccess(false);

  try {
    const response = await apiCall();

    if (response instanceof ApiError) {
      setError(response);
      return false;
    }

    // ✅ success
    onSuccess?.(response);
    if (setSuccess) setSuccess(true);
    return true;
  } catch (error) {
    setError(ApiError.from(error));
    return false;
  } finally {
    setIsLoading(false);
  }
};
