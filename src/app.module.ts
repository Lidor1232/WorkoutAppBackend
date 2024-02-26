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
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './common/guard/auth/auth.guard';
import { JWTModule } from './common/jwt/jwt.module';

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
    JWTModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
