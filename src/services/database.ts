import { useCallback } from "react";
import { useGetAllAPIModels } from "./apiService";
import { ApiEndpoints } from "../types";

export const useFetchAllModelTypes = <T>(endpoint: ApiEndpoints) => {
  const getAllModels = useGetAllAPIModels<T>();

  return useCallback(async () => {
    return await getAllModels(endpoint);
  }, [getAllModels, endpoint]);
};
