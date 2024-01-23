import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as mongoose from 'mongoose';
import environmentConfig from './config/environment.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  mongoose
    .connect(environmentConfig.database, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      const dbConnectionLog = 'DB connection successful!';
      console.log(dbConnectionLog);
    });

  await app.listen(3000);
}

bootstrap();
