import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  InvalidUserPassword,
  UserAlreadyExist,
  UserNotFound,
} from './user.interface';

@Catch(InvalidUserPassword, UserAlreadyExist, UserNotFound)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception: UserAlreadyExist | InvalidUserPassword | UserNotFound,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status;
    let message;

    if (exception instanceof UserNotFound) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (exception instanceof InvalidUserPassword) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof UserAlreadyExist) {
      status = HttpStatus.BAD_REQUEST;
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
