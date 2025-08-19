import { ApiError } from "src/ultils/error/ApiError";

export const handleApiCall = async (
  apiCall: () => Promise<any | ApiError>,
  setIsLoading: (loading: boolean) => void,
  setError: (error: ApiError | null) => void,
  onSuccess?: () => void,
) => {
  setIsLoading(true);
  setError(null); // TODO: not sure if this is the right place to reset error state

  try {
    const response = await apiCall();
    if (response instanceof ApiError) {
      setError(response);
    } else {
      onSuccess && onSuccess();
    }
  } catch (error) {
    setError(ApiError.from(error));
  } finally {
    setIsLoading(false);
  }
};
