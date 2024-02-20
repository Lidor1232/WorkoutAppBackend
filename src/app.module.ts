import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import environmentConfig from './config/environment.config';
import { WorkoutModule } from './workout/workout.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [
    UserModule,
    WorkoutModule,
    ExerciseModule,
    MongooseModule.forRoot(environmentConfig.database),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
