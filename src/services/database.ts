import { useCallback } from "react";
import { useGetAllAPIModels } from "./apiService";
import { TableNames } from "../types";

export const useFetchAllModelTypes = <T>(endpoint: TableNames) => {
  const getAllModels = useGetAllAPIModels<T>();

  return useCallback(async () => {
    return await getAllModels(endpoint);
  }, [getAllModels, endpoint]);
};
