import { useEffect, useState } from "react";
import { useConfig } from "./useConfig";

interface GpuStatus {
  ModelInUse: string;
}

interface Data {
  [gpuId: string]: GpuStatus;
}

const useGpuLockStatus = () => {
  const [data, setData] = useState<Data>({});
  const { API_BASE_URL } = useConfig();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch initial status
    const fetchInitialStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/gpus/lockStatuses`);
        const rawData = await response.json();

        // Transform the initial data
        const transformedData: Data = Object.entries(rawData).reduce(
          (acc, [key, value]) => {
            // Split the key on ':' and take the last element
            const gpuId = key.split(":").pop() || "";
            acc[gpuId] = JSON.parse(String(value));
            return acc;
          },
          {} as Data
        );

        setData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial status:", error);
        setLoading(false);
      }
    };

    fetchInitialStatus();

    // Set up SSE connection
    const eventSource = new EventSource(`${API_BASE_URL}/events`, {
      withCredentials: true,
    });
    eventSource.onmessage = (event) => {
      const rawData = JSON.parse(event.data);

      // Transform the event data
      const transformedData: Data = Object.entries(rawData).reduce(
        (acc, [gpuId, modelInUse]) => {
          acc[gpuId] = { ModelInUse: modelInUse as string };
          return acc;
        },
        {} as Data
      );

      setData((prevStatus) => ({
        ...prevStatus,
        ...transformedData,
      }));
    };

    return () => {
      eventSource.close();
    };
  }, [API_BASE_URL]);

  return { data, loading };
};

export default useGpuLockStatus;