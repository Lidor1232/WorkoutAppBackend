const dotenv = require('dotenv');

const envPath = '.env';

dotenv.config({ path: envPath });

const environmentConfig = {
  serviceName: 'army-workout-api',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 3000,
  database: process.env.DATABASE as string,
  jwtSecret: process.env.JWT_SECRET as string,
};

export default environmentConfig;
