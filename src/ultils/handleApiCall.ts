import { ApiError } from "src/ultils/error/ApiError";

export const handleApiCall = async <T>(
  apiCall: () => Promise<T | ApiError>,
  setIsLoading: (loading: boolean) => void,
  setError: (error: ApiError | null) => void,
  onSuccess?: (response: T) => void,
): Promise<boolean> => {
  setIsLoading(true);
  setError(null); // TODO: not sure if this is the right place to reset error state

  try {
    const response = await apiCall();
    if (response instanceof ApiError) {
      setError(response);
      return false;
    } else {
      onSuccess && onSuccess(response);
      return true;
    }
  } catch (error) {
    setError(ApiError.from(error));
    return false;
  } finally {
    setIsLoading(false);
  }
};
