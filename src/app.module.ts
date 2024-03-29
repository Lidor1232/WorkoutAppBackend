import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  getApplicationConfig,
  getDatabaseConfig,
  getJwtConfig,
} from './config/environment.config';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { JWTModule } from './common/jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getApplicationConfig, getDatabaseConfig, getJwtConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [],
      useFactory: async function (configService: ConfigService) {
        return {
          uri: configService.get('database.url'),
        } as MongooseModuleFactoryOptions;
      },
    }),
    UserModule,
    WorkoutModule,
    ExerciseModule,
    JWTModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
