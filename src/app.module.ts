import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { environmentConfig } from './config/environment.config';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleFactoryOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';
import { LoggerModule } from './common/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [],
      useFactory: async function (configService: ConfigService) {
        return {
          uri: configService.get('env.database'),
        } as MongooseModuleFactoryOptions;
      },
    }),
    UserModule,
    WorkoutModule,
    ExerciseModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
