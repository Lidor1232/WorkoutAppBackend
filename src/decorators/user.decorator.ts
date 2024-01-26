import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserTokenPayload } from '../routes/user/user.interface';

export const User = createParamDecorator(function (
  data: unknown,
  ctx: ExecutionContext,
): UserTokenPayload {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
