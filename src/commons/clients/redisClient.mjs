import { createClient } from 'redis';
import dotenv from 'dotenv';

// to use env
dotenv.config();

// create a redis client
const redisClient = createClient({
  username: 'default',
  password: process.env.REDIS_PASS,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// check if the clinet is on
redisClient.on('error', (err) => console.error('Redis Client Error', err));

// connect to client
await redisClient.connect();

export default redisClient;
