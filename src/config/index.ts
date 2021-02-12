import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: {
    port: process.env.PORT ?? 3000,
  },
  logger: {
    level: process.env.LOG_LEVEL ?? 'info',
  },
  auth: {
    secret: process.env.AUTH_SECRET ?? 'dev secret',
    expiresIn: process.env.AUTH_EXPIRES_IN ?? '12h',
  },
};

export default config;
