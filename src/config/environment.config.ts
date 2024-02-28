import { registerAs } from '@nestjs/config';

const { NODE_ENV, PORT, DATABASE, JWT_SECRET } = process.env;

export const getApplicationConfig = registerAs('application', function () {
  return {
    serviceName: 'army-workout-api',
    nodeEnv: NODE_ENV,
    port: PORT,
  };
});

export const getDatabaseConfig = registerAs('database', function () {
  return {
    url: DATABASE,
  };
});

export const getJwtConfig = registerAs('jwt', function () {
  return {
    secret: JWT_SECRET,
  };
});
