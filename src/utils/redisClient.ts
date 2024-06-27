import { createClient, type RedisClientType } from "redis";
import { EventEmitter } from "events";

class RedisClient extends EventEmitter {
  client: RedisClientType;

  constructor() {
    super();
    this.client = createClient({
      url: import.meta.env.VITE_REDIS_URL,
    });

    this.client.on("error", (err) => {
      this.emit("error", err);
    });

    this.client.connect().catch((err) => {
      this.emit("error", err);
    });
  }

  async fetchInitialData() {
    const keysStream = this.client.scanIterator({ MATCH: "gpu-lock:*" });
    let keys: string[] = [];
    for await (const key of keysStream) {
      keys.push(key);
    }
    const values = await this.client.mGet(keys);
    const result = keys.reduce(
      (acc, key, index) => ({
        ...acc,
        [key.split(":").pop() ?? "N/A"]: values[index],
      }),
      {}
    );
    return result;
  }

  async subscribeToRedisChannel(
    channel: string,
    callback: (message: string) => void
  ) {
    const subscriberClient = this.client.duplicate();
    await subscriberClient.connect();
    subscriberClient.subscribe(channel, (message) => {
      callback(message);
    });
  }
}

const redisClient = new RedisClient();

export const fetchInitialData = async () => {
  return await redisClient.fetchInitialData();
};

export const subscribeToRedisChannel = (
  channel: string,
  callback: (message: string) => void
) => {
  redisClient.subscribeToRedisChannel(channel, callback);
};
