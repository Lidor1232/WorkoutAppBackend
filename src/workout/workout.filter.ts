import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { WorkoutNotFound } from './workout.interface';

@Catch(WorkoutNotFound)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: WorkoutNotFound, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status;
    let message;

    if (exception instanceof WorkoutNotFound) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    response.status(status).json({
      statusCode: status,
      path: ctx.getRequest<Request>().url,
      message,
    });
  }
}
