import { useCallback } from "react";
import { TableNames } from "../types";
import { useGetAllModels } from "./apiService";

export const useFetchAllModelTypes = <ModelType>(modelType: TableNames) => {
  const getAllModels = useGetAllModels<ModelType>();

  return useCallback(() => {
    return getAllModels(modelType);
  }, [getAllModels, modelType]);
};
