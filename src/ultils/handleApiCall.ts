import { ApiError } from "src/ultils/error/ApiError";

export const handleApiCall = async <T,>(
  apiCall: () => Promise<T | ApiError>,
  setIsLoading: (loading: boolean) => void,
  setError: (error: ApiError | null) => void,
  onSuccess?: (response: T) => void,
) => {
  setIsLoading(true);
  setError(null); // TODO: not sure if this is the right place to reset error state

  try {
    const response = await apiCall();
    if (response instanceof ApiError) {
      setError(response);
    } else {
      onSuccess && onSuccess(response);
    }
  } catch (error) {
    setError(ApiError.from(error));
  } finally {
    setIsLoading(false);
  }
};
