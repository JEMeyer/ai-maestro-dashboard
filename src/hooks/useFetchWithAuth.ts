import { useCallback } from "react";
import { useCookies } from "react-cookie";

export const useFetchWithAuth = () => {
  const [cookies] = useCookies(["auth"]);

  return useCallback(
    async (url: string, options: RequestInit = {}) => {
      const headers = new Headers(options.headers || {});
      if (cookies.auth) {
        headers.append("Authorization", `Bearer ${cookies.auth}`);
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
    [cookies.auth]
  );
};
