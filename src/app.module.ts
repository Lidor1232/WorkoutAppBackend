import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './routes/user/user.module';
import { WorkoutModule } from './routes/workout/workout.module';
import { ExerciseModule } from './routes/exercise/exercise.module';

@Module({
  imports: [UserModule, WorkoutModule, ExerciseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
