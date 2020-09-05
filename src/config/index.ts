import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: {
    port: process.env.PORT ?? 3000,
  },
  logger: {
    level: process.env.LOG_LEVEL ?? 'info',
  },
};

export default config;
