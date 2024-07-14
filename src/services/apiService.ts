import { useCallback } from "react";
import { TableNames } from "../types";
import { useEnvironmentVariables } from "../hooks/useEnvironmentVariables";

export const useGetAllAPIModels = <T>() => {
  const { API_BASE_URL } = useEnvironmentVariables();

  return useCallback(
    async (endpoint: TableNames) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/${endpoint}`);

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

export const usePostAPIModel = <T>() => {
  const { API_BASE_URL } = useEnvironmentVariables();

  // Returns new ID
  return useCallback(
    async (endpoint: TableNames, modelToInsert: T) => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modelToInsert),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.id;
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        return null;
      }
    },
    [API_BASE_URL]
  );
};

export const usePutAPIModel = <T extends { id: number }>() => {
  const { API_BASE_URL } = useEnvironmentVariables();

  // Returns affectedRows
  return useCallback(
    async (endpoint: TableNames, modelToUpdate: T) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/${endpoint}/${modelToUpdate.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(modelToUpdate),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.id;
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        return null;
      }
    },
    [API_BASE_URL]
  );
};

export const useDeleteAPIModel = () => {
  const { API_BASE_URL } = useEnvironmentVariables();

  // Returns affectedRows
  return useCallback(
    async (endpoint: TableNames, modelIdToDelete: number) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/${endpoint}/${modelIdToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.affectedRows;
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        return null;
      }
    },
    [API_BASE_URL]
  );
};
