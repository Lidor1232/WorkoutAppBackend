import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { context } from '../utills/async-context/async-context';

export const useLoggerRequestId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    return context.run({ requestId: uuidv4() }, () => next());
  } catch (error) {
    return next(error);
  }
};
