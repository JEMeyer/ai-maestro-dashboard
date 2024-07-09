import { useCallback } from "react";
import { useConfig } from "../hooks/useConfig";
import { TableNames } from "../types/database";

export const useGetAllModels = <T>() => {
  const { API_BASE_URL } = useConfig();

  return useCallback(
    async (modelType: TableNames) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/${modelType}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return (await response.json()) as T[];
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        return [];
      }
    },
    [API_BASE_URL]
  );
};
