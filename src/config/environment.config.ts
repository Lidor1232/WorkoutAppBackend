import { registerAs } from '@nestjs/config';

const { NODE_ENV, PORT, DATABASE, JWT_SECRET, ENABLE_LOGS } = process.env;

export const environmentConfig = registerAs('env', function () {
  return {
    serviceName: 'army-workout-api',
    nodeEnv: NODE_ENV,
    port: PORT,
    database: DATABASE,
    jwtSecret: JWT_SECRET,
    enableLogs: ENABLE_LOGS,
  };
});
