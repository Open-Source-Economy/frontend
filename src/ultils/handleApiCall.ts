import { ApiError } from "src/ultils/error/ApiError";

export const handleApiCall = async <T>(
  apiCall: () => Promise<T>,
  setIsLoading: (loading: boolean) => void,
  setError: (error: ApiError | null) => void,
  onSuccess?: (response: T) => void,
): Promise<boolean> => {
  setIsLoading(true);
  setError(null);

  try {
    const response = await apiCall();
    onSuccess && onSuccess(response);
    return true;
  } catch (error) {
    if (error instanceof ApiError) {
      setError(error);
    } else {
      setError(ApiError.from(error));
    }
    return false;
  } finally {
    setIsLoading(false);
  }
};
