import { io } from "socket.io-client";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const socket = io(baseUrl, {
  withCredentials: true,
});

let connectionPromise: Promise<void> | null = null;

async function startConnection() {
  if (!connectionPromise) {
    connectionPromise = new Promise((resolve, reject) => {
      socket.connect();
      socket.on("connect", () => {
        console.log("Socket.IO connection established");
        resolve();
      });
      socket.on("connect_error", (err) => {
        console.error("Error establishing Socket.IO connection:", err);
        connectionPromise = null; // Reset the promise so it can retry
        setTimeout(startConnection, 5000); // Retry after 5 seconds
        reject(err);
      });
    });
  }
  return connectionPromise;
}

startConnection();

export const subscribeToChannel = async (
  channelName: string,
  callback: (message: string) => void
) => {
  await startConnection();
  if (socket.connected) {
    socket.emit("subscribeToChannel", channelName);
    socket.on("ReceiveMessage", (data) => {
      if (data.channel === channelName) {
        callback(data.message);
      }
    });
  } else {
    console.error("Connection is not in the 'Connected' state.");
  }
};

export const publishToChannel = async (
  channelName: string,
  message: string
) => {
  await startConnection();
  if (socket.connected) {
    socket.emit("publishToChannel", { channelName, message });
  } else {
    console.error("Connection is not in the 'Connected' state.");
  }
};

export const getKeyValuePairsByPattern = async (
  pattern: string
): Promise<Record<string, string>> => {
  await startConnection();
  if (socket.connected) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        socket.off("keyValuePairs", listener); // Remove the event listener to avoid duplication
        reject(new Error("Request timed out"));
      }, 10000); // Extended timeout to 10 seconds

      const listener = (data: Record<string, string>) => {
        clearTimeout(timeout); // Clear the timeout on successful response
        socket.off("keyValuePairs", listener); // Remove the event listener to avoid duplication
        resolve(data);
      };

      socket.emit("getKeyValuePairsByPattern", pattern);
      socket.on("keyValuePairs", listener);
    });
  } else {
    console.error("Connection is not in the 'Connected' state.");
    return {};
  }
};
