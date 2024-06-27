import * as signalR from "@microsoft/signalr";

// Debugging to check if the environment variable is loaded correctly
console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

// Use the environment variable for the base URL
const baseUrl = import.meta.env.VITE_API_BASE_URL;

if (!baseUrl) {
  console.error("VITE_API_BASE_URL is not defined");
}

const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${baseUrl}/redisHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

// Ensure connection is fully established before invoking methods
async function startConnection() {
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    try {
      await connection.start();
      console.log("SignalR connection established");
    } catch (err) {
      console.error("Error establishing SignalR connection:", err);
      setTimeout(startConnection, 5000); // Retry after 5 seconds
    }
  }
}

startConnection();

export const subscribeToChannel = async (
  channelName: string,
  callback: (message: string) => void
) => {
  await startConnection(); // Ensure the connection is started
  connection
    .invoke("SubscribeToChannel", channelName)
    .catch((err) => console.error(err.toString()));
  connection.on("ReceiveMessage", (channel, message) => {
    if (channel === channelName) {
      callback(message);
    }
  });
};

export const publishToChannel = async (
  channelName: string,
  message: string
) => {
  await startConnection(); // Ensure the connection is started
  connection
    .invoke("PublishToChannel", channelName, message)
    .catch((err) => console.error(err.toString()));
};

export const getKeyValuePairsByPattern = async (
  pattern: string
): Promise<Record<string, string>> => {
  await startConnection(); // Ensure the connection is started
  try {
    const result = await connection.invoke("GetKeysByPattern", pattern);
    return result;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.toString());
    } else {
      console.error("An unexpected error occurred:", err);
    }
    return {};
  }
};
