import { useCallback } from "react";
import { ApiEndpoints } from "../types";
import { useEnvironmentVariables } from "../hooks/useEnvironmentVariables";

export const useGetAllAPIModels = <T>() => {
  const { API_BASE_URL } = useEnvironmentVariables();

  return useCallback(
    async (endpoint: ApiEndpoints) => {
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
    async (endpoint: ApiEndpoints, modelToInsert: Omit<T, "id">) => {
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
        const newId = Number(data.id);
        return { ...modelToInsert, id: newId };
      } catch (error) {
        console.error(
          "There has been a problem with your post operation:",
          error
        );
        return null;
      }
    },
    [API_BASE_URL]
  );
};

export const usePutAPIModel = <T extends object>() => {
  const { API_BASE_URL } = useEnvironmentVariables();

  // Returns affectedRows
  return useCallback(
    async (endpoint: ApiEndpoints, modelToUpdate: T) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/${endpoint}${
            "id" in modelToUpdate ? `/${modelToUpdate.id}` : ""
          }`,
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
        return Number(data.affectedRows);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        return 0;
      }
    },
    [API_BASE_URL]
  );
};

export const useDeleteAPIModel = () => {
  const { API_BASE_URL } = useEnvironmentVariables();

  // Returns affectedRows
  return useCallback(
    async (endpoint: ApiEndpoints, modelIdToDelete: number | string) => {
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
