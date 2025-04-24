import redis from "redis"

const client = redis.createClient({ url: 'redis://localhost:6379' });

const redisConn = async () => {
  try {
    // Connect to Redis
    await client.connect();
    console.log('Redis connected successfully ✅');
  } catch (error) {
    console.error('Failed to connect to Redis:', error.message);
    throw error; // Rethrow error so it can be caught in the startServer function
  }
};

export default {redisConn , client}