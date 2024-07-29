import { useCallback } from "react";
import { useAuthToken } from "../state/auth";

export const useFetchWithAuth = () => {
  const authToken = useAuthToken();

  return useCallback(
    async (url: string, options: RequestInit = {}) => {
      const headers = new Headers(options.headers || {});
      console.log("in fetch with auth: ", authToken);
      if (authToken) {
        headers.append("Authorization", `Bearer ${authToken}`);
      }

      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include", // optional, for cookies
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    [authToken]
  );
};
